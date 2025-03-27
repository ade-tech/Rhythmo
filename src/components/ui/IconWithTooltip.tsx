import { Tooltip } from "./tooltip";

type propTypes = {
  children: React.ReactNode;
  tooltipText: string;
};

export function IconWithTooltip({ children, tooltipText }: propTypes) {
  return (
    <Tooltip
      contentProps={{ bg: "gray.950", color: "white" }}
      openDelay={150}
      closeDelay={150}
      content={tooltipText}
    >
      {children}
    </Tooltip>
  );
}

export default IconWithTooltip;
