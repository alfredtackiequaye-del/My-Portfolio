import {chromium} from '@playwright/test';
import {browserOptions} from './browser.mjs';
const browser=await chromium.launch(browserOptions());
const page=await browser.newPage({viewport:{width:1440,height:2160},deviceScaleFactor:1});
await page.goto('http://127.0.0.1:3002/');await page.setContent('<body style="margin:0"><canvas width="1440" height="2160"></canvas></body>');
await page.evaluate(async()=>{
 const ctx=document.querySelector('canvas').getContext('2d');ctx.fillStyle='#e5e7eb';ctx.fillRect(0,0,1440,2160);
 const sections=['hero','work-section','about-section','services-section','process-section','books-section','contact-section'];
 for(const [i,name] of sections.entries()){
  const x=(i%2)*720,y=Math.floor(i/2)*540;
  ctx.fillStyle='#14243d';ctx.font='bold 16px sans-serif';ctx.fillText(name.replace('-section','').toUpperCase(),x+20,y+26);
  const img=new Image();img.src=`http://127.0.0.1:3002/qa/shared-orbits/${name}-desktop.png`;await img.decode();ctx.drawImage(img,x,y+40,720,500);
 }
});
await page.locator('canvas').screenshot({path:'qa/shared-orbits/all-sections.png'});await browser.close();
