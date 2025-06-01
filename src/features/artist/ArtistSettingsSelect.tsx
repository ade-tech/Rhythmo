import { createListCollection, Portal, Select } from "@chakra-ui/react";

const ArtistSettingsSelect = () => {
  const frameworks = createListCollection({
    items: [
      { label: "In App", value: "In App" },
      { label: "Email", value: "email" },
    ],
  });
  return (
    <Select.Root
      collection={frameworks}
      size="sm"
      width="100px"
      defaultValue={["In App"]}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger rounded={"lg"}>
          <Select.ValueText />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content rounded={"lg"}>
            {frameworks.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default ArtistSettingsSelect;
