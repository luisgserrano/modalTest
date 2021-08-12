import { useCallback, useEffect, useState, useContext, createContext } from 'react';

const ModalContext = createContext();

// WARNING: This might save all modals in the list if you keep
// changing pages without reloading :o

export function useModal({ key, modalComponent, modalProps }) {
  const modalClientState = useContext(ModalContext);
  if (typeof modalClientState === 'undefined') {
    throw new Error('useModal must be used within a ModalClientProvider');
  }

  const { setModals, showModal, closeModal } = modalClientState;
  const show = useCallback(({ newProps }) => showModal(key, newProps), [key, showModal]);
  const close = useCallback(() => closeModal(key), [key, closeModal]);

  useEffect(() => {
    setModals((currentModals) => ({
      ...currentModals,
      [key]: {
        key,
        modalProps: { ...modalProps, close },
        Component: modalComponent,
      },
    }));
  }, []);

  // return [{ ...modalProps, ...props, closeModal }, showModal, closeModal];
  return { show, close };
}

function ModalBase() {
  const { modals } = useContext(ModalContext);
  const activeModal = modals[modals.activeModal];
  console.log(activeModal);
  return activeModal?.Component ? <activeModal.Component {...activeModal.modalProps} /> : null;
}

export function ModalProvider({ children }) {
  const [modals, setModals] = useState({});

  const showModal = useCallback((key, newProps) => {
    console.log(key, newProps);
    setModals((currentModals) => {
      return {
        ...currentModals,
        [key]: {
          ...currentModals[key],
          modalProps: {
            ...currentModals[key].modalProps,
            ...newProps,
          },
          isOpen: true,
        },
        activeModal: key,
      };
    });
  }, []);

  const closeModal = useCallback((key) => {
    setModals((currentModals) => {
      console.log(currentModals);
      return {
        ...currentModals,
        [key]: {
          ...currentModals[key],
          isOpen: false,
        },
        activeModal: '',
      };
    });
  }, []);

  return (
    <ModalContext.Provider value={{ modals, setModals, showModal, closeModal }}>
      {children}
      <ModalBase />
    </ModalContext.Provider>
  );
}
