import { Link } from "wouter";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const Header: React.FC = () => {
  return (
    <header>
      <div className="header-content">
        <nav>
          <h1>Migawka</h1>
          <Link href="/translator">
            <a className="start">
              <span>Rozpocznij</span>
              <ChevronRightIcon className="icon" />
            </a>
          </Link>
        </nav>
        <div className="hero">
          <h2>
            Poznaj Migawkę, przyszłość{" "}
            <span className="text-blue">komunikacji.</span>
          </h2>
          <p>Narzędzie przekładające gesty języka migowego na tekst.</p>
          <Link href="/translator">
            <a>Zacznij migać</a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
