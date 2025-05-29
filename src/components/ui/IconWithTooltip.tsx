import { Tooltip } from "./tooltip";

/**
 * IconWithTooltip Component
 *
 * Wraps an icon with a tooltip for better accessibility and UX.
 *
 * Usage:
 * - Used to provide tooltips for icons in navigation, actions, or lists.
 */

type propTypes = {
  children: React.ReactNode;
  tooltipText: string;
  positioning?: "top" | "bottom";
};

export function IconWithTooltip({
  children,
  tooltipText,
  positioning,
}: propTypes) {
  return (
    <Tooltip
      contentProps={{ bg: "gray.950", color: "white" }}
      openDelay={150}
      closeDelay={150}
      positioning={{ placement: positioning }}
      content={tooltipText}
    >
      {children}
    </Tooltip>
  );
}

export default IconWithTooltip;
