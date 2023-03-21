import { useMemo } from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  AspectRatio,
  Image,
} from "@chakra-ui/react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { Comic as ComicEntity, ComicImage } from "@wasp/entities";

export function Comic({
  comic,
}: {
  comic: ComicEntity & { images: ComicImage[] };
}) {
  const sortedImages = useMemo(() => {
    const images = [...comic.images];
    images.sort((a, b) => a.imageIndex - b.imageIndex);
    return images;
  }, [comic.images.map((i) => i.id)]);
  return (
    <HStack alignItems="flex-start" gap={3}>
      <ComicButtons />
      <HStack
        p={3}
        borderWidth="1px"
        borderRadius="lg"
        overflow="auto"
        bg="brand.50"
        boxShadow="md"
        gap={3}
        maxW="80vw"
        alignItems="flex-start"
      >
        {sortedImages.map((image) => (
          <ComicFrame key={image.id} image={image} />
        ))}
      </HStack>
    </HStack>
  );
}

function ComicFrame({ image }: { image: ComicImage }) {
  return (
    <VStack>
      <Box position="relative">
        <Box
          background="white"
          color="gray.700"
          px={2}
          py={1}
          position="absolute"
          top={2}
          left={2}
          borderRadius="sm"
          zIndex={2}
          boxShadow="md"
        >
          {image.text}
        </Box>
        <AspectRatio ratio={1} width="25vw" minW="300px">
          <Image src={image.image} objectFit="cover" objectPosition="center" />
        </AspectRatio>
      </Box>
      <Box fontSize="sm" textAlign="center">
        {image.imagePrompt}
      </Box>
    </VStack>
  );
}

function ComicButtons() {
  return (
    <VStack>
      <Button colorScheme="brand">
        <AiOutlineArrowUp />
      </Button>
      <Box fontWeight={700}>123</Box>
      <Button colorScheme="brand">
        <AiOutlineArrowDown />
      </Button>
    </VStack>
  );
}
