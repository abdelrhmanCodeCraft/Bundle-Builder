import { ReviewPanel, ReviewPanelTablet } from "../../features/review";

const RenderPanel = () => {
  return (
    <aside
      className="surface-card desktop:min-h-[855px]"
      style={{ backgroundColor: "var(--color-surface)", borderRadius: "var(--radius-card)" }}
    >
      {/*
        Two compositions of the same data: the panel is a narrow column beside
        the builder on desktop, and a full-width two-column summary once the
        page stacks below the `desktop` breakpoint.
      */}
      <div className="desktop:hidden">
        <ReviewPanelTablet />
      </div>

      <div className="hidden desktop:block">
        <ReviewPanel />
      </div>
    </aside>
  );
};

export default RenderPanel;
