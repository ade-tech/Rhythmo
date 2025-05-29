/**
 * Provider Component
 *
 * Wraps the application with Chakra UI and color mode providers for consistent theming and color mode support.
 *
 * Usage:
 * - Used at the root of the app to provide Chakra UI context and color mode functionality.
 */

"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
