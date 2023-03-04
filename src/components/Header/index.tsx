import { FC } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import styles from './styles.module.css'
import NextLink from 'next/link'
 

import {
  Box,
  Flex,
  Text,
  IconButton,
  Image,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon
} from '@chakra-ui/icons';

export const Header: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box >
      <Flex
        bg={'#bbbbbb50'}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={'#bbbbbb'}
        >
        


          {/* Logo */}


         

        <Stack
          flex={{ base: 1, md: 0 }}
          align={'center'}
          justify={'flex-end'}
          direction={'row'}
          spacing={3}>
                    
          <WalletMultiButton className={styles.walletBtn}/>

          <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>

        </Stack>
      </Flex>

      
    </Box>
  );
}


