import {
  ChakraProvider,
  Heading,
  Flex,
  Box,
  Link,
  Container,
} from "@chakra-ui/react";

import { theme } from "./theme";

export function App({ children }: { children: JSX.Element }) {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Container maxW="container.xl">
          <Flex justifyContent="space-between" alignItems="center" p={3} mt={8}>
            <Box>Archive</Box>
            <Heading>Daily AI Comic</Heading>
            <Box>Login</Box>
          </Flex>
        </Container>
        {children}
        <Box as="footer" textAlign="center" p={3}>
          Made with{" "}
          <Link href="https://wasp-lang.dev" target="_blank">
            Wasp
          </Link>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
