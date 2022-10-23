import { Dispatch, Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface GestureModalProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
}

const GestureModal: React.FC<GestureModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const gestures = [
    { desc: "Cześć! - Prosta ręka, 5 palców prosto", image: "/1f590.svg" },
    { desc: "Tak - Zaciśnięta pięść, 5 palców zgięte", image: "/1f44a.svg" },
    {
      desc: "Nie - Kciuk, palec wskazujący i środkowy prosto, wskazujący i środkowy razem, serdeczny i mały zgięte",
      image: "/pinch-svg.svg",
    },
    {
      desc: "Kocham Cię! - Kciuk, palec wskazujący i mały prosto, serdeczny i środkowy zgięte",
      image: "/1f91f.svg",
    },
    {
      desc: "Dziękuję - Obie dłonie otwarte, dotykają ust z obu stron",
      image: "/dotykanie_ust.svg",
    },
  ];
  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        as="div"
        className="gesture-modal-container"
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="gesture-modal-background" />
        </Transition.Child>

        <div className="gesture-modal-message-container">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="gesture-modal-message">
              <div className="gesture-modal-body">
                <Dialog.Title as="h3" className="gesture-modal-title">
                  Obsługiwane gesty
                </Dialog.Title>
                <div className="gesture-modal-close">
                  <button
                    type="button"
                    className="close-button"
                    onClick={() => setOpenModal(false)}
                  >
                    <XMarkIcon className="close-button" />
                  </button>
                </div>
                <div className="gesture-modal-description-container">
                  {gestures.map((gest, index) => (
                    <div className="gest" key={index}>
                      <p className="gesture-modal-description">{gest.desc}</p>
                      <img src={gest.image} className="gesture-modal-image" />
                    </div>
                  ))}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default GestureModal;
