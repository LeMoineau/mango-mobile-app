import { useState } from "react";

const useModals = <ModalNames>() => {
  const [modalStates, setModalStates] = useState<
    {
      modal: ModalNames;
      visible: boolean;
    }[]
  >([]);

  const isVisible = (modal: ModalNames): boolean => {
    const target = modalStates.find((m) => m.modal === modal);
    if (target) {
      return target.visible;
    }
    setModalStates([
      ...modalStates,
      {
        modal: modal,
        visible: false,
      },
    ]);
    return false;
  };

  const show = (modal: ModalNames) => {
    const tmpStates = [...modalStates];
    const target = tmpStates.find((m) => m.modal === modal);
    if (target) {
      target.visible = true;
    } else {
      tmpStates.push({
        modal: modal,
        visible: true,
      });
    }
    setModalStates(tmpStates);
  };

  const hide = (modal: ModalNames) => {
    const tmpStates = [...modalStates];
    const target = tmpStates.find((m) => m.modal === modal);
    if (target) {
      target.visible = false;
    } else {
      tmpStates.push({
        modal: modal,
        visible: false,
      });
    }
    setModalStates(tmpStates);
  };

  return {
    isVisible,
    show,
    hide,
  };
};

export default useModals;
