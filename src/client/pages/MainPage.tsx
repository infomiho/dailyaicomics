import { Container, VStack, Button, Box } from "@chakra-ui/react";

import { Comic } from "../components/Comic";
import { ComicLoader } from "../components/ComicLoader";
import { useQuery } from "@wasp/queries";
import { Link as RouterLink } from "react-router-dom";

import getComics from "@wasp/queries/getComics";
import getTodaysUserVote from "@wasp/queries/getTodaysUserVote";
import { Comic as ComicEntity, ComicImage } from "@wasp/entities";
import useAuth from "@wasp/auth/useAuth";

const MainPage = () => {
  const { data: user } = useAuth();
  const comicsInfo = useQuery<
    {},
    (ComicEntity & { _count: { votes: number }; images: ComicImage[] })[]
  >(
    getComics,
    {},
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
      {comicsInfo.isLoading && (
        <VStack gap={2} py={4}>
          <ComicLoader />
          <ComicLoader />
          <ComicLoader />
        </VStack>
      )}
      {comicsInfo.data && (
        <VStack gap={6} py={4}>
          {comicsInfo.data.map((comic) => (
            <Comic
              key={comic.id}
              comic={comic}
              votedForId={userVoteInfo.data ? userVoteInfo.data.comicId : null}
              isMainPage
            />
          ))}
        </VStack>
      )}
    </Container>
  );
};
export default MainPage;
