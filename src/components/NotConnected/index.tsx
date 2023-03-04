import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { FC, useEffect, useState } from 'react'
import styles from './styles.module.css'
import base58 from "bs58";
import { Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js'
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
    Flex
} from '@chakra-ui/react'


export const NotConnected: FC = () => {


    return (

        <Flex  bg={useColorModeValue('gray.100', 'gray.700')} h={'100vh'} align={'center'} justify={'center'}
        >
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} >
                            Please connect your solana wallet...
                        </Heading>
            
           

</Flex>

    )


}
