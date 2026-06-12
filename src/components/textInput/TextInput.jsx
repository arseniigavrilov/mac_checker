import React from 'react';
import Style from './style.module.scss'

export default function TextInput ({
    Type,
    Value,
    OnChange,
    Placeholder,
    Error,
    Title,
    Disabled,
    Hint,
    SetFocused,
}) {
    const random15 = Math.random().toString().slice(2, 17);

    return (
        <div className={Style.inputWrapper}>
            <p>{Title}</p>
            <label 
                htmlFor={random15}
                className={Style.inputLabel}
            >
                <input 
                    type={Type}
                    value={Value} 
                    onChange={OnChange} 
                    id={random15}
                    className={[Style.customInput,(Error)? Style.error : ''].join(' ')}
                    disabled={Disabled}
                    placeholder={Placeholder}
                    onFocus={() => SetFocused(true)}
                    onBlurCapture={() => SetFocused(false)}
                />
            </label>
            <p className={Style.hint}>{Hint}</p>
        </div>
    );
};