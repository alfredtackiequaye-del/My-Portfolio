import {chromium} from '@playwright/test';
import {browserOptions} from './browser.mjs';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const dir='qa/selected-work-refinements';
await mkdir(dir,{recursive:true});
const browser=await chromium.launch(browserOptions());
const results=[],errors=[];
for(const [name,width,height] of [['desktop',1440,1000],['mobile',390,844]]){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:3002/#work',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 await page.locator('#work').scrollIntoViewIfNeeded();
 await page.screenshot({path:`${dir}/${name}-gallery.png`});
 assert.equal(await page.getByText(/Real case studies will be added/).count(),0);
 for(const [title,service] of [['Cobalt — Brand Identity Concept','Brand identity & graphic design'],['Business Overview — Dashboard Concept','Power BI dashboards & data storytelling']]){
  await page.getByRole('button',{name:`View ${title}`,exact:true}).click();
  const dialog=page.locator('.study-dialog');
  await dialog.waitFor({state:'visible'});
  assert.equal(await dialog.locator('.study-decisions li').count(),3);
  await page.screenshot({path:`${dir}/${name}-${service.startsWith('Power BI')?'data':'brand'}-detail.png`});
  await dialog.evaluate(el=>el.scrollTop=el.scrollHeight);
  const bounds=await page.getByRole('button',{name:'Close project',exact:true}).boundingBox();
  assert.ok(bounds.y>=0&&bounds.y+bounds.height<=height,`Close button reachable: ${JSON.stringify(bounds)}`);
  if(name==='mobile'){
   assert.ok(await dialog.locator('.study-decisions p').first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize))>=16);
   await page.screenshot({path:`${dir}/${name}-detail-bottom.png`});
  }
  await dialog.getByRole('link',{name:'Discuss something similar'}).click();
  await page.locator('.inquiry-context').waitFor();
  assert.equal(await page.locator('select[name=service]').inputValue(),service);
  assert.equal(await page.locator('input[name=project]').inputValue(),title);
  if(service.startsWith('Brand')){
   await page.locator('input[name=name]').fill('Portfolio reviewer');
   await page.locator('input[name=email]').fill('reviewer@example.com');
   await page.locator('textarea[name=message]').fill('I would like help with a new business identity.');
  }else{
   assert.equal(await page.locator('textarea[name=message]').inputValue(),'I would like help with a new business identity.');
   await page.getByRole('button',{name:'Prepare email',exact:true}).click();
   const draft=decodeURIComponent(await page.getByRole('link',{name:'Open email draft again'}).getAttribute('href'));
   assert.ok(draft.includes(`Reference concept: ${title}`));
   assert.ok(draft.includes(`subject=${service} — ${title}`));
  }
 }
 await page.locator('.contact-form').scrollIntoViewIfNeeded();
 await page.screenshot({path:`${dir}/${name}-inquiry.png`});
 await page.getByRole('button',{name:'Clear project reference'}).click();
 assert.equal(await page.locator('input[name=project]').count(),0);
 assert.equal(await page.locator('select[name=service]').inputValue(),'Power BI dashboards & data storytelling');
 assert.match(await page.locator('textarea[name=message]').inputValue(),/new business identity/);
 await page.getByRole('button',{name:'View Cobalt — Brand Identity Concept',exact:true}).click();
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('.study-dialog').isVisible(),false);
 assert.equal(await page.getByRole('button',{name:'View Cobalt — Brand Identity Concept',exact:true}).evaluate(el=>el===document.activeElement),true);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 results.push(`${name}: gallery, readable details, sticky close, matching service, retained message, removable project reference, email draft and keyboard dismissal passed.`);
 await page.close();
}
assert.deepEqual(errors,[]);
await writeFile(`${dir}/results.json`,JSON.stringify({results,errors},null,2));
console.log(JSON.stringify({results,errors},null,2));
await browser.close();
