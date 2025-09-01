import { chromium } from 'playwright';
import type { InstagramAccount } from './data.types.js';



export async function getInstagramAccount(userid: string) {
    const browser = await chromium.launch({ headless: true });  
    const context = await browser.newContext();
    const page = await context.newPage();
   
    const igPromise = new Promise((resolve, reject) => {
        page.on('response', async response => {
            const url = response.url();
            const status = response.status();
            
            if (url === "https://www.instagram.com/graphql/query" && status === 200) {
                try {
                    const responseBody: InstagramAccount = await response.json();
                    const formattedJson = JSON.stringify(responseBody, null, 2);
                    const lineCount = formattedJson.split('\n').length;
                    if(lineCount > 50){
                        resolve(responseBody);
                    }
                    
                } catch (error) {
                    reject(`❌ Error saving response:${error}`);
                }
            }
        });
    });
      
    await page.goto(`https://www.instagram.com/${userid}/`);
    await page.waitForLoadState('networkidle');
    
    context.close().then(() => {browser.close()});

    const res = await igPromise as InstagramAccount;

    return res

}


