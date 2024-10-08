"use client";
import { useEffect, useState } from "react";
import AiBot from "./AiBot/AiBot";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { DaoVoting, IDL } from "../requestsHandler/DAO_IDL/dao_voting";
import { castVote } from "../requestsHandler/programConnector";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

export default function Proposals() {
  const url = new URL(window.location.href);

  const proposalId = url.searchParams.get('id');

  const [proposalItem, setProposalItem] = useState<any>(null)

  const [startAi, setStartAi] = useState(false)
  const [anchorProgram, setAnchorProgram] = useState<any>(null)

  const { wallet, signTransaction, publicKey } = useWallet()
  const anchorWallet = useAnchorWallet()

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

      if (proposalId == null) {
        return;
      }
      const proposal = await program.account.proposal.fetch(proposalId);
      setProposalItem(proposal)
      console.log(proposal);
      setAnchorProgram(program)
    })()
  }, [publicKey, wallet, anchorWallet])


  const voting = async (index: number) => {

    if (publicKey == null) {
      return;
    }
    try {
      const tx = await castVote(index, anchorProgram, publicKey.toString())
      if (signTransaction) {
        await signTransaction(tx)
        // wallet.makeRefetch()
      }

    } catch (err) {
      console.log(err);
    }

  }



  return (


    <main className="pt-[3rem] pb-[5rem] text-white">

      <div className="mb-3 grid grid-cols-3 gap-x-2">

        <div className="flex flex-col col-span-2  space-y-4">

          <div className="bg-white/5 p-5 rounded-xl">
            <div className="text-[20px] font-bold">{proposalItem?.title}</div>
            <div className="space-x-4 py-2 flex flex-wrap">

              <Link target="_blank" href={proposalItem ? proposalItem?.link : ""} className="p-3 underline  text-[#73dca5] rounded-xl text-[1.5rem] font-semibold">
                View full Proposal
              </Link>

              <button onClick={() => setStartAi(true)} className="p-3 text-[#73dca5] rounded-xl text-[1.5rem] font-semibold border border-[#73dca5]">
                Analyze with AI
              </button>
            </div>

          </div>

          <div className="bg-white/5 p-5 rounded-xl">
            <div className="text-[14px] flex flex-row justify-between">
              <p>Cast Your Vote</p>
              <p>Voting power -Regular-</p>
            </div>
            <div className="py-5 flex justify-between ">
              {proposalItem && proposalItem?.options?.map((vote: any, index: number) => {
                return (
                  <button onClick={() => voting(index)} key={index} className="py-2 border border-[#73dca5] rounded-xl p-2 text-[#73dca5]">
                    {vote}
                  </button>
                )
              })}
            </div>

          </div>
        </div>

        <div className="bg-white/5 p-5 rounded-xl">
          <div className="flex flex-row  text-[14px] justify-between">
            <p>Results</p>
            <p>{proposalItem && proposalItem?.voteCounts?.reduce((acc: any, curr: any) => acc + curr, 0)} Votes</p>
          </div>

        </div>




      </div>

      {startAi &&
        <div>
          {/* AI Chat */}
          <AiBot startAi={startAi} setStartAi={setStartAi} />
        </div>
      }

    </main>
  );
}
