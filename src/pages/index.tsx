import Header from "@/components/Header";
import About from "@/components/About";
import Goals from "@/components/Goals";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <About />
      <Goals />
      <div className="h-[1000px]" />
    </>
  );
};

export default Home;
