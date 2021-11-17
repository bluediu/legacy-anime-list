import { useState } from 'react';

/**
 * custom hook for handle the state of modal window
 * @param {boolean} initialValue initial value of the state
 * @returns {Array} functions & state value
 */
export const useModal = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return [isOpen, openModal, closeModal];
};
