import { useEffect } from 'react';

/**
 * change the value to false when 5 seconds pass
 * @param {*} showValue : boolean
 * @param {*} setValue : function
 * @returns boolean | true or false
 */
export const useTimeOut = (showValue, setValue) => {
  useEffect(() => {
    let time = setTimeout(() => {
      setValue(false);
    }, 5000);

    return () => clearTimeout(time);
  }, [showValue, setValue]);

  // return the value when the useEffect changed
  return {
    showValue,
  };
};
