import { Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

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
      <Outlet />
    </Stack>
  );
}

export default MainOutlet;
