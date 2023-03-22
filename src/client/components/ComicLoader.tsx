import { HStack, Skeleton, AspectRatio } from "@chakra-ui/react";
import { ComicButtons } from "./ComicButtons";

export function ComicLoader() {
  return (
    <HStack alignItems="flex-start" gap={3}>
      <ComicButtons votes={0} disabled />
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
        {[1, 2, 3].map((i) => (
          <AspectRatio key={i} ratio={1} width="25vw" minW="300px">
            <Skeleton height="768px" width="768px" />
          </AspectRatio>
        ))}
      </HStack>
    </HStack>
  );
}
