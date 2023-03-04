import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { FC, useEffect, useState } from 'react'
import styles from './styles.module.css'
import base58 from "bs58";
import { Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js'
import nextConfig from 'next.config';

//import { companyData } from '@/pages/api/companyData';
import {
    useToast,
    Grid,
    GridItem,
    Heading,
    Button,
    Text,
    Badge,
    Container,
    Box,
    ButtonGroup,
    Center,
    useColorModeValue,
    Stack,
    Image,
    Flex,
    Input
} from '@chakra-ui/react'


export const Connected: FC = () => {

    const [tx, setTx] = useState("");
    const [transactionState, setTransactionState] = useState(false);
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState(Number(0.05));

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const companyPrivateKey = nextConfig.env.COM_PRIVATE_KEY;


    useEffect(() => {
        if (!connection || !publicKey) {
            return;
        }
        connection.getBalance(publicKey).then((e) => {
            if (!e) setBalance(0);
            setBalance(e);
        });
    }, [connection, publicKey, tx]);


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

































    return (

        <Flex 
        bg={useColorModeValue('gray.100', 'gray.700')} 
        justify={'center'}
        >
            <Grid templateColumns='repeat(3, 1fr)' gap={5} mt={10}>
                
                <Box
                    role={'group'}                    
                    w={'100%'}
                    h={'50vh'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}
                    
                    >
                    
                    <Stack pt={10} align={'center'}>                       
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            Table 1
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                            <Text fontWeight={600} fontSize={'md'}>
                                Amount
                            </Text>
                            <Input 
                            type='number'
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}></Input>
                        </Stack>
                        <Button 
                        color={'teal'} 
                        variant={'ghost'}
                        onClick={() => clickPay(companyPrivateKey, amount)}
                        
                        >
                            Send Amount To Table
                        </Button>
                    </Stack>
                </Box>
                <Box
                    role={'group'}                    
                    w={'100%'}
                    h={'50vh'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}
                    
                    >
                    
                    <Stack pt={10} align={'center'}>                       
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            Table 1
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                            <Text fontWeight={600} fontSize={'md'}>
                                Amount
                            </Text>
                            <Input></Input>
                        </Stack>
                        <Button color={'teal'} variant={'ghost'}>Send Amount To Table</Button>
                    </Stack>
                </Box>
                <Box
                    role={'group'}                    
                    w={'30vw'}
                    h={'50vh'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}
                    
                    >
                    
                    <Stack pt={10} align={'center'}>                       
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            Table 1
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                            <Text fontWeight={600} fontSize={'md'}>
                                Amount
                            </Text>
                            <Input></Input>
                        </Stack>
                        <Button color={'teal'} variant={'ghost'}>Send Amount To Table</Button>
                    </Stack>
                </Box>
                <Box
                    role={'group'}                    
                    w={'100%'}
                    h={'50vh'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}
                    m={20}
                    >
                    
                    <Stack pt={10} align={'center'}>                       
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            Table 1
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                            <Text fontWeight={600} fontSize={'md'}>
                                Amount
                            </Text>
                            <Input></Input>
                        </Stack>
                        <Button color={'teal'} variant={'ghost'}>Send Amount To Table</Button>
                    </Stack>
                </Box>
                <Box
                    role={'group'}

                    w={'100%'}
                    h={'50vh'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}
                    m={20}
                    >
                    
                    <Stack pt={10} align={'center'}>                       
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            Table 1
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                            <Text fontWeight={600} fontSize={'md'}>
                                Amount
                            </Text>
                            <Input></Input>
                        </Stack>
                        <Button color={'teal'} variant={'ghost'}>Send Amount To Table</Button>
                    </Stack>
                </Box>
                <Box
                    role={'group'}
                    p={6}
                    maxW={'330px'}
                    w={'100%'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}
                    m={20}
                    >
                    
                    <Stack pt={10} align={'center'}>
                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            Masa 1
                        </Text>
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            Masa 1
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                            <Text fontWeight={800} fontSize={'xl'}>
                                Tutar : 
                            </Text>
                            
                        </Stack>
                    </Stack>
                </Box>
                <Box
                    role={'group'}
                    p={6}
                    maxW={'330px'}
                    w={'100%'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}
                    m={20}
                    >
                    
                    <Stack pt={10} align={'center'}>
                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            Masa 1
                        </Text>
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            Masa 1
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                            <Text fontWeight={800} fontSize={'xl'}>
                                Tutar : 
                            </Text>
                            
                        </Stack>
                    </Stack>
                </Box>
                <Box
                    role={'group'}
                    p={6}
                    maxW={'330px'}
                    w={'100%'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}
                    m={20}
                    >
                    
                    <Stack pt={10} align={'center'}>
                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            Masa 1
                        </Text>
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            Masa 1
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                            <Text fontWeight={800} fontSize={'xl'}>
                                Tutar : 
                            </Text>
                            
                        </Stack>
                    </Stack>
                </Box>
                <Box
                    role={'group'}
                    p={6}
                    maxW={'330px'}
                    w={'100%'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}
                    m={20}
                    >
                    
                    <Stack pt={10} align={'center'}>
                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            Masa 1
                        </Text>
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            Masa 1
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                            <Text fontWeight={800} fontSize={'xl'}>
                                Tutar : 
                            </Text>
                            
                        </Stack>
                    </Stack>
                </Box>
                <Box
                    role={'group'}
                    p={6}
                    maxW={'330px'}
                    w={'100%'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}
                    m={20}
                    >
                    
                    <Stack pt={10} align={'center'}>
                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            Masa 1
                        </Text>
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            Masa 1
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                            <Text fontWeight={800} fontSize={'xl'}>
                                Tutar : 
                            </Text>
                            
                        </Stack>
                    </Stack>
                </Box>
                <Box
                    role={'group'}
                    p={6}
                    maxW={'330px'}
                    w={'100%'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}
                    m={20}
                    >
                    
                    <Stack pt={10} align={'center'}>
                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            Masa 1
                        </Text>
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            Masa 1
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                            <Text fontWeight={800} fontSize={'xl'}>
                                Tutar : 
                            </Text>
                            
                        </Stack>
                    </Stack>
                </Box>
                <Box
                    role={'group'}
                    p={6}
                    maxW={'330px'}
                    w={'100%'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}
                    m={20}
                    >
                    
                    <Stack pt={10} align={'center'}>
                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            Masa 1
                        </Text>
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            Masa 1
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                            <Text fontWeight={800} fontSize={'xl'}>
                                Tutar : 
                            </Text>
                            
                        </Stack>
                    </Stack>
                </Box>
                
        </Grid>

</Flex>

    )


}
