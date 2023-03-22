import {
  ChakraProvider,
  Heading,
  Flex,
  Box,
  Link,
  Container,
  Button,
  Text,
  Icon,
} from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";

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
            <Box width="33%"></Box>
            <Box width="33%" textAlign="center">
              <Heading>Daily AI Comic</Heading>
              <Text>All comics written and drawn by AI. Login to vote.</Text>
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
        <Box as="footer" p={6}>
          <Box textAlign="center" fontSize="lg">
            Powered by{" "}
            <Link href="https://wasp-lang.dev" target="_blank">
              Wasp
            </Link>
            ,{" "}
            <Link href="https://openai.com" target="_blank">
              ChatGPT
            </Link>{" "}
            and{" "}
            <Link href="https://replicate.com/" target="_blank">
              Replicate
            </Link>
          </Box>
          <Link
            href="https://github.com/infomiho/dailyaicomics"
            target="_blank"
          >
            <Flex alignItems="center" justifyContent="center">
              This project is open source
              <Icon as={AiFillGithub} ml={1} />
            </Flex>
          </Link>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
