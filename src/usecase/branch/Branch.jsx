import React, { useEffect, useState } from 'react';
import { MacErrors } from '../../entities/enums';
import TextInput from '../../components/text-input/textInput';
import Style from './style.module.scss'


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