/**
 * NavItem Component
 *
 * Represents a single navigation item in the artist dashboard sidebar.
 * Handles navigation, icon display, and active state styling.
 *
 * Usage:
 * - Used within SideNav to render each navigation link.
 */

import { Box, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  inActiveIcon: React.ReactNode;
  text: string;
}

const NavItem = ({ to, icon, inActiveIcon, text }: NavItemProps) => {
  return (
    <NavLink to={to} className={"flex"}>
      {({ isActive }) =>
        isActive ? (
          <Box
            w={"full"}
            display={"flex"}
            h={12}
            px={3}
            rounded={"lg"}
            alignItems={"center"}
            gap={2}
            color={"green.500"}
            bgGradient={"to-l"}
            gradientFrom={"gray.950"}
            gradientTo={"green.900"}
            transition={"all 200ms ease-in-out"}
          >
            {icon}
            <Text textStyle={"lg"} fontWeight={"bold"}>
              {text}
            </Text>
            <Spacer />
            <GoDotFill size={15} className="transition-all duration-500" />
          </Box>
        ) : (
          <Box
            w={"full"}
            display={"flex"}
            h={12}
            px={3}
            rounded={"lg"}
            alignItems={"center"}
            gap={2}
            color={"white"}
            transition={"all 200ms ease-in-out"}
          >
            {inActiveIcon}
            <Text textStyle={"lg"} fontWeight={"medium"}>
              {text}
            </Text>
          </Box>
        )
      }
    </NavLink>
  );
};

export default NavItem;
