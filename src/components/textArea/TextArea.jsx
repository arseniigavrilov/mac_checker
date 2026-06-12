import React from 'react';
import Style from './style.module.scss'

export default function TextArea ({
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
                <textarea 
                    value={Value} 
                    onChange={OnChange} 
                    id={random15}
                    className={[Style.customInput,(Error)? Style.error : ''].join(' ')}
                    disabled={true}
                    placeholder={Placeholder}
                    onFocus={() => SetFocused(true)}
                    onBlurCapture={() => SetFocused(false)}
                />
            </label>
        </div>
    );
};