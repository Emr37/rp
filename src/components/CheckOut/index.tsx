import { createQR, encodeURL, TransferRequestURLFields } from "@solana/pay";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useLayoutEffect, useState } from "react";
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import Head from 'next/head';
import Image from 'next/image';
//import Form from '../components/form';
import BigNumber from 'bignumber.js';

import {
  Cluster,
  clusterApiUrl,
  PublicKey,
  Keypair,
  Connection,
  Transaction,
  Message,
} from '@solana/web3.js';
import nextConfig from "next.config";



//import BackLink from "../../components/BackLink";
//import PageHeading from "../../components/PageHeading";
//import { shopAddress, usdcAddress } from "../../lib/addresses";
//import calculatePrice from "../../lib/calculatePrice";

export default function Checkout() {

    const [storeName, setStoreName] = useState('');
  const [description, setDescription] = useState('');
  const [storeAdress, setStoreAdress] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentCurrency, setPaymentCurrency] = useState('SOL');
  const [memo, setMemo] = useState('');
  const [isGenerated, setIsGenerated] = useState(true);
  let ref = useRef(null);

  const connection = new Connection('https://api.devnet.solana.com');




    useEffect(() => {
        if (isGenerated) {
          const payment_recipient = new PublicKey(nextConfig.env.COM_PRIVATE_KEY);
          const payment_amount = new BigNumber(paymentAmount);
          console.log('f' + payment_amount);
          const payment_reference = new Keypair().publicKey;
          const payment_label = storeName;
          const payment_message = description;
          let r = (Math.random() + 1).toString(36).substring(7);
          const payment_memo = '#' + r;
    
          console.log(
            payment_recipient,
            payment_amount,
            payment_reference,
            payment_label,
            payment_message,
            payment_memo
          );
    
          const url = encodeURL({
            recipient: payment_recipient,
            amount: payment_amount,
            reference: payment_reference,
            label: payment_label,
            message: payment_message,
            memo: payment_memo,
          });
          console.log(url);
          const qrCode = createQR(url);
          console.log(qrCode);
          console.log(ref.current);
          if (ref.current && payment_amount.isGreaterThan(0)) {
            qrCode.append(ref.current);
          }
        }
      }, [isGenerated]);
    
  

  return (
    <div className="flex flex-col items-center gap-8">
    
      <Link href='/'>
        <Button>
            Cancel
        </Button>
      </Link>


      {!isGenerated 
      ? null
      : (
          <div className='flex flex-col h-screen items-center'>
            <div className='mt-10'>
              <div className='' ref={ref}></div>
              <button
                className='flex flex-col items-center w-full bg-black text-white rounded-md mt-5 h-12 p-3'
                onClick={() => {}}
              >
                Generate new Code
              </button>
            </div>
          </div>
        )}
    </div>
  )
}