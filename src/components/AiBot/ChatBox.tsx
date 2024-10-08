import { Avatar } from '@mui/material'
import { useEffect, useRef, useState } from 'react'


export default function ChatBox({ newText, loader }: any) {
    const [mainHistory, setMainHistory] = useState([]);
    useEffect(() => {
        setMainHistory(JSON.parse(localStorage.getItem('mobotChatHistory') || "[]") || []);
    }, [newText])

    const messageContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // Scroll to the bottom when messages change
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }

    }, [newText]);
    return (
        <div ref={messageContainerRef} className='mb-[40px] px-3'>
            {
                Array.isArray(mainHistory) && mainHistory.map((item: any, index: number) => {
                    return <div key={index}>
                        {item.role == 'model' ?
                            <div className='flex items-center mb-3'>
                                <div className='me-2'>
                                    <Avatar alt={item.role} src="../images/robo.png" />
                                </div>
                                <div style={{ height: '100%', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', borderBottomLeftRadius: '10px' }} className='max-w-[500px] p-2 bg-white/10'>
                                    <p> {item.parts[0].text ?
                                        item.parts[0].text.split('\n').map((line: any, index: number) => (
                                            <span key={index}>
                                                {line}
                                                <br />
                                            </span>
                                        ))

                                        :
                                        item.parts.split('\n').map((line: any, index: number) => (
                                            <span key={index}>
                                                {line}
                                                <br />
                                            </span>
                                        ))
                                    }</p>
                                </div>


                            </div>
                            : index != 0 &&
                            <div className='flex items-center justify-end mb-3' style={{ right: '', }}>

                                <div style={{ maxWidth: '300px', height: '100%', borderTopLeftRadius: '10px', borderBottomRightRadius: '10px', borderBottomLeftRadius: '10px' }} className='p-2 bg-white/10 text-white shadow'>
                                    <p>{`${item.parts[0].text ?? item.parts}`}</p>
                                </div>
                                <div className='ms-2'>
                                    <Avatar alt={item.role} src="../images/robo.png" />
                                </div>
                            </div>
                        }
                    </div>

                })
            }
            {
                loader && <>
                    <div className='flex items-center mb-3'>
                        <div className='me-2'>
                            <Avatar alt='MDBOT' src="../images/robo.png" />
                        </div>
                        <div style={{ width: '300px', height: '100%', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', borderBottomLeftRadius: '10px' }} className='p-2 shadow'>
                            <p>Thinking ...
                            </p>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
