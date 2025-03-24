import { Tooltip } from "./tooltip";

type propTypes = {
  children: React.ReactNode;
  tooltipText: string;
};

export function IconWithTooltip({ children, tooltipText }: propTypes) {
  return (
    <Tooltip openDelay={150} closeDelay={150} content={tooltipText}>
      {children}
    </Tooltip>
  );
}

export default IconWithTooltip;
