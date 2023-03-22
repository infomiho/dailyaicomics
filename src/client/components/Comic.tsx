import { useMemo } from "react";
import { Box, VStack, HStack, AspectRatio, Image } from "@chakra-ui/react";
import { Comic as ComicEntity, ComicImage } from "@wasp/entities";
import { ComicButtons } from "./ComicButtons";
import useAuth from "@wasp/auth/useAuth";
import voteForComic from "@wasp/actions/voteForComic";

export function Comic({
  comic,
  votedForId,
}: {
  comic: ComicEntity & { _count: { votes: number }; images: ComicImage[] };
  votedForId: string | null;
}) {
  const { data: user } = useAuth();
  const sortedImages = useMemo(() => {
    const images = [...comic.images];
    images.sort((a, b) => a.imageIndex - b.imageIndex);
    return images;
  }, [comic.images.map((i) => i.id)]);
  return (
    <HStack alignItems="flex-start" gap={3}>
      <ComicButtons
        onVote={() => voteForComic({ comicId: comic.id })}
        votes={comic._count.votes}
        isSelected={comic.id === votedForId}
        disabled={!user || votedForId !== null}
        label={
          !user
            ? "You must be logged in to vote"
            : votedForId
            ? "You only vote once per day"
            : ""
        }
      />
      <HStack
        p={3}
        borderWidth="1px"
        borderRadius="lg"
        overflow="auto"
        bg="white"
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
          fontSize="lg"
        >
          {image.text}
        </Box>
        <AspectRatio ratio={1} width="25vw" minW="300px">
          <Image src={image.image} objectFit="cover" objectPosition="center" />
        </AspectRatio>
      </Box>
      <Box fontSize="sm" textAlign="center" lineHeight={1.2} color="gray.500">
        {image.imagePrompt}
      </Box>
    </VStack>
  );
}
