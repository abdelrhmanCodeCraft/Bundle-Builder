import { ReviewPanel } from "../../features/review";

const RenderPanel = () => {
  return (
    <aside 
      className="surface-card min-h-[855px]" 
      style={{ backgroundColor: "var(--color-surface)", borderRadius: "var(--radius-card)" }}
    >
      <ReviewPanel/>
    </aside>
  );
};

export default RenderPanel;