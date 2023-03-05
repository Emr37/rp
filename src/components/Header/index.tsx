import { FC } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import styles from './styles.module.css'
import NextLink from 'next/link'


import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Link,
  useColorModeValue,
  useColorMode

} from '@chakra-ui/react';
import {
  MoonIcon,
  SunIcon
} from '@chakra-ui/icons';

export const Header: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box >
      <Flex
        bg={'#bbbbbb50'}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2, md: 5 }}
        px={{ base: 4, md: 10 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={'#bbbbbb'}
        justify={'space-between'}
        align={'center'}

      >
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} align={'center'}>

          <Text 
            bgGradient='linear(to-l, #8f6ddf, #1ee1b0)'
            fontWeight='extrabold'
            bgClip={'text'}
            fontSize={'3xl'}
          >
            RPS
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            {/*<DesktopNav /> */}
          </Flex>

        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          align={'center'}
          justify={'flex-end'}
          direction={'row'}
          spacing={3}>

          <WalletMultiButton className={styles.walletBtn} />

          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>

        </Stack>
      </Flex>

    </Box>
  );
}


const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <NextLink href={navItem.href ?? '#'} passHref>
            <Link
              p={2}
              fontSize={'sm'}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
              }}>
              {navItem.label}
            </Link>
          </NextLink>
        </Box>
      ))}
    </Stack>
  );
};



interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [

  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Create QR',
    href: '/createQR',
  },
];


