import { Container, VStack, Spinner } from "@chakra-ui/react";

import { Comic } from "../components/Comic";
import { useQuery } from "@wasp/queries";

import getComics from "@wasp/queries/getComics";
import { Comic as ComicEntity, ComicImage } from "@wasp/entities";

const MainPage = () => {
  const comicsInfo = useQuery<{}, (ComicEntity & { images: ComicImage[] })[]>(
    getComics
  );

  return (
    <Container maxW="container.xl" py={4}>
      {comicsInfo.isInitialLoading && <Spinner />}
      {comicsInfo.data && (
        <VStack gap={2} py={4}>
          {comicsInfo.data.map((comic) => (
            <Comic key={comic.id} comic={comic} />
          ))}
        </VStack>
      )}
    </Container>
  );
};
export default MainPage;
