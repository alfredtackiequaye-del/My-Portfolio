import {chromium} from '@playwright/test';
import {browserOptions} from './browser.mjs';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
await mkdir('qa/toolkit',{recursive:true});
const browser=await chromium.launch(browserOptions());const results=[];
for(const [name,width] of [['desktop',1440],['tablet',1024],['mobile',390],['small-mobile',320]]){
 const page=await browser.newPage({viewport:{width,height:1000}});
 await page.goto('http://127.0.0.1:3002/#about',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 const panel=page.locator('.about-toolkit');await panel.scrollIntoViewIfNeeded();await page.waitForTimeout(700);
 assert.equal(await panel.locator('li').count(),6);
 assert.ok(await panel.locator('.toolkit-name').first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize))>=13);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 assert.equal(await panel.evaluate(el=>el.scrollWidth>el.clientWidth+1),false);
 await panel.screenshot({path:`qa/toolkit/${name}.png`});
 if(name==='desktop'){
  const item=panel.locator('li').first();const before=await item.evaluate(el=>getComputedStyle(el).transform);
  await item.hover();await page.waitForTimeout(350);assert.notEqual(await item.evaluate(el=>getComputedStyle(el).transform),before);
  await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await item.evaluate(el=>getComputedStyle(el).transform),'none');
 }
 results.push(`${name}: six readable tools, no overflow${name==='desktop'?', hover responds and reduced motion respected':''}.`);await page.close();
}
await writeFile('qa/toolkit/results.json',JSON.stringify(results,null,2));console.log(results);await browser.close();
