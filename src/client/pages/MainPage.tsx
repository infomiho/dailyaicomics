import { Container, VStack, Spinner } from "@chakra-ui/react";

import { Comic } from "../components/Comic";
import { useQuery } from "@wasp/queries";

import getComics from "@wasp/queries/getComics";
import { Comic as ComicEntity, ComicImage } from "@wasp/entities";

const MainPage = () => {
  const { data: comics, isLoading } = useQuery<
    {},
    (ComicEntity & { images: ComicImage[] })[]
  >(getComics);

  return (
    <Container maxW="container.xl" py={4}>
      {isLoading && <Spinner />}
      {comics && (
        <VStack gap={2} py={4}>
          {comics.map((comic) => (
            <Comic key={comic.id} comic={comic} />
          ))}
        </VStack>
      )}
    </Container>
  );
};
export default MainPage;
