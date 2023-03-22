import {
  ChakraProvider,
  Heading,
  Flex,
  Box,
  Container,
  Button,
  Text,
  Icon,
  Link,
  Hide,
} from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";

import { signInUrl } from "@wasp/auth/helpers/Google";

import { theme } from "./theme";

import useAuth from "@wasp/auth/useAuth";
import logout from "@wasp/auth/logout";

export function App({ children }: { children: JSX.Element }) {
  const { data: user } = useAuth();

  const openSourceCallout = (
    <Link href="https://github.com/infomiho/dailyaicomics" target="_blank">
      <Flex alignItems="center" justifyContent="flex-start">
        This project is open source
        <Icon as={AiFillGithub} ml={1} />
      </Flex>
    </Link>
  );

  const title = (
    <>
      <Link as={RouterLink} to="/">
        <Heading>Daily AI Comics</Heading>
      </Link>
      <Text>All comics written and drawn by AI. Login to vote.</Text>
    </>
  );

  const userActions = (
    <>
      {!user && (
        <Button
          as="a"
          href={signInUrl}
          colorScheme="brand"
          borderRadius="full"
          _hover={{
            textDecoration: "none",
            color: "white",
          }}
          size="sm"
        >
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
            borderRadius="full"
            size="sm"
          >
            Logout
          </Button>
        </Flex>
      )}
    </>
  );

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Container maxW="container.xl">
          <Hide below="lg">
            <Flex
              justifyContent="space-between"
              alignItems="center"
              p={3}
              mt={8}
            >
              <Box minWidth="33%">{openSourceCallout}</Box>
              <Box minWidth="33%" textAlign="center">
                {title}
              </Box>
              <Flex minWidth="33%" justifyContent="flex-end">
                {userActions}
              </Flex>
            </Flex>
          </Hide>
          <Hide above="lg">
            <Flex alignItems="center" direction="column" gap={3}>
              <Box textAlign="center" px={3} mt={8}>
                {title}
              </Box>
              <Box>{userActions}</Box>
            </Flex>
          </Hide>
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
          <Hide above="lg">
            <Flex justifyContent="center">{openSourceCallout}</Flex>
          </Hide>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
