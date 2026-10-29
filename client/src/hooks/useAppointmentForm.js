import { useCallback, useState } from 'react';
import { EMPTY_FORM } from '../constants/appointment.js';
import { MESSAGES } from '../constants/messages.js';
import { hasErrors, validateAppointment, validateField } from '../utils/validateAppointment.js';

export function useAppointmentForm(onSubmit) {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  }, []);

  const handleBlur = useCallback((event) => {
    const { name, value } = event.target;
    setErrors((previous) => ({ ...previous, [name]: validateField(name, value) }));
  }, []);

  const submit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit(values);
      setValues(EMPTY_FORM);
    } catch (error) {
      setErrors(error.fieldErrors ?? {});
      setSubmitError(error.fieldErrors ? null : error.message || MESSAGES.GENERIC_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateAppointment(values);
    setErrors(validationErrors);
    if (!hasErrors(validationErrors)) await submit();
  };

  const getFieldProps = (name) => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: handleChange,
    onBlur: handleBlur,
  });

  return { getFieldProps, handleSubmit, isSubmitting, submitError };
}
