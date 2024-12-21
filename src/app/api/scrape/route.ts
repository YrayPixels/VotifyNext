import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';


export const POST = async (req: Request) => {

    const body = await req.json();
    const url = body.url;

    if (!url || url == "") {
        return Response.json({ message: "Url is Required" }, { status: 400, })

    }

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();

        await page.goto(url, {
            timeout: 60000, // Increase timeout to 60 seconds
            waitUntil: 'domcontentloaded' // Wait only for the DOM to be ready
        });

        // Extract specific information from the page
        const extractedData = await page.evaluate(() => {

            // Replace this with the actual selectors and data you want to extract
            const headings: any = {};
            for (let i = 1; i <= 6; i++) {
                const headingTag = `h${i}`;
                headings[headingTag] = Array.from(document.querySelectorAll(headingTag)).map((h: any) => h.innerText);
            }
            const paragraphs = Array.from(document.querySelectorAll('p')).map(p => p.innerText);
            return { headings, paragraphs };
        });

        return Response.json({ content: extractedData }, {});


    } catch (error) {
        console.error('Error scraping the proposal:', error);
        return Response.json({ message: "Failed to Scrap Content" }, { status: 400, })
    } finally {
        if (browser) {
            await browser.close();
        }
    }


}