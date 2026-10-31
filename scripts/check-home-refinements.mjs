import {chromium} from '@playwright/test';
import {browserOptions} from './browser.mjs';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
await mkdir('qa/home-client-refinements',{recursive:true});
const browser=await chromium.launch(browserOptions());
const results=[],errors=[];
for(const [name,width,height] of [['desktop',1440,1000],['tablet',1024,1000],['mobile',390,1000]]){
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:3002/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(250);
 const state=await page.locator('.hero').evaluate(el=>({copy:el.querySelector('.hero-intro>p').textContent,role:parseFloat(getComputedStyle(el.querySelector('.hero-kicker')).fontSize),body:parseFloat(getComputedStyle(el.querySelector('.hero-intro>p')).fontSize),image:el.querySelector('.hero-art').getAttribute('src'),loaded:el.querySelector('.hero-art').naturalWidth>0,contact:el.querySelector('.hero-contact-link').getAttribute('href')}));
 assert.match(state.copy,/Power BI dashboards/);assert.ok(state.role>=11);assert.ok(state.body>=16);assert.equal(state.contact,'#contact');assert.equal(state.loaded,true);assert.match(state.image,/cobalt-hero-colour/);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 await page.screenshot({path:`qa/home-client-refinements/${name}.png`});
 const contactLink=page.getByRole('link',{name:'Discuss your project',exact:true});await contactLink.click();await page.waitForTimeout(1000);
 assert.equal(await page.evaluate(()=>location.hash),'#contact');assert.equal(await page.locator('#contact-heading').isVisible(),true);
 results.push(`${name}: clearer offer, readable supporting text, updated dashboard image, direct inquiry link, and no overflow.`);await page.close();
}
assert.deepEqual(errors,[]);await writeFile('qa/home-client-refinements/results.json',JSON.stringify({results,errors},null,2));console.log(JSON.stringify({results,errors},null,2));await browser.close();
