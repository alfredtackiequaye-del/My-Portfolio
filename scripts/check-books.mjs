import {chromium} from '@playwright/test';import {browserOptions} from './browser.mjs';import {mkdir,writeFile} from 'node:fs/promises';import assert from 'node:assert/strict';
const dir='qa/books-refinements';await mkdir(dir,{recursive:true});const browser=await chromium.launch(browserOptions());const results=[],errors=[];
for(const [name,width,height] of [['desktop',1440,1000],['tablet',768,1000],['mobile',390,844],['small-mobile',320,844]]){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:3002/#books',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 const section=page.locator('#books');assert.equal(await section.locator('.book-description').count(),4);
 if(width<=600){const cards=section.locator('.book');const a=await cards.nth(0).boundingBox(),b=await cards.nth(1).boundingBox();assert.ok(b.y>=a.y+a.height);assert.ok(await section.locator('.book-description').first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize))>=16);}
 await section.screenshot({path:`${dir}/${name}-gallery.png`,style:'.site-header,.skip-link{visibility:hidden!important}'});
 for(let i=0;i<4;i++){
  const card=section.locator('.book').nth(i);await card.click();const dialog=page.locator('.book-dialog');await dialog.waitFor({state:'visible'});
  const title=await dialog.locator('#book-title').textContent();const link=dialog.getByRole('link',{name:'Ask about availability',exact:true});assert.ok(decodeURIComponent(await link.getAttribute('href')).includes('Book inquiry: '+title));
  assert.ok(await dialog.locator('.book-modal p:not(.eyebrow):not(.book-author)').evaluate(el=>parseFloat(getComputedStyle(el).fontSize))>=16);
  if(i===0){await page.screenshot({path:`${dir}/${name}-detail.png`});await dialog.evaluate(el=>el.scrollTop=el.scrollHeight);const close=await dialog.getByRole('button',{name:'Close book details'}).boundingBox();assert.ok(close.y>=0&&close.y+close.height<=height);}
  await page.keyboard.press('Escape');assert.equal(await dialog.isVisible(),false);assert.equal(await card.evaluate(el=>el===document.activeElement),true);
 }
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);results.push(`${name}: descriptions, gallery layout, readable details, four book-specific inquiry links, reachable close, Escape/focus return and no overflow passed.`);await page.close();
}
assert.deepEqual(errors,[]);await writeFile(`${dir}/results.json`,JSON.stringify({results,errors},null,2));console.log({results,errors});await browser.close();
