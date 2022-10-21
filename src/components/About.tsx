import {
  ClockIcon,
  ClipboardDocumentCheckIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/solid";

interface AboutItemProps {
  icon: JSX.Element;
  title: string;
  text: string;
}

const AboutItem: React.FC<AboutItemProps> = ({ icon, title, text }) => {
  return (
    <div className="about-item">
      <div className="about-item-icon-container">{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
};

const About: React.FC = () => {
  const items: AboutItemProps[] = [
    {
      icon: <ClockIcon className="about-item-icon" />,
      title: "Szybkość działania",
      text: "Dzięki wykorzystanym technologiom Migawka jest błyskawiczna w działaniu, natychmiastowo tłumacząc gesty.",
    },
    {
      icon: <ClipboardDocumentCheckIcon className="about-item-icon" />,
      title: "Rozwiązanie realnego problemu",
      text: "Osoby nieposługujące się językiem migowym mogą mieć trudności podczas komunikacji z osobami głuchymi lub niemymi. Migawka wychodzi tym problemom naprzeciw.",
    },
    {
      icon: <PuzzlePieceIcon className="about-item-icon" />,
      title: "Sztuczna inteligencja",
      text: "Dzięki wykorzystaniu zaawansowanych technologii AI, Migawka potrafi odczytać gesty języka migowego z nagrania kamery.",
    },
  ];
  return (
    <div className="about">
      <div className="about-content">
        <div className="about-content-top">
          <h3>
            Migawka to rewolucja komunikacji z użytkownikami{" "}
            <span className="font-extrabold">języka migowego.</span>
          </h3>
          <h4>
            Za pomocą Migawki możliwe jest przetłumaczenie gestów{" "}
            <span className="font-extrabold">języka migowego</span> nagranych
            poprzez kamerę na <span className="font-extrabold">tekst.</span>
          </h4>
        </div>
        <div className="about-content-bottom">
          <div className="about-items">
            {items.map((it, index) => (
              <AboutItem {...it} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
