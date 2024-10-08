import { BN, Program } from "@project-serum/anchor"
import { Connection, PublicKey, Transaction } from "@solana/web3.js";


export const fetchProposals = async (program: Program) => {

    try {
        let programs = await program?.account?.proposal.all();
        return programs;
    } catch (error) {
        console.log("Error fetching proposals", error);
        return error;
    }
}

// export const registerVoter = async (index: number, program: Program, user: string) => {


//     const userPubkey = new PublicKey(user)

//     const tx = new Transaction()

//     const [voterPDA, voterBump] = await PublicKey.findProgramAddress(
//         [userPubkey.toBuffer()],
//         program.programId
//     );
//     console.log(voterBump)
//     const regInstruction = await program.methods
//         .registerVoter()
//         .accounts({
//             dao: new PublicKey("8fEQu9YTUjMhNsYF7bGTn8WYdewhhrMSPQxyCbHmNkNJ"),
//             voter: voterPDA,
//             user: userPubkey,
//         }).instruction()

//     tx.add(regInstruction)
//     return tx;

// }

export const castVote = async (index: number, program: Program, user: string, connection: Connection) => {


    const userPubkey = new PublicKey(user)


    const tx = new Transaction()

    const [voterPDA, voterBump] = await PublicKey.findProgramAddress(
        [userPubkey.toBuffer()],
        program.programId
    );
    console.log(voterBump)

    const regInstruction = await program.methods
        .registerVoter()
        .accounts({
            dao: new PublicKey("8fEQu9YTUjMhNsYF7bGTn8WYdewhhrMSPQxyCbHmNkNJ"),
            voter: voterPDA,
            user: userPubkey,
        }).instruction()

    const votingtx = await program.methods
        .vote(index)
        .accounts({
            proposal: new PublicKey(
                "EotFxyFGaMgksbvwnBFfg28auuAzxrzsai1q1jBpNgNs"
            ),
            voter: voterPDA,
            user: userPubkey,
        }).instruction()

    tx.add(regInstruction)
    tx.add(votingtx)
    tx.feePayer = new PublicKey(userPubkey);
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    return tx;

}

export const updateProposals = async () => {

}

export const fetchPersonalProposals = async () => {

}

export const fetchVotingAnalytics = async () => {

}
interface Proposal {
    title: string;
    description: string;
    options: string[];
    externalLink: string;
    user: string;
    program: Program;
}
export const newProposal = async ({ title, description, options, externalLink, user, program }: Proposal) => {

    let uniqueId = new BN(new Date().getTime()).toNumber();
    uniqueId = Math.floor(Date.now() / 1000);
    const uniqueIdBuffer = Buffer.alloc(8);
    uniqueIdBuffer.writeUInt32LE(uniqueId, 0);

    const userPubkey = new PublicKey(user)
    const [proposalPDA, proposalBump] = await PublicKey.findProgramAddress(
        [
            Buffer.from("proposal"), // First seed (matches the Rust side)
            uniqueIdBuffer,
            userPubkey.toBuffer(), // Third seed (user's public key)
        ],
        program.programId
    );

    console.log(proposalBump);
    const txHash = await program.methods
        .createProposal(
            new BN(uniqueId),
            title,
            externalLink,
            description,
            options
        )
        .accounts({
            dao: new PublicKey("8fEQu9YTUjMhNsYF7bGTn8WYdewhhrMSPQxyCbHmNkNJ"),
            proposal: proposalPDA,
            user: new PublicKey(user),
        }).rpc()

    return txHash;
}