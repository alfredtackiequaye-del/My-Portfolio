import { chromium } from '@playwright/test';
import { browserOptions } from './browser.mjs';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('qa/portrait-motion',{recursive:true});
const browser=await chromium.launch(browserOptions());
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:3002/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
const initial=await page.locator('.orbit-traveller').first().evaluate(el=>getComputedStyle(el).transform);
await page.waitForTimeout(1200);
const later=await page.locator('.orbit-traveller').first().evaluate(el=>getComputedStyle(el).transform);
assert.notEqual(initial,later,'Orbital dots should move slowly in normal motion mode.');
assert.equal(await page.locator('.hero-orbits').getAttribute('aria-hidden'),'true');
assert.equal(await page.locator('.hero-orbits').evaluate(el=>getComputedStyle(el).pointerEvents),'none');
await page.screenshot({path:'qa/portrait-motion/hero-orbits.png'});
const results=['Orbital dots move; decoration is hidden from assistive technology and does not intercept the mouse.'];
for(const [name,selector] of [['home','.hero-profile-portrait'],['about','.about-portrait']]){
 const target=page.locator(selector);
 await target.scrollIntoViewIfNeeded();await target.hover();await page.waitForTimeout(900);
 const state=await target.locator('img').evaluate(img=>({filter:getComputedStyle(img).filter,transform:getComputedStyle(img).transform,padding:parseFloat(getComputedStyle(img).paddingTop),fit:getComputedStyle(img).objectFit}));
 assert.equal(state.filter,'grayscale(0)');assert.equal(state.transform,'none');assert.ok(state.padding>=14);assert.equal(state.fit,'contain');
 await target.screenshot({path:`qa/portrait-motion/${name}-hover.png`});
 await target.click();assert.equal(await target.getAttribute('aria-pressed'),'true');
 assert.equal(await target.locator('img').evaluate(img=>getComputedStyle(img).transform),'none');
 await target.click();results.push(`${name}: hover and pinned colour have no zoom, preserve contain sizing, and retain 14px headroom.`);
}
await page.emulateMedia({reducedMotion:'reduce'});
assert.equal(await page.locator('.hero-orbits').evaluate(el=>getComputedStyle(el).display),'none');
results.push('Reduced-motion mode disables the orbital decoration.');
for(const width of [390,768,1024,1440]){
 await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:3002/',{waitUntil:'networkidle'});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 for(const selector of ['.hero-profile-portrait img','.about-portrait img']){
  const fit=await page.locator(selector).evaluate(img=>({fit:getComputedStyle(img).objectFit,padding:parseFloat(getComputedStyle(img).paddingTop)}));assert.equal(fit.fit,'contain');assert.ok(fit.padding>=14);
 }
}
results.push('Responsive portraits retain their headroom and no horizontal overflow appears at the tested widths.');
assert.deepEqual(errors,[]);
await writeFile('qa/portrait-motion/results.json',JSON.stringify({results,errors},null,2));console.log(JSON.stringify({results,errors},null,2));await browser.close();
