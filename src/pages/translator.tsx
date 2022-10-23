import TranslatorHeader from "@/components/TranslatorHeader";
import Translator from "@/components/Translator";
import Div100vh from "react-div-100vh";
import GestureModal from "@/components/GestureModal";
import { useState } from "react";

const Home: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(true);
  return (
    <Div100vh>
      <TranslatorHeader />
      <Translator setOpenModal={setOpenModal} />
      <GestureModal openModal={openModal} setOpenModal={setOpenModal} />
    </Div100vh>
  );
};

export default Home;
