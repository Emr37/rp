import type { NextPage } from "next"
import Head from "next/head"
import { useState } from 'react'
import { Box, Button, Input, Grid, Flex, useColorModeValue, Stack, Heading, Text } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import base58 from "bs58";
import { Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js'
import { encodeURL, createQR } from '@solana/pay'
import nextConfig from 'next.config';
import BigNumber from 'bignumber.js';
import Link from 'next/link';

const companyPrivateKey = nextConfig.env.COM_PRIVATE_KEY




const CreateQRPage: NextPage = (props) => {
  const [amount, setAmount] = useState('')

  const theQr = (amount: any) => {

    //if (amount <= 0) return resultToast('error', 'Amount is reqiured')
    //if (item.url) return resultToast('error', 'QR Code Error'); 

    console.log('Show QR')

    //-------------------------
    const payKeypair = Keypair.fromSecretKey(base58.decode(companyPrivateKey));

    let newUrl = encodeURL({
      recipient: payKeypair!.publicKey,
      amount: new BigNumber(`${amount}`),
      reference: undefined,
      label: 'RPS: Table - 2',
      message: 'Thanks for your order',
    })

    const itemDiv: HTMLElement | any = document.getElementById('qR')

    const qr = createQR(newUrl, 256, 'transparent', 'black')

    qr.append(itemDiv)

  }






  return (
    <div>
      <Head>
        <title>Create QR</title>
        <meta name="description" content="Creates QR for tables" />
      </Head>
      <Flex
            bg={useColorModeValue('gray.100', 'gray.700')}
            justify={'center'}
        >
            <Grid templateColumns='repeat(1, 1fr)'  mt={5}>
            <Box
                role={'group'}
                w={'800px'}
                h={'600px'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                py={5}
                px={3}
            >
                <Stack pt={10} align={'center'} justify={'center'} direction={'column'} >
                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        TABLE - 2
                    </Heading>
                    <Stack direction={'row'} align={'center'}>
                        <Text fontWeight={600} fontSize={'md'}>
                            Amount
                        </Text>
                        <Input
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)} />
                    </Stack>
                    <Button
                        color={'teal'}
                        variant={'solid'}
                        onClick={() => {
                            theQr(amount)

                            setAmount('')
                        }}
                    >
                  
                        Generate QR
                    </Button>
                    
                    <Link href={'/'}>
                    <Button
                        color={'teal'}
                        variant={'ghost'}
                        onClick={() => {
                        setAmount('');
                        }}
                    >
                        Back to Home
                    </Button>
                    </Link>
                    <Box bg={'gray.100'} w={256} h={256} id={'qR'}/>
                    <Button 
                    color={'teal'}
                    variant={'solid'}
                    onClick={() => window.print()}
                    >
                    Print QR
                    </Button>
                                                           
                </Stack>
            </Box>
            </Grid>
        </Flex>
    
       
    </div>
  )
}

export default CreateQRPage;