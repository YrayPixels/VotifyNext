// import { useState } from "react";
"use client";
import { useEffect, useState } from "react";
import ItemDisplay from "./ItemDisplay";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { DaoVoting, IDL } from "../requestsHandler/DAO_IDL/dao_voting";
import { newProposal } from "../requestsHandler/programConnector";
import CustomInput from "./customInput/customInput";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

export default function Main() {
  const [newProp, setNewProp] = useState(false);
  const [notify, setNotify] = useState({
    message: '',
    type: ''
  })
  const [anchorProgram, setAnchorProgram] = useState<any>(null)
  const [items, setItems] = useState<any>([])
  const [option, setOption] = useState('')
  const { wallet, signTransaction, publicKey } = useWallet();

  const anchorWallet = useAnchorWallet();

  const [proposalCreate, setProposalCreate] = useState({
    title: '',
    description: '',
    options: [],
    externalLink: '',
  }
  )
  useEffect(() => {
    if (anchorWallet == null) {
      return;
    }
    (async () => {
      const anchorProvider = new AnchorProvider(connection, anchorWallet, {});
      if (!anchorProvider) {
        return;
      }
      const programId = new PublicKey("AvxgDjZnQSYYhMCu8fCcRG7NMevifPp4yC8y8KfjMYfy");
      const program = new Program<DaoVoting>(IDL, programId, anchorProvider);
      let proposals = await program?.account?.proposal.all();
      setItems(proposals);
      console.log(proposals);
      setAnchorProgram(program)
      console.log(proposals);
    })()
  }, [publicKey, wallet, anchorWallet])

  const createNewProposal = async () => {
    if (proposalCreate.title == "" || proposalCreate.description == "" || proposalCreate.options.length == 0 || proposalCreate.externalLink == "") {
      setNotify({
        message: 'All fields are required',
        type: 'error'
      })
      setTimeout(() => {
        setNotify({
          message: "",
          type: ''
        })
      }, 2000)
      return;
    }
    if (publicKey == null || signTransaction == null) {
      setNotify({
        message: 'Please connect your wallet to create proposal',
        type: 'error'
      })
      setTimeout(() => {
        setNotify({
          message: "",
          type: ''
        })
      }, 2000)
      return;
    }
    try {
      const tx = await newProposal({
        title: proposalCreate.title,
        description: proposalCreate.description,
        options: proposalCreate.options,
        externalLink: proposalCreate.externalLink,
        user: publicKey.toString(),
        program: anchorProgram,
      })
      // tx.feePayer = new PublicKey(publicKey.toString);
      // tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      // console.log(tx);
      // await signTransaction(tx)

      setNotify({
        message: 'Proposal created successfully',
        type: 'success'
      })
      setNewProp(false)
      // wallet.makeRefetch()
    } catch (err) {
      console.log(err);
    }

  }

  const addOption = () => {
    setProposalCreate((prevState: any) => ({
      ...prevState, // Keep the existing state
      options: [...prevState.options, option], // Add the new option to the options array
    }));
  }
  return (

    <main className="pt-[3rem] pb-[5rem] text-white">
      <div className="flex flex-row justify-center items-center">

        {notify.type !== '' &&
          <div className={`${notify.type == "success" ? 'bg-green-500' : "bg-red-500"} w-[400px] shadow rounded-lg z-50 p-3 absolute top-20`}>
            <p className='text-center'>{notify.message}</p>
          </div>
        }
      </div>

      <div className="mb-3 flex flex-col justify-center leading-tight items-center space-y-1">
        <h2 className="text-[100px] text-[#fdefd8] text-center font-extrabold camar-text">Votify</h2>
        <p className="text-[18px] text-[#fdefd8]   text-center camar-text w-6/12">
          AI Powered Governance Voting
        </p>
        <div className="flex flex-row  p-2 justify-center gap-x-2">

          <button onClick={() => setNewProp(true)} className="p-3  shadow text-[#73dca5] rounded-xl text-[14px] font-semibold border border-[#73dca5]">
            Create New Proposal
          </button>
        </div>
      </div>
      <ItemDisplay items={items} />

      {newProp &&
        <div className="absolute top-0 h-[600px] w-screen left-0 flex flex-col justify-center items-center bg-black/95">
          <div className="border border-[#73dca5] w-10/12 w-lg-[50%] rounded-xl p-4">
            <CustomInput
              type="text"
              placeholder="enter proposal title"
              onChange={(e) => setProposalCreate({ ...proposalCreate, title: e.target.value })}
            />
            <CustomInput
              type="text"
              onChange={(e) => setProposalCreate({ ...proposalCreate, description: e.target.value })}
              placeholder="enter description"
            />
            <CustomInput
              type="text"
              onChange={(e) => setProposalCreate({ ...proposalCreate, externalLink: e.target.value })}
              placeholder="enter document link, must be hosted on platforms"
            />
            <div className="px-4" >
              {proposalCreate.options.length > 0 && proposalCreate.options.map((item: any, index: number) => {
                return <li key={index}>{item}</li>
              })}
              <CustomInput
                type="text"
                onChange={(e) => setOption(e.target.value)}
                placeholder="Add Options"
                addOnEnd={
                  <button type="button" onClick={() => addOption()} className="p-3 w-full mt-3  shadow text-[#73dca5] rounded-xl text-[14px] font-semibold border border-[#73dca5]">
                    Add
                  </button>}
              />

            </div>
            <div>
              <button onClick={() => createNewProposal()} className="p-3 w-full mt-3  shadow text-[#73dca5] rounded-xl text-[14px] font-semibold border border-[#73dca5]">
                Create
              </button>
              <button onClick={() => setNewProp(false)} className="p-3 w-full mt-3  shadow text-red-500 rounded-xl text-[14px] font-semibold border border-red-500">
                Cancel
              </button>
            </div>

          </div>
        </div>

      }

    </main>
  );
}
