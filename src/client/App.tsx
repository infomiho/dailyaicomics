import {
  ChakraProvider,
  Heading,
  Flex,
  Box,
  Link,
  Container,
  Button,
  Text,
} from "@chakra-ui/react";

import { signInUrl } from "@wasp/auth/helpers/Google";

import { theme } from "./theme";

import useAuth from "@wasp/auth/useAuth";
import logout from "@wasp/auth/logout";

export function App({ children }: { children: JSX.Element }) {
  const { data: user } = useAuth();
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Container maxW="container.xl">
          <Flex justifyContent="space-between" alignItems="center" p={3} mt={8}>
            <Box width="33%">Archive</Box>
            <Box width="33%" textAlign="center">
              <Heading>Daily AI Comic</Heading>
              <Text>Login to vote. You can only give one vote.</Text>
            </Box>
            <Flex width="33%" justifyContent="flex-end">
              {!user && (
                <Button as="a" href={signInUrl} colorScheme="brand">
                  Login
                </Button>
              )}
              {user && (
                <Flex alignItems="center">
                  {user.username}{" "}
                  <Button
                    colorScheme="brand"
                    onClick={logout}
                    ml={2}
                    variant="outline"
                  >
                    Logout
                  </Button>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Container>
        {children}
        <Box as="footer" textAlign="center" p={6}>
          Powered by{" "}
          <Link href="https://wasp-lang.dev" target="_blank">
            Wasp
          </Link>
          , ChatGPT and{" "}
          <Link href="https://replicate.com/" target="_blank">
            Replicate
          </Link>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
