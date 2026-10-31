import {chromium} from '@playwright/test';
import {browserOptions} from './browser.mjs';
const browser=await chromium.launch(browserOptions());
const page=await browser.newPage({viewport:{width:1440,height:540},deviceScaleFactor:1});
await page.goto('http://127.0.0.1:3002/');
await page.setContent('<body style="margin:0"><canvas width="1440" height="540"></canvas></body>');
await page.evaluate(async({before,after})=>{
 const ctx=document.querySelector('canvas').getContext('2d');ctx.fillStyle='#ececec';ctx.fillRect(0,0,1440,540);ctx.fillStyle='#111c36';ctx.font='bold 18px sans-serif';ctx.fillText('BEFORE',20,27);ctx.fillText('REFINED HOMEPAGE',740,27);
 for(const [i,name] of [before,after].entries()){const im=new Image();im.src=`http://127.0.0.1:3002/qa/home-refinement/${name}-desktop.png`;await im.decode();ctx.drawImage(im,i*720,40,720,500);}
},{before:process.argv[2]||'before',after:process.argv[3]||'after'});
await page.locator('canvas').screenshot({path:`qa/home-refinement/${process.argv[3]||'after'}-comparison.png`});await browser.close();
