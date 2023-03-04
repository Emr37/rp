import React, { FC } from 'react'
import {
    Heading,
    useColorModeValue,
    Flex
} from '@chakra-ui/react'
import Checkout from '../CheckOut'


export const CreateQR: FC = () => {


    return (

        <Flex bg={useColorModeValue('gray.100', 'gray.700')} h={'100vh'} align={'center'} justify={'center'}
        >
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} >
                Creates QR Page 
            </Heading>

            <Checkout/>
        </Flex>

    )


}
