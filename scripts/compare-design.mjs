import {browserOptions} from './browser.mjs';
import {chromium} from '@playwright/test';
const browser=await chromium.launch(browserOptions());
const page=await browser.newPage({viewport:{width:1440,height:960},deviceScaleFactor:1});
await page.goto('http://127.0.0.1:3002/');
await page.setContent('<body style="margin:0"><canvas id="comparison" width="1440" height="940"></canvas></body>');
await page.evaluate(async()=>{
 const canvas=document.getElementById('comparison'),ctx=canvas.getContext('2d');
 ctx.fillStyle='#e7e7e7';ctx.fillRect(0,0,1440,940);ctx.fillStyle='#12172c';ctx.font='bold 18px sans-serif';ctx.fillText('SELECTED DESIGN',20,27);ctx.fillText('IMPLEMENTATION',740,27);
 const images=await Promise.all(['/design/selected-reference.png','/qa/desktop-opening.png'].map(async src=>{const im=new Image();im.src='http://127.0.0.1:3002'+src;await im.decode();return im;}));
 ctx.drawImage(images[0],0,0,images[0].width,images[0].height,0,40,720,900);
 ctx.drawImage(images[1],0,0,1440,1800,720,40,720,900);
});
await page.locator('canvas').screenshot({path:'qa/design-comparison.png'});
await page.evaluate(async()=>{
 const canvas=document.getElementById('comparison');canvas.width=2880;canvas.height=902;const ctx=canvas.getContext('2d');
 ctx.fillStyle='#e7e7e7';ctx.fillRect(0,0,2880,902);ctx.fillStyle='#12172c';ctx.font='bold 20px sans-serif';ctx.fillText('SELECTED DESIGN — GALLERY DETAIL',20,28);ctx.fillText('IMPLEMENTATION — GALLERY DETAIL',1460,28);
 const images=await Promise.all(['/design/selected-reference.png','/qa/desktop-opening.png'].map(async src=>{const im=new Image();im.src='http://127.0.0.1:3002'+src;await im.decode();return im;}));
 ctx.drawImage(images[0],0,730,1122,672,0,40,1440,862);
 ctx.drawImage(images[1],0,938,1440,862,1440,40,1440,862);
});
await page.locator('canvas').screenshot({path:'qa/gallery-comparison.png'});
await browser.close();
