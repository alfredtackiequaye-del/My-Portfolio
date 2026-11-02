import {chromium} from '@playwright/test';import {browserOptions} from './browser.mjs';import {mkdir,writeFile} from 'node:fs/promises';import assert from 'node:assert/strict';
const dir='qa/contact-refinements';await mkdir(dir,{recursive:true});const browser=await chromium.launch(browserOptions());const results=[],errors=[];
for(const [name,width,height] of [['desktop',1440,1000],['tablet',768,1000],['mobile',390,844],['small-mobile',320,844]]){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{if(window.failClipboard)throw Error('Clipboard unavailable');window.copiedInquiry=text;}}});});
 await page.route('https://formspree.io/**',r=>r.abort());
 await page.goto('http://127.0.0.1:3002/#contact',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 const form=page.locator('.contact-form');assert.ok(await form.getAttribute('aria-describedby'));
 await page.getByRole('button',{name:'Copy inquiry',exact:true}).click();assert.equal(await page.evaluate(()=>window.copiedInquiry),undefined);
 await page.getByLabel('Your name').fill('Portfolio reviewer');await page.getByLabel('Email address').fill('reviewer@example.com');await page.getByLabel('I’m interested in').selectOption('Help me choose');await page.getByLabel('A little about your project').fill('I need a clearer visual identity for my business.');
 await page.getByRole('button',{name:'Send message',exact:true}).click();const draft=decodeURIComponent(await page.getByRole('link',{name:'Open email draft'}).getAttribute('href'));assert.ok(draft.includes('subject=Help me choose'));assert.ok(draft.includes('clearer visual identity'));
 await page.getByRole('button',{name:'Copy inquiry',exact:true}).click();assert.match(await page.evaluate(()=>window.copiedInquiry),/Subject: Help me choose/);assert.match(await page.evaluate(()=>window.copiedInquiry),/reviewer@example.com/);
 await page.getByLabel('A little about your project').fill('My revised inquiry needs a Power BI dashboard.');assert.equal(await page.getByRole('link',{name:'Open email draft'}).count(),0);
 await page.evaluate(()=>window.failClipboard=true);await page.getByRole('button',{name:'Copy inquiry',exact:true}).click();const fallback=page.getByLabel('Your inquiry text');assert.match(await fallback.inputValue(),/revised inquiry/);assert.equal(await fallback.evaluate(el=>el===document.activeElement&&el.selectionEnd===el.value.length),true);
 await page.evaluate(()=>window.failClipboard=false);
 await page.getByRole('button',{name:'View Business Overview — Dashboard Concept',exact:true}).click();await page.locator('.study-dialog').getByRole('link',{name:'Discuss something similar'}).click();await page.getByRole('button',{name:'Copy inquiry',exact:true}).click();assert.match(await page.evaluate(()=>window.copiedInquiry),/Reference concept: Business Overview/);assert.match(await page.evaluate(()=>window.copiedInquiry),/revised inquiry/);
 await page.unroute('https://formspree.io/**');let posted;await page.route('https://formspree.io/**',r=>{posted=r.request().postData();r.fulfill({status:200,contentType:'application/json',body:'{"ok":true}'});});
 await page.getByLabel('A little about your project').fill('Please send this through Formspree.');await page.getByRole('button',{name:'Send message',exact:true}).click();await page.getByText('Your message has been sent').waitFor();assert.ok(posted.includes('Please send this through Formspree.'));assert.ok(posted.includes('Business Overview'));assert.equal(await page.getByLabel('A little about your project').inputValue(),'');
 await page.locator('#contact').screenshot({path:`${dir}/${name}.png`,style:'.site-header,.skip-link{visibility:hidden!important}'});
 assert.ok(await page.locator('.contact-form label').first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize))>=14);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 results.push(`${name}: validation, draft content, clipboard success/failure, selectable fallback, fresh edited text, project reference, readable labels and no overflow passed.`);await page.close();
}
assert.deepEqual(errors,[]);console.log({results,errors});await writeFile(`${dir}/results.json`,JSON.stringify({results,errors},null,2));await browser.close();
