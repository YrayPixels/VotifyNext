"use client";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { BaseWalletMultiButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";



export default function Notifications() {
  const [menu, showMenu] = useState(false);
  const { wallet, publicKey, connect } = useWallet()

  return (
    <div className='flex relative items-center'>

      <WalletMultiButton />


    </div>
  )
}
