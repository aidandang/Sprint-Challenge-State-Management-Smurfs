// This is a custom hook to receive text from input element then save to formstate
import { useState, useEffect } from 'react';
import * as Yup from 'yup';

export const useForm = (initialValue, schema) => {
  // set state for form inputs and errors
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState(initialValue);
  const [post, setPost] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // handle callback function to set values to a formstate
  const handleChanges = (key, value) => {
    const newValue = {
      ...values, [key]: value
    }
    validateChange(key, value);
    setValues(newValue);
  };

  // validate an input
  const validateChange = (key, value) => {
    Yup
      .reach(schema, key)
      .validate(value)
      .then(valid => {
        setErrors({ ...errors, [key]: "" });
      })
      .catch(err => {
        setErrors({...errors, [key]: err.errors[0]});
      });
  }

  useEffect(() => {
    schema.isValid(values)
      .then(valid => {
        setButtonDisabled(!valid);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return [values, setValues, errors, handleChanges, buttonDisabled, setPost, post];
};