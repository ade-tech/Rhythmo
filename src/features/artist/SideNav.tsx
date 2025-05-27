import { Box, Button, Spacer } from "@chakra-ui/react";
import NavItem from "./NavItem";
import { MdOutlineSpaceDashboard, MdSpaceDashboard } from "react-icons/md";
import {
  IoAlbums,
  IoAlbumsOutline,
  IoStatsChart,
  IoStatsChartOutline,
} from "react-icons/io5";
import { PiMusicNotesPlusBold, PiMusicNotesPlusFill } from "react-icons/pi";
import { HiOutlineLogout } from "react-icons/hi";
import {
  RiMoneyDollarCircleFill,
  RiMoneyDollarCircleLine,
  RiSettings3Fill,
  RiSettings3Line,
} from "react-icons/ri";
import { useLogout } from "./useArtist";
import { toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

const SideNav = () => {
  const { signOut, isPending, error } = useLogout();
  useEffect(() => {
    if (error) {
      toaster.create({
        title: "We could not sign you out",
      });
    }
  }, [error]);
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
      gap={2}
    >
      <NavItem
        to="/artist/dashboard"
        icon={<MdSpaceDashboard size={24} />}
        text="Dashboard"
        inActiveIcon={<MdOutlineSpaceDashboard size={24} />}
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
      <NavItem
        to="/artist/tracks"
        icon={<IoAlbums size={24} />}
        text="My Songs"
        inActiveIcon={<IoAlbumsOutline size={24} />}
      />
      <NavItem
        to="/artist/revenue"
        icon={<RiMoneyDollarCircleFill size={24} />}
        text="Earnings"
        inActiveIcon={<RiMoneyDollarCircleLine size={24} />}
      />
      <NavItem
        to="/artist/settings"
        icon={<RiSettings3Fill size={24} />}
        text="Settings"
        inActiveIcon={<RiSettings3Line size={24} />}
      />
      <Spacer />
      <Button
        color={"red.500"}
        bg={"transparent"}
        _hover={{
          bg: "red.950",
        }}
        rounded={"lg"}
        disabled={isPending}
        onClick={() => signOut()}
      >
        <HiOutlineLogout /> Sign Out
      </Button>
    </Box>
  );
};

export default SideNav;
