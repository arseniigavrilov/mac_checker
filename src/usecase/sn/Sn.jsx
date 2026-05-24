import React, { useEffect, useState } from 'react';
import { SNErrors } from '../../entities/enums';
import TextInput from '../../components/text-input/textInput';

export const validateSNErrors = (value, SNRegex) => {
  const errors = new Set();

  if (value.length == 0) 
    return errors

  if (!SNRegex.test(value)) {
    errors.add(SNErrors.INVALID_SN.id);
  }
  return errors;
};

const updateSNErrors = (prevErrors, newSNErrors) => {
  const next = new Set(prevErrors);
  next.delete(SNErrors.INVALID_SN.id);
  newSNErrors.forEach(errorId => next.add(errorId));
  return next;
};


export default function SerialNumber ({
    SnRegex,
    Hint,
    Trigger,
    SetTrigger,
    Errors,
    SetErrors,
    Placeholder,
    InputValue,
    InputFunc,
}) {

    const handleSNChange = (e) => {
        const normalizedValue = e.target.value;
        const snErrors = validateSNErrors(normalizedValue, SnRegex);

        SetErrors(prev => updateSNErrors(prev, snErrors));

        InputFunc(normalizedValue);
    };

    const getErrorTextById = (id) => {
        return Object.values(SNErrors).find(err => err.id === id)?.text;
    };

    useEffect(() => {
        if (Trigger) {
            const SnErrors = validateSNErrors(
                InputValue,
                SnRegex,
            );
            SetErrors(prev => updateSNErrors(prev, SnErrors));
            SetTrigger(false)
        }
    }, [Trigger])

    return (
        <div>
            <TextInput
                Type={'text'}
                Value={InputValue}
                Title={'Серийный номер (S/N)'}
                OnChange={handleSNChange}
                Error={Errors}
                Disabled={(SnRegex.toString() == '/(?:)/')}
                Placeholder={Placeholder}
            />
        </div>
    );
};