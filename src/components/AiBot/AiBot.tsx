import { useEffect, useState } from "react";
import CustomInput from "../customInput/customInput";
import { isJson, runGenAi, scrapeProposal } from "../../requestsHandler/genAi";
import { Close } from "@mui/icons-material";
import ChatBox from "./ChatBox";




export default function AiBot({ setStartAi }: any) {

    const [messageText, setMessageText] = useState('')
    const [newText, setNewText] = useState('');
    const [loader, setLoader] = useState(false);
    const history = JSON.parse(localStorage.getItem('mobotChatHistory') || "") || [];
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
        (async () => {
            let data = await scrapeProposal('https://www.jupresear.ch/t/jup-juice-work-group-jjwg-trial-proposal/22159');
            console.log(data)
        })()
    }, [])
    function sendChat() {

        if (messageText.includes('clear') || messageText.includes('Clear')) {
            localStorage.removeItem('mobotChatHistory');
            setNewText(Math.random().toString());
            return 0
        }
        messageCreatorObj.createsNewUserMessage(messageText)

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
                        runGenAi(messageText).then(handleResponse)
                    },
                    2000);
            }
        }
        runGenAi(messageText).then(handleResponse);
        setMessageText('');
    }
    return (
        <div className="relative bg-black/50 h-[500px] overflow-hidden rounded-xl">

            <div className='bg-back p-3 flex justify-end items-center w-100' style={{ zIndex: 999999, height: '50px', position: 'sticky', top: 0, }}>
                <div className='text-white' onClick={() => setStartAi(false)}>
                    <Close />
                </div>
            </div>
            <div className='' style={{ overflowY: 'scroll', top: 0, height: '400px', position: 'relative', }}>
                <ChatBox newText={newText} loader={loader} sendChat={sendChat} />
            </div>


            <div className="absolute bg-black bottom-0 w-full p-2">
                <CustomInput type="text"
                    value={messageText}
                    onChange={(e) => { setMessageText(e.target.value) }}
                    placeholder="enter your message!"
                    addOnEnd={<button onClick={() => sendChat()} className="text-[#73dca5] p-1 rounded-xl font-semibold border border-[#73dca5]">send</button>}
                />
            </div>

        </div>
    );
}
