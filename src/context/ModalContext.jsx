import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'enquiry', // 'enquiry' | 'counselling' | 'job' | 'training' | 'service'
    payload: {},
  });

  const openModal = useCallback((type = 'enquiry', payload = {}) => {
    setModalState({ isOpen: true, type, payload });
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Sensible delayed / exit-intent prompt — never shown immediately on landing, at most once per session
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const alreadyShown = sessionStorage.getItem('mami_prompt_shown');
    if (alreadyShown) return;

    const handleMouseLeave = (e) => {
      if (e.clientY <= 4 && !sessionStorage.getItem('mami_prompt_shown')) {
        sessionStorage.setItem('mami_prompt_shown', '1');
        setModalState((prev) =>
          prev.isOpen
            ? prev
            : {
                isOpen: true,
                type: 'enquiry',
                payload: { title: 'Need Quick Career Guidance?' },
              }
        );
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 15000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return ctx;
}

