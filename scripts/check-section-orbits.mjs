import { chromium } from '@playwright/test';
import { browserOptions } from './browser.mjs';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('qa/shared-orbits',{recursive:true});
const browser=await chromium.launch(browserOptions());
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:3002/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
const sections=['.hero','.work-section','.about-section','.services-section','.process-section','.books-section','.contact-section'];
const results=[];
for(const selector of sections){
 const section=page.locator(selector);await section.evaluate(el=>window.scrollTo(0,el.offsetTop-86));await page.waitForTimeout(250);
 const pattern=section.locator('.orbit-pattern');assert.equal(await pattern.count(),1);assert.equal(await pattern.getAttribute('aria-hidden'),'true');assert.equal(await pattern.locator('.hero-orbit').count(),6);
 const style=await pattern.evaluate(el=>({pointer:getComputedStyle(el).pointerEvents,active:el.dataset.active,tone:el.className,animation:getComputedStyle(el.querySelector('.orbit-traveller')).animationPlayState}));
 assert.equal(style.pointer,'none');assert.equal(style.active,'true');assert.equal(style.animation,'running');
 await page.screenshot({path:`qa/shared-orbits/${selector.slice(1)}-desktop.png`});results.push(`${selector}: six paths, moving dots, visible section animation, and inert decorative layer.`);
}
await page.waitForTimeout(200);
assert.equal(await page.locator('.hero-orbits').getAttribute('data-active'),'false');
results.push('Hero animation pauses when the page is scrolled away.');
await page.emulateMedia({reducedMotion:'reduce'});
for(const pattern of await page.locator('.orbit-pattern').all())assert.equal(await pattern.evaluate(el=>getComputedStyle(el).display),'none');
results.push('Reduced-motion preference hides every section pattern.');
await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'no-preference'});
for(const selector of ['.hero','.about-section','.services-section','.contact-section']){
 const section=page.locator(selector);await section.evaluate(el=>window.scrollTo(0,el.offsetTop-72));await page.waitForTimeout(200);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 await page.screenshot({path:`qa/shared-orbits/${selector.slice(1)}-mobile.png`});
}
results.push('Mobile section patterns do not create horizontal overflow.');assert.deepEqual(errors,[]);
await writeFile('qa/shared-orbits/results.json',JSON.stringify({results,errors},null,2));console.log(JSON.stringify({results,errors},null,2));await browser.close();
