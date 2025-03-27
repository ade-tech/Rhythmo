import { Button, ButtonGroup, HStack } from "@chakra-ui/react";

type filterProps = {
  filterValues: string[];
};

const Filter = ({ filterValues }: filterProps) => {
  return (
    <HStack w={"full"} gap={2} mb={3} zIndex={20}>
      <ButtonGroup size={"sm"} variant={"subtle"} color={"white"}>
        {filterValues.map((filter) => (
          <Button
            rounded={"full"}
            color={"white"}
            value={filter}
            bg={"gray.900"}
            key={filter}
          >
            {filter}
          </Button>
        ))}
      </ButtonGroup>
    </HStack>
  );
};

export default Filter;
