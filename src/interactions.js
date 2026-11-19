import { useEffect } from 'react';

/*
 * Lightweight pointer interactions, no libraries.
 * One passive pointermove listener, throttled to one update per animation frame.
 * Only CSS custom properties are written; CSS turns them into transform/opacity,
 * which the browser animates on the GPU without re-layout.
 *
 *  [data-tilt="6"]  gentle 3D tilt + soft light that follows the pointer (max degrees)
 *  [data-magnet]    element leans a few pixels towards the pointer
 *  #home            hero spotlight and subtle parallax depth
 *
 * Skipped entirely on touch devices and for visitors who prefer reduced motion.
 */
export function useInteractions() {
  useEffect(() => {
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || calm) return;

    const root = document.documentElement;
    root.classList.add('fx');
    const hero = document.getElementById('home');
    let frame = 0, last = null, tilted = null, magnet = null;

    const clear = (el, props, cls) => { if (!el) return; props.forEach(p => el.style.removeProperty(p)); if (cls) el.classList.remove(cls); };
    const resetTilt = () => { clear(tilted, ['--rx', '--ry', '--gx', '--gy'], 'is-tilting'); tilted = null; };
    const resetMagnet = () => { clear(magnet, ['--mx', '--my']); magnet = null; };

    function update() {
      frame = 0;
      const e = last; if (!e) return;
      const target = e.target instanceof Element ? e.target : null;

      const t = target?.closest('[data-tilt]') || null;
      if (t !== tilted) resetTilt();
      if (t) {
        const r = t.getBoundingClientRect(), max = Number(t.dataset.tilt) || 6;
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        t.style.setProperty('--rx', `${((x - .5) * max).toFixed(2)}deg`);
        t.style.setProperty('--ry', `${((.5 - y) * max).toFixed(2)}deg`);
        t.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
        t.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
        t.classList.add('is-tilting'); tilted = t;
      }

      const m = target?.closest('[data-magnet]') || null;
      if (m !== magnet) resetMagnet();
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
        const dy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
        m.style.setProperty('--mx', `${(dx * 6).toFixed(1)}px`);
        m.style.setProperty('--my', `${(dy * 4).toFixed(1)}px`);
        magnet = m;
      }

      if (hero) {
        const r = hero.getBoundingClientRect();
        if (e.clientY >= r.top && e.clientY <= r.bottom) {
          hero.style.setProperty('--px', ((e.clientX - r.left) / r.width * 2 - 1).toFixed(3));
          hero.style.setProperty('--py', ((e.clientY - r.top) / r.height * 2 - 1).toFixed(3));
          hero.style.setProperty('--sx', `${Math.round(e.clientX - r.left)}px`);
          hero.style.setProperty('--sy', `${Math.round(e.clientY - r.top)}px`);
          hero.classList.add('hero-lit');
        } else hero.classList.remove('hero-lit');
      }
    }

    const move = e => { last = e; if (!frame) frame = requestAnimationFrame(update); };
    const out = e => { if (!e.relatedTarget) { resetTilt(); resetMagnet(); hero?.classList.remove('hero-lit'); } };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerout', out, { passive: true });
    return () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerout', out);
      if (frame) cancelAnimationFrame(frame);
      resetTilt(); resetMagnet(); root.classList.remove('fx');
    };
  }, []);
}
