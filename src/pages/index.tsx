import Head from 'next/head'
import { useWallet } from '@solana/wallet-adapter-react'

import styles from '../styles/Home.module.css'
import { NextPage } from 'next';


 const Home : NextPage = (props) => {
  
  const { connected } = useWallet();

  return (
    <div>
      <Head>
        <title>Restaurant Payment</title>
        <meta name="description" content="Restaurant Payment" />
      </Head>
        {connected 
        ? 'Wallet connected'
        : 'Wallet Not Connected'
        }

    </div>
  )
}

export default Home;