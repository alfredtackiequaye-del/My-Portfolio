import {chromium} from '@playwright/test';
import {browserOptions} from './browser.mjs';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const dir='qa/services-refinements';await mkdir(dir,{recursive:true});
const browser=await chromium.launch(browserOptions());const results=[],errors=[];
for(const [name,width,height] of [['desktop',1440,1000],['tablet',1024,900],['mobile',390,844],['small-mobile',320,844]]){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:3002/#services',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 const section=page.locator('#services');assert.equal(await section.locator('.service-preview:visible').count(),4);
 await section.screenshot({style:'.site-header,.skip-link{visibility:hidden!important}',path:`${dir}/${name}-overview.png`});
 for(let i=0;i<4;i++){
  const detail=section.locator('details').nth(i);await detail.locator('summary').click();
  assert.equal(await detail.locator('.service-deliverables h4').textContent(),'What you receive');
  assert.ok(await detail.locator('.service-deliverables li').count()>=3);
  if(width<800)assert.ok(await detail.locator('.service-body>p').evaluate(el=>parseFloat(getComputedStyle(el).fontSize))>=16);
  if(i===3)await detail.screenshot({path:`${dir}/${name}-data-open.png`});
  const title=await detail.locator('h3').textContent();await detail.getByRole('button',{name:'Discuss this service',exact:true}).click();
  assert.equal(await page.locator('select[name=service]').inputValue(),title);
 }
 await page.locator('textarea[name=message]').fill('I need guidance on my next business project.');
 await section.getByRole('button',{name:'Help me choose a service'}).click();
 assert.equal(await page.locator('select[name=service]').inputValue(),'Help me choose');
 assert.match(await page.locator('textarea[name=message]').inputValue(),/guidance/);
 assert.equal(await page.evaluate(()=>location.hash),'#contact');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 await section.locator('summary').first().focus();const detail=section.locator('details').first();const before=await detail.getAttribute('open');await page.keyboard.press('Enter');assert.notEqual(await detail.getAttribute('open'),before);
 results.push(`${name}: visible previews, labelled deliverables, matching inquiries, help-to-choose flow, preserved message, keyboard expansion and no overflow passed.`);await page.close();
}
assert.deepEqual(errors,[]);await writeFile(`${dir}/results.json`,JSON.stringify({results,errors},null,2));console.log({results,errors});await browser.close();
