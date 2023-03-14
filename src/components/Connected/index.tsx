import React, { FC, useState } from 'react'
import { tables } from '../../pages/api/tables'
import Link from 'next/link';

import {
    useToast,
    Grid,
    Heading,
    Button,
    Box,
    useColorModeValue,
    Stack,
    Flex,
    Input    
} from '@chakra-ui/react'


export const Connected: FC = () => {

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



    const bgColor = useColorModeValue('white', 'gray.800');
    
    const listTables = tables.map((item, index) => {
        const [amount, setAmount] = useState('');
        const [show, setShow] = useState(false);
            
        return (
            <Box key={index}
                role={'group'}
                w={'450px'}
                h={'300px'}
                bg={bgColor}
                boxShadow={'2xl'}
                rounded={'lg'}
                py={5}
                px={10}
            >
                <Stack pt={0} align={'center'} justify={'center'} direction={'column'} >
                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {item.name} - {item.id}
                    </Heading>                   
                        <Input placeholder={'Product - 1'}/>
                        <Input placeholder={'Product - 2'}/>
                        <Input placeholder={'Product - 3'}/>
                        <Input placeholder={'Total'}/>                 
                    <Stack direction={'row'}>
                        <Link href={`/createQR${item.id}`}>
                            <Button
                                color={'teal'}
                                variant={'ghost'}                        
                            >
                                Generate QR
                            </Button>
                        </Link>
                        <Button
                        color={'teal'}
                        variant={'ghost'}                       
                        >
                            Send Total Amount to QR
                        </Button>
                    </Stack>                                           
                </Stack>
            </Box>
        )
    })
       

    return (
        <Flex
            bg={useColorModeValue('gray.100', 'gray.700')}
            justify={'center'}
        >
            <Grid templateColumns='repeat(3, 1fr)' gap={50} mt={10}>
                {
                    listTables
                }

            </Grid>
        </Flex>
    )
}
