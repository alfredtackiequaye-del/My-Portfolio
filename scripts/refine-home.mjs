import {chromium} from '@playwright/test';
import {browserOptions} from './browser.mjs';
import {mkdir} from 'node:fs/promises';
await mkdir('qa/home-refinement',{recursive:true});
const browser=await chromium.launch(browserOptions());
for(const [name,width,height] of [['desktop',1440,1000],['tablet',1024,900],['mobile',390,844]]){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:3002/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:`qa/home-refinement/${process.argv[2]||'before'}-${name}.png`});await page.close();
}
await browser.close();
