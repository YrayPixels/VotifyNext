import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GA_KEY || "");


export async function runGenAi(message: any) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const json_history = [
        {
            "role": "user",
            "parts": [{ text: "Hello" }],

        },
        {
            "role": "model",
            "parts": [{ text: `Great to meet you!` }],
        },
    ]

    const chat = model.startChat({
        history: json_history,
        generationConfig: {
            maxOutputTokens: 10000,
        },
    });

    const msg = message;
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    return {
        text: text,
    };
}



export const MdbotAbout = `Welcome to Votify Training Manual!

Votify is a professional bot that helps summarize DAO voting proposals.`


export const mainInstructions = ``;


export const isJson = (str: any) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


export async function scrapeProposal(url: string) {
    try {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const response = await fetch(proxyUrl + url);
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error scraping the proposal:', error);
        return "";
    }
}

// // URL of the page you want to scrape
// const url = 'https://www.jupresear.ch/t/jup-juice-work-group-jjwg-trial-proposal/22159';

// // Call the function to scrape the data
// scrapeProposal(url).then((data) => {
//     console.log(data);
// });
