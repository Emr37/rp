import Head from 'next/head'
import { useWallet } from '@solana/wallet-adapter-react'
import styles from '../styles/Home.module.css'
import { NextPage } from 'next';
import { Box } from '@chakra-ui/react'
import { Connected } from '../components/Connected'
import { NotConnected } from '../components/NotConnected'



const Home: NextPage = (props) => {

  const { connected } = useWallet();

  return (
    <div>
      <Head>
        <title>Restaurant Payment</title>
        <meta name="description" content="Restaurant Payment" />
      </Head>

      <Box
        w='100%'
        h='100vh'
        bg={'gray.300'}
      >
        {connected
          ? <Connected/>
          : <NotConnected/>
        }
      </Box>
    </div>
  )
}

export default Home;