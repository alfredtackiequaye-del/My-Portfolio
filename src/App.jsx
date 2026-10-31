import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ArrowUp, X, List, Plus, Minus, EnvelopeSimple, Phone, WhatsappLogo, LinkedinLogo, GithubLogo, MapPin, PaintBrush, Compass, ChartLineUp, SquaresFour, Check, Copy, CaretDown } from '@phosphor-icons/react';
import { books, credentials, email, phone, services, studies, whatsapp } from './content';

const nav = [['Work','work'],['About','about'],['Services','services'],['Books','books'],['Contact','contact']];
const tools = ['Photoshop','Illustrator','Figma','Power BI','Microsoft Fabric','Microsoft Security'];

function OrbitPattern({tone='light', side='left', hero=false}) {
  const ref=useRef(null);
  useEffect(()=>{
    const node=ref.current;
    if(!node)return;
    if(!('IntersectionObserver' in window)){node.dataset.active='true';return;}
    const observer=new IntersectionObserver(([entry])=>{node.dataset.active=String(entry.isIntersecting);},{rootMargin:'120px',threshold:0});
    observer.observe(node);return ()=>observer.disconnect();
  },[]);
  return <div ref={ref} className={`orbit-pattern ${hero?'hero-orbits':''} orbit-pattern-${tone} orbit-pattern-${side}`} aria-hidden="true" data-active="false">
    {['one','two','three','four','five','six'].map(orbit=><div className={`hero-orbit hero-orbit-${orbit}`} key={orbit}><span className="orbit-traveller"/></div>)}
  </div>;
}

function Label({children, light=false}) { return <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{children}</p>; }
function Mark() { return <a className="wordmark" href="#home" aria-label="Alfred, back to home">ALFRED<span>.</span></a>; }

function Reveal({children, className=''}) {
  const ref=useRef(null);
  useEffect(()=>{
    const element=ref.current;
    if(!element || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){element.classList.add('revealed');observer.unobserve(element);}},{threshold:.08});
    element.classList.add('reveal-ready');observer.observe(element);
    return ()=>observer.disconnect();
  },[]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Header() {
  const [open,setOpen]=useState(false), [scrolled,setScrolled]=useState(false), [active,setActive]=useState('');
  const header=useRef(null), toggle=useRef(null);
  useEffect(()=>{
    let frame;
    const update=()=>{
      frame=undefined;setScrolled(window.scrollY>50);
      let current=''; for(const [,id] of nav){if(document.getElementById(id)?.getBoundingClientRect().top<=170) current=id;}if(window.scrollY+innerHeight>=document.documentElement.scrollHeight-4)current='contact';setActive(current);
    };
    const schedule=()=>{if(frame===undefined)frame=requestAnimationFrame(update);};
    update();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
    return ()=>{window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);if(frame!==undefined)cancelAnimationFrame(frame);};
  },[]);
  useEffect(()=>{
    if(!open)return;
    const key=(event)=>{if(event.key==='Escape'){setOpen(false);toggle.current?.focus();}};
    const outside=(event)=>{if(!header.current?.contains(event.target))setOpen(false);};
    window.addEventListener('keydown',key);window.addEventListener('pointerdown',outside);
    return ()=>{window.removeEventListener('keydown',key);window.removeEventListener('pointerdown',outside);};
  },[open]);
  return <header ref={header} className={`site-header ${scrolled || open ? 'header-solid' : ''}`}>
    <div className="container header-inner"><Mark /><button ref={toggle} className="menu-toggle icon-button" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="primary-nav" onClick={()=>setOpen(!open)}>{open?<X size={24}/>:<List size={24}/>}</button>
      <nav id="primary-nav" className={open?'nav-open':''} aria-label="Main navigation">{nav.map(([label,id])=><a key={id} href={`#${id}`} aria-current={active===id?'location':undefined} onClick={()=>setOpen(false)}>{label}</a>)}</nav>
      <a className="button button-small header-cta" href="#contact">Let’s talk <ArrowRight size={18}/></a>
    </div>
  </header>;
}

function Portrait({hero=false}) {
  const [colour,setColour]=useState(false);
  return <button className={`portrait ${hero?'hero-profile-portrait':'about-portrait'} ${colour?'portrait-colour':''}`} onClick={()=>setColour(!colour)} aria-label="Keep portrait in colour" aria-pressed={colour}>
    <img src="/images/alfred-portrait.png" alt="Alfred Tackie-Quaye" width="1586" height="1544" loading={hero?'eager':'lazy'} fetchPriority={hero?'high':'auto'}/><span className="portrait-light" aria-hidden="true"/>
    {!hero&&<span className="portrait-caption"><strong>Alfred Tackie-Quaye</strong><span>Designer + data professional</span></span>}
  </button>;
}

