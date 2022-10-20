import { Router, Route } from "wouter";
import Home from "@/pages/index";
import Translator from "@/pages/translator";

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/translator" component={Translator} />
    </Router>
  );
};

export default App;
