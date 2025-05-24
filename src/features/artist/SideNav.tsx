import { Box, Button, Spacer } from "@chakra-ui/react";
import NavItem from "./NavItem";
import { MdSpaceDashboard } from "react-icons/md";
import { IoStatsChart, IoStatsChartOutline } from "react-icons/io5";
import { PiMusicNotesPlusBold, PiMusicNotesPlusFill } from "react-icons/pi";
import { HiOutlineLogout } from "react-icons/hi";

const SideNav = () => {
  return (
    <Box
      w={"full"}
      h={"full"}
      bg={"gray.950"}
      rounded={"md"}
      py={6}
      px={5}
      display={"flex"}
      flexDir={"column"}
      gap={3}
    >
      <NavItem
        to="/artist/dashboard"
        icon={<MdSpaceDashboard size={24} />}
        text="Dashboard"
        inActiveIcon={<MdSpaceDashboard size={24} />}
      />
      <NavItem
        to="/artist/statistics"
        icon={<IoStatsChart size={24} />}
        text="Analytics"
        inActiveIcon={<IoStatsChartOutline size={24} />}
      />
      <NavItem
        to="/artist/create"
        icon={<PiMusicNotesPlusFill size={24} />}
        text="Create"
        inActiveIcon={<PiMusicNotesPlusBold size={24} />}
      />
      <Spacer />
      <Button
        color={"red.500"}
        bg={"transparent"}
        _hover={{
          bg: "red.950",
        }}
        rounded={"lg"}
      >
        <HiOutlineLogout /> Sign Out
      </Button>
    </Box>
  );
};

export default SideNav;
