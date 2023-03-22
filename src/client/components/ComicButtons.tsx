import { Box, Button, VStack } from "@chakra-ui/react";
import { AiOutlineArrowUp } from "react-icons/ai";

export function ComicButtons({
  onVote,
  votes,
  disabled,
  isSelected,
}: {
  onVote?: () => void;
  votes: number;
  disabled?: boolean;
  isSelected?: boolean;
}) {
  return (
    <VStack>
      <Button
        onClick={onVote}
        colorScheme="brand"
        disabled={disabled}
        variant={isSelected ? "solid" : "outline"}
      >
        <AiOutlineArrowUp />
      </Button>
      <Box fontWeight={700}>{votes}</Box>
      {/* <Button colorScheme="brand" disabled={disabled}>
        <AiOutlineArrowDown />
      </Button> */}
    </VStack>
  );
}
