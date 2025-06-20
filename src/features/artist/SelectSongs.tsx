import {
  CheckboxCard,
  CheckboxGroup,
  Image,
  Input,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { HiSearch } from "react-icons/hi";
import { CreateAlbumProps } from "./CreateAlbumDialog";
import { useFetchSongsByArtist } from "./useArtist";

interface SelectSongProps {
  control: Control<CreateAlbumProps>;
  errors: FieldErrors<CreateAlbumProps>;
}

export function SelectSongs({ control, errors }: SelectSongProps) {
  const { data, isLoading } = useFetchSongsByArtist();

  if (!isLoading && !data) return null;
  return (
    <Stack w={"full"} gap={2}>
      <InputGroup startElement={<HiSearch size={16} />}>
        <Input bg={"gray.950"} size={"md"} placeholder="Search" />
      </InputGroup>

      <Controller
        control={control}
        name={"albumSongs"}
        rules={{
          required: "You have to select at least one Genre!",
        }}
        render={({ field }) => (
          <CheckboxGroup
            w={"full"}
            gap={3}
            display={"grid"}
            gridTemplateColumns={"repeat(2, 1fr)"}
            mt={2}
            value={Array.isArray(field.value) ? field.value : undefined}
            onValueChange={field.onChange}
          >
            {data?.map((curSong) => (
              <CheckboxCard.Root
                key={curSong.id}
                colorPalette={"green"}
                bg={"gray.950"}
                value={curSong.id}
                rounded={"md"}
                display={"flex"}
              >
                <CheckboxCard.HiddenInput />
                <CheckboxCard.Content
                  px={4}
                  py={2}
                  display={"flex"}
                  flexDir={"row"}
                  gap={3}
                  alignItems={"center"}
                >
                  <Image
                    src={curSong.cover_url}
                    rounded={"md"}
                    w={"2.5rem"}
                    h={"2.5rem"}
                  />
                  <CheckboxCard.Label
                    _checked={{ color: "green.400" }}
                    textStyle={"md"}
                    textAlign={"center"}
                  >
                    {curSong.title}
                  </CheckboxCard.Label>
                </CheckboxCard.Content>
              </CheckboxCard.Root>
            ))}
          </CheckboxGroup>
        )}
      />
      {errors.albumSongs && (
        <Text color="red.500">{errors.albumSongs.message}</Text>
      )}
    </Stack>
  );
}

export default SelectSongs;
