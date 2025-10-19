import Tippy from "@/tippyjs/react";

export default function ToolTip({ children, ...prop }) {
  return (
    <Tippy delay={[500, 0]} {...prop}>
      {children}
    </Tippy>
  );
}
