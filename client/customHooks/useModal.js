/**
 * ************************************
 *
 * @module useModal
 * @description Custom hook for toggle show and close for Create Class Modal;
 *
 * ************************************
 */

import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  
  const toggle = () => setIsShowing(!isShowing);

  return {
    isShowing,
    toggle,
  }
};

export default useModal;