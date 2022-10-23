import { Link } from "wouter";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const TranslatorHeader: React.FC = () => {
  return (
    <nav className="translator-header">
      <h1>Migawka</h1>
      <Link href="/">
        <a className="start">
          <ChevronLeftIcon className="icon" />
          <span>wróć</span>
        </a>
      </Link>
    </nav>
  );
};

export default TranslatorHeader;
