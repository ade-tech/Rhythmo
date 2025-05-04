import { Tooltip } from "./tooltip";

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
