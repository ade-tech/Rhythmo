import { Box, HStack, Spacer, Switch, Text } from "@chakra-ui/react";
import ArtistSettingsSelect from "./ArtistSettingsSelect";
import { useState } from "react";

type SettingsItemProp = {
  title: string;
};

export function SettingsItem({ title }: SettingsItemProp) {
  const [checked, setChecked] = useState(false);
  return (
    <HStack px={2} h={10}>
      <Text>{title}</Text>
      <Spacer />
      <Switch.Root
        checked={checked}
        onCheckedChange={(e) => setChecked(e.checked)}
        colorPalette={"green"}
      >
        <Switch.HiddenInput />
        <Switch.Control />
        <Switch.Label />
      </Switch.Root>
      {checked && (
        <Box>
          <ArtistSettingsSelect />
        </Box>
      )}
    </HStack>
  );
}

export default SettingsItem;
