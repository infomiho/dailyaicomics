import { Container, VStack, Box, Heading, HStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { Comic } from "../components/Comic";
import { ComicLoader } from "../components/ComicLoader";
import { CodeView } from "../components/CodeView";

import { useQuery } from "@wasp/queries";
import getComic from "@wasp/queries/getComic";
import getTodaysUserVote from "@wasp/queries/getTodaysUserVote";
import { Comic as ComicEntity, ComicImage } from "@wasp/entities";
import useAuth from "@wasp/auth/useAuth";

const MainPage = () => {
  const { comicId } = useParams<{ comicId: string }>();
  const { data: user } = useAuth();
  const comicInfo = useQuery<
    {},
    ComicEntity & { _count: { votes: number }; images: ComicImage[] }
  >(
    getComic,
    {
      comicId,
    },
    {
      refetchInterval: 25 * 1000,
    }
  );
  const userVoteInfo = useQuery<{}, { comicId: string | null }>(
    getTodaysUserVote,
    {},
    { enabled: !!user }
  );

  return (
    <Container maxW="container.xl" py={4}>
      {comicInfo.isLoading && <ComicLoader />}
      {comicInfo.data && (
        <VStack gap={6}>
          <Comic
            comic={comicInfo.data}
            votedForId={userVoteInfo.data ? userVoteInfo.data.comicId : null}
          />
          <Box
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            boxShadow="md"
            width="full"
            p={6}
          >
            <Heading size="md" mb={4}>
              Image style
            </Heading>
            <Box></Box>
            <CodeView language="json">{comicInfo.data.imagePrefix}</CodeView>
          </Box>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            boxShadow="md"
            width="full"
            p={6}
          >
            <Heading size="md" mb={4}>
              Prompt for ChatGPT
            </Heading>
            <CodeView language="json">{comicInfo.data.prompt}</CodeView>
          </Box>
        </VStack>
      )}
    </Container>
  );
};
export default MainPage;
