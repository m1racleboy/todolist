import { useState } from 'react';
import { useValidation } from './useValidation.js';

export const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (evt) => setValue(evt.target.value);

  const onBlur = () => setDirty(true);

  const onReset = () => setValue('');

  return {
    value,
    isDirty,
    onChange,
    onBlur,
    onReset,
    ...valid,
  };
};
