import Builder from "../components/layout/Builder";
import ReviewPanel from "../components/layout/ReviewPanel";

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
          xl:grid-cols-[768px_399px]
          gap-[29px]
        "
      >
          <Builder />
          <ReviewPanel />
      </section>
    </main>
  );
};

export default Home;