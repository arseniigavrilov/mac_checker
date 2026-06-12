import React, { useEffect, useState } from 'react';
import { MacErrors } from '../../entities/enums';
import TextInput from '../../components/textInput/textInput';
import Style from './style.module.scss'

export const validateMacErrors = (value, macRegex, vendorFilter = '') => {
  const errors = new Set();

  if (value.length == 0) 
    return errors

  if (!macRegex.test(value)) {
    errors.add(MacErrors.INVALID_MAC.id);
  }

  if (vendorFilter.length > 0 && !value.toUpperCase().startsWith(vendorFilter.toUpperCase())) {
    errors.add(MacErrors.INVALID_VENDOR_MAC.id);
  }

  return errors;
};

const updateMacErrors = (prevErrors, newMacErrors) => {
  const next = new Set(prevErrors);
  
  next.delete(MacErrors.INVALID_MAC.id);
  next.delete(MacErrors.INVALID_VENDOR_MAC.id);
  
  newMacErrors.forEach(errorId => next.add(errorId));
  
  return next;
};


export default function MacCheck ({
    MacFilter,
    Trigger,
    SetTrigger,
    Errors,
    SetErrors,
    Placeholder,
    InputValue,
    InputFunc,
    Hint,
}) {

    const mac_regex = /^(?:[0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$/

    const handleMacChange = (e) => {
        let value = e.target.value.replace(/[^0-9A-Fa-f]/g, "").toUpperCase();

        value = value.substring(0, 12);

        const normalizedValue = value.match(/.{1,2}/g)?.join(":") || "";

        const macErrors = validateMacErrors(normalizedValue, mac_regex, MacFilter);
        SetErrors(prev => updateMacErrors(prev, macErrors));
        InputFunc(normalizedValue);
    };

    useEffect(() => {
        if (Trigger) {
            const macErrors = validateMacErrors(
                InputValue,
                mac_regex,
                MacFilter,
            );
            SetErrors(prev => updateMacErrors(prev, macErrors));
            SetTrigger(false)
        }
    }, [Trigger])

    return (
        <div className={Style.content}>
            <TextInput
                Type={'text'}
                Value={InputValue}
                Hint={Hint}
                Title={'MAC-Адрес'}
                OnChange={handleMacChange}
                Error={Errors}
                Placeholder={Placeholder}
            />
        </div>
    );
};