import Builder from "../components/layout/Builder";
import RenderPanel from "../components/layout/RenderPanel";

const Home = () => {
  return (
    <main className="w-full py-12">
      <section
        className="
          w-full
          max-w-[1196px]
          mx-auto
          px-0
          sm:px-6
          lg:px-8
          grid
          grid-cols-1
          desktop:grid-cols-[768px_399px]
          gap-[29px]
        "
      >
          <Builder />
          <RenderPanel />
      </section>
    </main>
  );
};

export default Home;