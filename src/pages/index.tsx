import Header from "@/components/Header";
import About from "@/components/About";
import Goals from "@/components/Goals";
import Info from "@/components/Info";
import Footer from "@/components/Footer";
import type { InfoProps } from "@/components/Info";

const Home: React.FC = () => {
  const infoItems: InfoProps[] = [
    {
      orientation: "right",
      title: (
        <h3>
          Aplikacja stworzona do walki z{" "}
          <span className="text-green">wykluczeniem społecznym</span>
        </h3>
      ),
      text: (
        <p>
          Osoby posługujące się językiem migowym często zderzają się ze
          zjawiskiem marginalizacji społecznej, co niejednokrotnie uniemożliwia
          uczestniczenie w życiu obywatelskim.{" "}
          <span className="font-bold">Czas to zmienić.</span>
        </p>
      ),
      image_path: "/pexels-shvets-production-7516363 2.png",
    },
    {
      orientation: "left",
      title: (
        <h3>
          Sprawdź i przekonaj się o{" "}
          <span className="text-green">innowacyjności</span> Migawki
        </h3>
      ),
      text: (
        <p>
          Wypróbuj Migawkę i samemu doświadcz, z jaką prostotą możesz
          komunikować się z użytkownikami{" "}
          <span className="font-bold">języka migowego.</span>
        </p>
      ),
      image_path: "/image 1.png",
    },
  ];
  return (
    <>
      <Header />
      <main>
        <About />
        <Goals />
        <div className="md:space-y-24 my-12">
          {infoItems.map((it, index) => (
            <Info {...it} key={index} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
