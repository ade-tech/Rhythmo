import { Stack } from "@chakra-ui/react";

type outletProps = {
  size: string;
};

export function MainOutlet({ size }: outletProps) {
  return (
    <Stack
      flex={size}
      pl={7}
      pt={5}
      className="bg-darker-overlay"
      rounded={"lg"}
    >
      MainOutlet dasdad dasda Component
    </Stack>
  );
}

export default MainOutlet;
