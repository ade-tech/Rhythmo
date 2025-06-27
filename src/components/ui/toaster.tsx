/**
 * Toaster Utility Component
 *
 * Provides a global toast notification system using Chakra UI's toaster and portal components.
 *
 * Usage:
 * - Import and render <Toaster /> at the root of the app to enable toast notifications.
 * - Use the exported `toaster` instance to trigger toasts from anywhere in the app.
 */

"use client";

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
});

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root width={"2xs"} rounded={"4xl"} display={"flex"} alignItems={"center"} justifyContent={"space-around"} textAlign={"center"}>
            {toast.type === "loading" ? (
              <Spinner size="sm" color="green.solid" />
            ) : (
              <Toast.Indicator />
            )}
            <Stack
              gap="1"
              flex="1"
              maxWidth="100%"
              display={"flex"}
              alignItems={"center"}
            >
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger rounded={"full"} colorPalette={"green"}>
                {toast.action.label}
              </Toast.ActionTrigger>
            )}
            {toast.meta?.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};
