import { Capitalize } from "@/utils/Captialize";
import { Box, Button, ButtonGroup, HStack } from "@chakra-ui/react";
import { HiX } from "react-icons/hi";

type filterProps<T extends string[]> = {
  filterValues: T;
  filterState: T[number] | null;
  filterUpdate: React.Dispatch<React.SetStateAction<string | null>>;
  defaultValue?: T[number] | null;
};

/**
 * Filter Component
 *
 * Provides filtering controls for lists or grids (e.g., songs, albums).
 * Allows users to select filter criteria and updates the parent state.
 *
 * Usage:
 * - Used in list or grid views to filter displayed items.
 */

const Filter = ({
  filterValues,
  filterState,
  defaultValue = null,
  filterUpdate,
}: filterProps<string[]>) => {
  return (
    <HStack w={"fit"} gap={2} mb={3} zIndex={20}>
      <ButtonGroup size={"sm"} variant={"subtle"} color={"white"}>
        {filterState !== defaultValue && (
          <Button
            rounded={"full"}
            color={"gray.900"}
            bg={"white"}
            onClick={() => filterUpdate(defaultValue ?? null)}
            w={2}
          >
            <Box as={HiX} />
          </Button>
        )}
        {filterValues.map((filter) => (
          <Button
            rounded={"full"}
            color={filter === filterState ? "gray.900" : "white"}
            value={filter}
            bg={filter === filterState ? "white" : "gray.900"}
            key={filter}
            onClick={() => filterUpdate(filter)}
          >
            {Capitalize(filter)}
          </Button>
        ))}
      </ButtonGroup>
    </HStack>
  );
};

export default Filter;
