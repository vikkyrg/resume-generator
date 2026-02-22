import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import logo from './../../Assets/logo.png';

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('white', 'gray.800')}
      rounded={'full'}
      w={10}
      h={10}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      boxShadow={'md'}
      transition={'all 0.3s ease'}
      _hover={{
        transform: 'translateY(-2px)',
        bg: useColorModeValue('teal.400', 'teal.500'),
        color: 'white',
        boxShadow: 'xl',
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue(
        'linear-gradient(135deg, #f5f7fa, #e4ecf5)',
        'linear-gradient(135deg, #0f2027, #203a43, #2c5364)'
      )}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={6}
        spacing={4}
        direction={{ base: 'column', md: 'row' }}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
        textAlign={'center'}
      >
        {/* LOGO */}
        <Stack align="center" spacing={2}>
          <Image
            src={logo}
            alt="logo"
            style={{ height: '48px' }}
          />
        </Stack>

        {/* COPYRIGHT */}
        <Text
          fontSize="sm"
          fontWeight="medium"
          letterSpacing="wide"
        >
          © 2026 <b>Resume Generator</b>. All rights reserved.
        </Text>

        {/* SOCIAL */}
        <Stack direction={'row'} spacing={4}>
          <SocialButton
            label={'Github'}
            href={'https://github.com/vikkyrg'}
          >
            <FaGithub size={18} />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
