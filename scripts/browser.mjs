import { chromium } from '@playwright/test';
import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';

export function browserOptions() {
  const configured=process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
  if(configured)return {headless:true,executablePath:configured};
  if(existsSync(chromium.executablePath()))return {headless:true};
  const cache=path.join(homedir(),'Library','Caches','ms-playwright');
  if(process.platform==='darwin'&&existsSync(cache)){
    const versions=readdirSync(cache).filter(name=>/^chromium-\d+$/.test(name)).sort((a,b)=>Number(b.split('-')[1])-Number(a.split('-')[1]));
    for(const version of versions){
      const executablePath=path.join(cache,version,'chrome-mac-arm64','Google Chrome for Testing.app','Contents','MacOS','Google Chrome for Testing');
      if(existsSync(executablePath))return {headless:true,executablePath};
    }
  }
  return {headless:true};
}
