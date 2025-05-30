/**
 * ReloadButton Component
 *
 * Renders a button that either reloads the page or navigates to the home page, based on the `type` prop.
 *
 * Usage:
 * - Used in error or not-found pages to provide quick recovery actions for the user.
 */

import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
type ReloadButtonProps = {
  type: "reload" | "home";
  title: string;
  icon: React.ReactNode;
};

export function ReloadButton({ type, title, icon }: ReloadButtonProps) {
  const navigate = useNavigate();
  return (
    <Button
      rounded={"full"}
      bg={"green.600"}
      textAlign={"center"}
      fontWeight={"bold"}
      color={"black"}
      mt={4}
      onClick={
        type === "reload" ? () => window.location.reload() : () => navigate("/")
      }
    >
      {icon}
      {title}
    </Button>
  );
}

export default ReloadButton;
