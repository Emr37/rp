import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { FC, useEffect, useState, useRef, useContext } from 'react'
import styles from './styles.module.css'
import base58 from "bs58";
import { Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js'
import { encodeURL, createQR } from '@solana/pay'
import nextConfig from 'next.config';
import { tables } from '../../pages/api/tables'
import BigNumber from 'bignumber.js';



import {
    useToast,
    Grid,
    Heading,
    Button,
    Text,
    Box,
    useColorModeValue,
    Stack,
    Flex,
    Input
} from '@chakra-ui/react'
import { useQr } from '@/context/QrContextProvider';



export const Connected: FC = () => {
    //const { qR, setQr, amount, tableId }: any = useQr();

    const [tx, setTx] = useState("");
    const [transactionState, setTransactionState] = useState(false);

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const companyPrivateKey = nextConfig.env.COM_PRIVATE_KEY


    const toast = useToast();
    const resultToast = (status: any, title: any) => {
        return toast({
            position: "bottom",
            title: title,
            status: status,
            duration: 3000,
            isClosable: true,
        })
    }


    const clickPay = async (companyPrivateKey: any, cost: any) => {
        if (!cost) {

            resultToast("error", "Amount is required");
            return
        }

        const payKeypair = Keypair.fromSecretKey(base58.decode(companyPrivateKey));

        if (!publicKey) {
            return
        }
        const transaction = new Transaction();

        try {
            const instruction = SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: payKeypair!.publicKey,
                lamports: LAMPORTS_PER_SOL * cost,
            });

            transaction.add(instruction);


            const sign = await sendTransaction(transaction, connection);
            setTransactionState(true);

            const latestBlockHash = await connection.getLatestBlockhash();

            await connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: sign,
            });

            setTx(latestBlockHash.blockhash);
            setTransactionState(false);

            console.log(
                `Token Transaction: https://explorer.solana.com/tx/${sign}}?cluster=devnet`
            );

            resultToast("success", "Successful payment!");

        } catch (error) {

            console.error(error);

            resultToast("error", "Request rejected :(");
        }
    };


    const listTables = tables.map((item, index) => {

        const [amount, setAmount] = useState('');
        const [show, setShow] = useState(false);
        const qrRef = useRef(null)

        const showQR = (amount: any, item: any) => {


            if (amount <= 0) {
                resultToast('error', 'amount is required')
            } else {
                console.log('Show QR')


                const payKeypair = Keypair.fromSecretKey(base58.decode(companyPrivateKey));

                const url = encodeURL({
                    recipient: payKeypair!.publicKey,
                    amount: new BigNumber(amount),
                    reference: undefined,
                    label: `RPS: Table - ${item.id}`,
                    message: 'Thanks for your order',
                });
                console.log(typeof url);
                
                const qrCode = createQR(url, 128, 'transparent');
                console.log(qrCode);
                console.log(qrRef.current);
                if (qrRef.current) {
                    qrCode.append(qrRef.current)
                } else return;
            }

        }



        return (
            <Box key={index}
                role={'group'}
                w={'300px'}
                h={'400px'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                py={5}
                px={3}

            >


                <Stack pt={10} align={'center'} justify={'center'} direction={'column'} >
                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {item.name} - {item.id}
                    </Heading>
                    <Stack direction={'row'} align={'center'}>
                        <Text fontWeight={600} fontSize={'md'}>
                            Amount
                        </Text>
                        <Input
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)} />
                    </Stack>
                    {!show && <Button
                        color={'teal'}
                        variant={'solid'}
                        onClick={() => {

                            showQR(amount, item)
                            setAmount('')
                        }}
                    >
                        Generate QR
                    </Button>
                    }

                    <Button
                        color={'teal'}
                        variant={'ghost'}
                        onClick={() => {
                            //clickPay(companyPrivateKey, Number(amount));
                            setAmount('');
                        }}
                    >
                        Send Amount To QR
                    </Button>

                    <Box bg={'gray.400'} h={'128px'} w={'128px'} ref={qrRef} />

                </Stack>
            </Box>
        )
    })



    return (
        <Flex
            bg={useColorModeValue('gray.100', 'gray.700')}
            justify={'center'}
        >
            <Grid templateColumns='repeat(3, 1fr)' gap={5} mt={10}>

                {
                    listTables
                }
            </Grid>
        </Flex>
    )
}
