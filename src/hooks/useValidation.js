import { useEffect, useState } from 'react';

export const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [spaceError, setSpaceError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations[validation] && value.length !== 0 ? setMinLengthError(true) : setMinLengthError(false);
          break;
        case 'maxLength':
          value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false);
          break;
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;
        case 'isOnlySpace': {
          if (value.length !== 0) {
            const re = /\s/g;
            re.test(value)
            ? value.match(re).length === value.length ? setSpaceError(true) : setSpaceError(false)
            : setSpaceError(false)
          }
          break;
        }
        default: return;
      }
    }
  }, [value]);

  useEffect(() => {
    isEmpty || minLengthError || maxLengthError || spaceError ? setInputValid(false) : setInputValid(true);
  }, [isEmpty, minLengthError, maxLengthError, spaceError]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    spaceError,
    inputValid,
  };
};
