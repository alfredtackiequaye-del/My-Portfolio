import {chromium} from '@playwright/test';
import {browserOptions} from './browser.mjs';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const dir='qa/section-labels-about-review';await mkdir(dir,{recursive:true});
const browser=await chromium.launch(browserOptions());const results=[];
for(const [name,width,height] of [['desktop',1440,1000],['tablet',1024,900],['mobile',390,844]]){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:3002/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 for(const [id,title] of [['work','Selected Work'],['about','About Me'],['services','Services'],['books','Books'],['contact','Contact']]){
  await page.evaluate(id=>window.scrollTo(0,document.getElementById(id).offsetTop-100),id);await page.waitForTimeout(100);
  const label=page.locator(`#${id} .section-label`);assert.equal(await label.textContent(),title);
  assert.ok(await label.evaluate(el=>parseFloat(getComputedStyle(el).fontSize))>=15);
  await page.screenshot({path:`${dir}/${name}-${id}.png`});
  if(id==='about'){
   await page.locator('#about').screenshot({path:`${dir}/${name}-about-full.png`});
   await page.locator('.about-actions a[href="#contact"]').scrollIntoViewIfNeeded();
   await page.screenshot({path:`${dir}/${name}-about-action.png`});
   await page.locator('.about-actions a[href="#contact"]').click();await page.waitForTimeout(100);
   assert.equal(await page.evaluate(()=>location.hash),'#contact');
   await page.locator('.about-actions a[href="#work"]').click();await page.waitForTimeout(100);
   assert.equal(await page.evaluate(()=>location.hash),'#work');
   assert.equal(await page.locator('.about-benefits li').count(),3);
   if(width<800)assert.ok(await page.locator('.about-benefits p').first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize))>=16);
  }
 }
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 results.push(`${name}: explicit section names at 15px or larger, no horizontal overflow, About inquiry and work links work; three benefits are readable.`);await page.close();
}
console.log(JSON.stringify(results,null,2));await writeFile(`${dir}/results.json`,JSON.stringify(results,null,2));await browser.close();
