import { Box, Button, VStack, Tooltip } from "@chakra-ui/react";
import { AiTwotoneHeart } from "react-icons/ai";

export function ComicButtons({
  onVote,
  votes,
  disabled,
  isSelected,
  label,
}: {
  onVote?: () => void;
  votes: number;
  disabled?: boolean;
  isSelected?: boolean;
  label?: string;
}) {
  const voteButton = (
    <Button
      onClick={onVote}
      colorScheme="brand"
      disabled={disabled}
      variant={isSelected ? "solid" : "outline"}
    >
      <AiTwotoneHeart />
    </Button>
  );
  return (
    <VStack>
      <Tooltip
        bg="white"
        color="gray.700"
        hasArrow
        label={label}
        placement="top"
      >
        <Box>{voteButton}</Box>
      </Tooltip>
      <Box fontWeight={700}>{votes}</Box>
    </VStack>
  );
}