function StudyModal({study,onClose}) {
  const ref=useRef(null);
  useEffect(()=>{
    if(!study)return;
    const previous=document.activeElement;ref.current?.showModal();
    const old=document.body.style.overflow;document.body.style.overflow='hidden';
    return ()=>{document.body.style.overflow=old;ref.current?.close();previous?.focus?.();};
  },[study]);
  return <dialog ref={ref} className="study-dialog" aria-labelledby="study-title" onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
    {study&&<div className="study-modal"><button className="modal-close icon-button" aria-label="Close project" onClick={onClose}><X size={24}/></button><img className="modal-image" src={study.image} alt={study.title}/><div className="modal-copy"><Label>Concept study / {study.category}</Label><h2 id="study-title">{study.title}</h2><div className="modal-columns"><div><h3>The question</h3><p>{study.brief}</p><h3>The exploration</h3><p>{study.approach}</p></div><div><h3>Areas of focus</h3><ul>{study.focus.map(item=><li key={item}>{item}</li>)}</ul></div></div><p className="concept-disclosure">{study.note}</p><a className="button button-blue" href="#contact" onClick={onClose}>Discuss something similar <ArrowUpRight size={18}/></a></div></div>}
  </dialog>;
}

function Contact({selectedService,setSelectedService}) {
  const [notice,setNotice]=useState(''),[draft,setDraft]=useState(''),[copied,setCopied]=useState(false);
  function submit(e){
    e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;
    const data=new FormData(form);
    const subject=data.get('service') || 'Project inquiry';
    const body=`Hello Alfred,\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nArea of interest: ${subject}\n\n${data.get('message')}\n`;
    const url=`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraft(url);setNotice('Your email draft is ready. Your email app will open; send the message there to complete your inquiry.');window.location.href=url;
  }
  async function copy(){try{await navigator.clipboard.writeText(email);setCopied(true);setTimeout(()=>setCopied(false),2200);}catch{setNotice('You can email me directly at '+email);}}
  return <section className="contact-section orbit-surface" id="contact" aria-labelledby="contact-heading"><OrbitPattern tone="light" side="right"/><div className="container contact-grid"><Reveal className="contact-intro"><Label light>Let’s make it useful</Label><h2 id="contact-heading">Good things start<br/>with a <em>conversation.</em></h2><p>A brand to build. An experience to improve. A story hiding in your data. Tell me what you have in mind.</p><div className="contact-links"><div><EnvelopeSimple size={22}/><a href={`mailto:${email}`}>{email}</a><button className="icon-button" onClick={copy} aria-label="Copy email">{copied?<Check size={18}/>:<Copy size={18}/>}</button></div><div><Phone size={22}/><a href="tel:+233240791866">{phone}</a></div><div><MapPin size={22}/><span>Accra, Ghana · Available worldwide</span></div></div><p role="status" className="copy-status">{copied?'Email copied.':''}</p><a className="whatsapp-link" href={whatsapp} target="_blank" rel="noreferrer"><WhatsappLogo size={20}/>Prefer WhatsApp? Let’s chat <ArrowUpRight size={17}/></a></Reveal>
    <Reveal><form className="contact-form" onSubmit={submit}><div className="form-heading"><span>YOUR NEXT PROJECT</span><h3>What are we creating?</h3></div><div className="form-row"><label>Your name<input name="name" required autoComplete="name" maxLength={120} placeholder="Full name"/></label><label>Email address<input name="email" type="email" required autoComplete="email" maxLength={200} placeholder="you@company.com"/></label></div><label>I’m interested in<select name="service" required value={selectedService} onChange={e=>setSelectedService(e.target.value)}><option value="" disabled>Select an area</option>{services.map(s=><option key={s.number}>{s.title}</option>)}<option>Books & writing</option><option>Other collaboration</option></select></label><label>A little about your project<textarea name="message" rows={4} required minLength={10} maxLength={5000} placeholder="Your idea, your challenge, or what you’d like to achieve…"/></label><div className="form-footer"><p>This prepares a draft in your email app.<br/>You choose when to send it.</p><button className="button button-blue" type="submit">Prepare email <ArrowUpRight size={18}/></button></div><div role="status" className="form-status">{notice}{draft&&<> <a href={draft}>Open email draft again</a></>}</div></form></Reveal></div></section>;
}

export function App() {
  const [study,setStudy]=useState(null),[selectedService,setSelectedService]=useState(''),[selectedBook,setSelectedBook]=useState(null);
  const bookDialog=useRef(null);
  useEffect(()=>{
    if(!selectedBook)return;const previous=document.activeElement;bookDialog.current?.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';
    return ()=>{document.body.style.overflow=old;bookDialog.current?.close();previous?.focus?.();};
  },[selectedBook]);
  function inquire(service){setSelectedService(service);document.getElementById('contact')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});history.replaceState(null,'','#contact');}
  return <>
    <a className="skip-link" href="#main">Skip to content</a><Header/>
    <main id="main">
    <section className="hero" id="home" aria-labelledby="hero-title">
      <OrbitPattern hero/>
      <div className="hero-scene">
        <div className="hero-art-frame"><img className="hero-art" src="/images/cobalt-hero.png" alt="Laptop, blue brand stationery, and a dashboard concept" fetchPriority="high"/></div>
        <div className="hero-portrait-frame"><Portrait hero/></div>
      </div>
      <div className="container hero-content">
        <p className="hero-kicker">Alfred Tackie-Quaye · Design + Data</p>
        <h1 id="hero-title">Good design.<br/>Clear thinking.<br/>Useful outcomes.</h1>
        <div className="hero-intro">
          <p>Brand identity, digital experiences, and data storytelling for ambitious organisations.</p>
          <div className="hero-actions"><a className="button" href="#work">Explore selected work <ArrowRight size={19}/></a></div>
          <p className="hero-location">Based in Ghana · Working worldwide</p>
        </div>
      </div>
    </section>

    <section className="work-section orbit-surface" id="work" aria-labelledby="work-heading"><OrbitPattern tone="ink" side="right"/><div className="container"><Reveal className="section-heading"><div><Label>Selected work</Label><h2 id="work-heading">Ideas into<br/>things that work.</h2></div><p>A small selection of concept work that shows how brand and data can work together to create clarity, credibility, and momentum.</p></Reveal><div className="work-gallery">{studies.map((item,i)=><Reveal key={item.id} className={`work-row ${i%2?'work-row-reverse':''}`}><button className="project-image" onClick={()=>setStudy(item)} aria-label={`View ${item.title}`}><img src={item.image} alt={i?'Silver laptop displaying a blue and white dashboard concept':'Cobalt-blue brand book, stationery, and business cards on stone'} width="1600" height="900" loading="lazy"/><span className="image-action"><ArrowUpRight size={24}/></span></button><div className="project-copy"><Label>Concept study</Label><h3>{item.id==='brand'?<>Brand<br/>system study</>:<>Data<br/>narrative study</>}</h3><p>{item.description}</p><button className="text-link" onClick={()=>setStudy(item)}>View project <ArrowRight size={18}/></button></div></Reveal>)}</div><p className="work-disclosure">Independent explorations. Real case studies will be added as they’re documented.</p></div></section>

    <section className="about-section orbit-surface" id="about" aria-labelledby="about-heading"><OrbitPattern tone="ink" side="left"/><div className="container about-grid"><Reveal className="about-visual"><Portrait/><div className="about-toolkit"><Label>My everyday toolkit</Label><div>{tools.map(tool=><span key={tool}>{tool}</span>)}</div></div></Reveal><Reveal className="about-copy"><Label>The person behind the work</Label><h2 id="about-heading">Creative thinking.<br/>Analytical depth.<br/><em>Clear business purpose.</em></h2><p className="lead">I’m Alfred Tackie-Quaye, a Ghana-based designer and data professional helping organisations communicate clearly, create useful digital experiences, and make sense of their information.</p><p>My work connects brand identity and graphic design, UI/UX design, digital strategy, and data storytelling. That combination allows me to consider both how your business presents itself and how people experience it—from their first impression of your brand to the information they need to take action.</p><p>Whether you need a consistent visual identity, a clearer website journey, a focused content direction, or a Power BI dashboard, I start by understanding your goals, your audience, and the problem that needs solving. Those priorities guide the creative and technical decisions throughout the work.</p><a className="text-link" href="#contact">Let’s discuss your next project <ArrowUpRight size={18}/></a></Reveal></div></section>

    <section className="services-section orbit-surface" id="services" aria-labelledby="services-heading"><OrbitPattern tone="ink" side="right"/><div className="container"><Reveal className="section-heading"><div><Label>What I bring to the table</Label><h2 id="services-heading">Different disciplines.<br/><em>One clear purpose.</em></h2></div><p>Bring one challenge or connect the dots across your brand, digital experience, and data.</p></Reveal><div className="service-list">{services.map((s,i)=>{const Icon=[PaintBrush,SquaresFour,Compass,ChartLineUp][i];return <Reveal key={s.number}><details className="service"><summary><span className="service-number">{s.number}</span><Icon className="service-icon" size={30} weight="light"/><div><h3>{s.title}</h3><p>{s.short}</p></div><Plus className="expand-icon" size={24}/><Minus className="collapse-icon" size={24}/></summary><div className="service-body"><p>{s.description} {s.details}</p><span>{s.deliverables}</span><button className="text-link" onClick={()=>inquire(s.title)}>Discuss this service <ArrowUpRight size={18}/></button></div></details></Reveal>;})}</div></div></section>

    <section className="process-section orbit-surface" aria-labelledby="process-heading"><OrbitPattern tone="light" side="left"/><div className="container"><Reveal><Label light>From the first question to the final detail</Label><h2 id="process-heading">Thought through.<br/><em>Made with intention.</em></h2></Reveal><div className="process-grid">{[['Clarify','Understand your goals, audience, and the challenge.'],['Plan','Shape the direction, structure, and next steps.'],['Design','Turn the direction into visuals and experiences.'],['Refine','Test the details and make the work stronger.'],['Deliver','Bring the work together for its next chapter.']].map(([title,text],i)=><Reveal key={title}><span className="process-number">0{i+1}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div><div className="learning-row"><p>Tools, knowledge & ongoing learning</p><div>{credentials.map(([code,title])=><span key={code} title={title}>{code}<span>{title}</span></span>)}</div></div></div></section>

    <section className="books-section orbit-surface" id="books" aria-labelledby="books-heading"><OrbitPattern tone="ink" side="right"/><div className="container"><Reveal className="section-heading"><div><Label>Beyond the screen</Label><h2 id="books-heading">Ideas worth<br/><em>turning a page for.</em></h2></div><p>Practical guides and personal reflections on AI, productivity, and purpose. Written by Alfred Tackie-Quaye.</p></Reveal><div className="books-grid">{books.map((book,i)=><Reveal key={book.title}><button className="book" onClick={()=>setSelectedBook(book)} aria-label={`Read about ${book.title}`}><div className={`book-stage book-stage-${i}`}><img src={book.image} alt={`${book.title} cover`} width="400" height="600" loading="lazy"/></div><div className="book-copy"><span>{book.topic}</span><h3>{book.title}</h3><span className="book-action">Discover the book <ArrowUpRight size={18}/></span></div></button></Reveal>)}</div></div></section>

    <Contact selectedService={selectedService} setSelectedService={setSelectedService}/>
    </main>
    <footer className="site-footer"><div className="container"><Mark/><p>© {new Date().getFullYear()} Alfred Tackie-Quaye</p><div><a href="https://www.linkedin.com/in/alfred-tackie-quaye-93b28314b" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinLogo size={21}/></a><a href="https://github.com/AlfredTQ" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubLogo size={21}/></a><a href="#home" className="back-top">Back to top <ArrowUp size={17}/></a></div></div></footer>
    <StudyModal study={study} onClose={()=>setStudy(null)}/>
    <dialog ref={bookDialog} className="book-dialog" aria-labelledby="book-title" onCancel={()=>setSelectedBook(null)} onClick={e=>{if(e.target===e.currentTarget)setSelectedBook(null);}}>{selectedBook&&<div className="book-modal"><button className="modal-close icon-button" aria-label="Close book details" onClick={()=>setSelectedBook(null)}><X size={24}/></button><img src={selectedBook.image} alt={`${selectedBook.title} cover`}/><div><Label>Books & writing</Label><h2 id="book-title">{selectedBook.title}</h2><p>{selectedBook.description}</p><p className="book-author">Written by Alfred Tackie-Quaye</p><a className="button button-blue" href={`mailto:${email}?subject=${encodeURIComponent('Book inquiry: '+selectedBook.title)}`}>Ask about this book <ArrowUpRight size={18}/></a></div></div>}</dialog>
  </>;
}
