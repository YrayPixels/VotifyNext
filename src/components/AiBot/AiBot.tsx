import { useEffect, useState } from "react";
import CustomInput from "../customInput/customInput";
import { isJson, runGenAi, scrapeProposal } from "../../requestsHandler/genAi";
import { Brush, CleaningServices, Close } from "@mui/icons-material";
import ChatBox from "./ChatBox";
import { isValidUrl } from "@/requestsHandler/request";

export default function AiBot({ setStartAi, url, setNotify, proposalTitle, }: any) {

    const [messageText, setMessageText] = useState('')
    const [newText, setNewText] = useState('');
    const [loader, setLoader] = useState(false);
    const [scrapedData, setScrapedData] = useState('');
    const history = JSON.parse(localStorage.getItem('mobotChatHistory') || "[]") || [];
    let messageCreatorObj = {

        mainMessage: [],

        createsNewUserMessage: function (user_message: string) {
            let newMessage = [
                {
                    role: "user",
                    parts: [{ text: `${user_message}` }],
                }
            ]
            setNewText(Math.random().toString());
            setLoader(true);
            let newMes = history.concat(newMessage);
            this.mainMessage = newMes;
            localStorage.setItem('mobotChatHistory', JSON.stringify(newMes));
        },
        createsModelMessage: function (bot_message: any) {
            let withModel = this.mainMessage.concat(bot_message);
            localStorage.setItem('mobotChatHistory', JSON.stringify(withModel));
        }
    }


    useEffect(() => {
        setLoader(true);

        if (!isValidUrl(url)) {
            setLoader(false);
            setNotify({
                message: 'Invalid URL, please provide a url to a page,not a file or picture',
                type: 'error'

            })
            localStorage.removeItem('mobotChatHistory');
            return;
            setNewText(Math.random().toString());

        };
        localStorage.removeItem('mobotChatHistory');
        setNewText(Math.random().toString());
        (async () => {
            let data = await scrapeProposal(url);

            setScrapedData(data);
            sendChat(`type={ProposalData} ${data} 
            help me analyse this proposal and help me make informed decisions about what to do;
            `);

        })()
    }, [url])

    function sendChat(message: string) {
        setLoader(true);
        if (!message.includes("type={ProposalData")) {
            messageCreatorObj.createsNewUserMessage(message)
        } 
        const proposalData = localStorage.getItem('scrapedData');
        const proposalQuestions = `I need help with this proposal ${proposalData},
        However take my message which is this most important- respond to this question ${message} if it is relating to the proposal then answer based on the proposal.
        make your answer brief  and coincise to help me understand better if it is the proposal related, and flow freely if you are answering the message alone.

        Please follow this instructions strictly.
        `;


        function handleResponse(response: any) {
            try {
                if (isJson(response.text)) {
                    let responseJson = JSON.parse(response.text);
                    let aiMessage = [
                        {
                            role: 'model',
                            parts: `${responseJson.message}`,
                            lists: `${JSON.stringify(responseJson.lists)}`
                        }
                    ];
                    messageCreatorObj.createsModelMessage(aiMessage);
                    setLoader(false);
                    setNewText(Math.random().toString());
                    setMessageText('');
                } else {
                    let responseJson = response.text;
                    let aiMessage = [
                        {
                            role: 'model',
                            parts: `${responseJson}`,
                            lists: `[]`
                        }
                    ];
                    messageCreatorObj.createsModelMessage(aiMessage);

                    setLoader(false);
                    setNewText(Math.random().toString());
                    setMessageText('');
                }
            } catch (e) {
                console.error('Error handling response:', e);
                setTimeout(
                    () => {
                        runGenAi(message).then(handleResponse)
                    },
                    2000);
            }
        }
        runGenAi(proposalQuestions).then(handleResponse);
        setMessageText('');
    }
    const addChat = () => {
        sendChat(messageText);
    }
    return (
        <div className="absolute w-screen h-screen top-0 left-0 bg-black/50 p-10 ">
            <div className="relative bg-black h-[100%] overflow-hidden rounded-xl">

                <div className='bg-back p-3 flex justify-between items-center w-100' style={{ zIndex: 999999, height: '50px', position: 'sticky', top: 0, }}>
                    <div className="font-bold">{proposalTitle}</div>
                <div className='text-white' onClick={() => setStartAi(false)}>
                    <Close />
                </div>
            </div>
                <div className='py-[20px]' style={{ overflowY: 'scroll', top: 0, height: '82%', position: 'relative', }}>
                <ChatBox newText={newText} loader={loader} sendChat={sendChat} />
            </div>


            <div className="absolute bg-black bottom-0 w-full p-2">
                <CustomInput type="text"
                    value={messageText}
                    onChange={(e) => { setMessageText(e.target.value) }}
                    placeholder="enter your message!"
                    addOnEnd={
                        <div className="space-x-3 flex flex-row items-center justify-center">
                            <button onClick={() => addChat()} className="text-[#73dca5] p-1 rounded-xl font-semibold border border-[#73dca5]">send</button>
                            <div onClick={() => {
                                localStorage.removeItem('mobotChatHistory');
                                setNewText(Math.random().toString());
                            }}>
                                <CleaningServices className="text-[#73dca5]" />
                            </div>
                        </div>
                    }
                />

            </div>

            </div>
        </div>
    );
}
