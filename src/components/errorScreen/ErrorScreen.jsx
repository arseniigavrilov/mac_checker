import React, { useEffect } from 'react';
import Style from './style.module.scss'
import { SNErrors, MacErrors } from '../../entities/enums';

export default function ErrorScreen ({
    Errors
}) {

    const getErrorTextById = (id) => {
        var ErrorList        

        switch(Math.trunc(id / 10)) {
            case 1:
                ErrorList = MacErrors
                break
            case 2:
                ErrorList = SNErrors
                break
            default:
                ErrorList = MacErrors
                break
        }

        return Object.values(ErrorList).find(err => err.id === id)?.text;
    };
    return (
        <div className={[Style.wrapper, (Errors.size > 0)? Style.active: ''].join(' ')}>
            {[...Errors].map((item, i) => (
                <p key={i}>
                    • {getErrorTextById(item)}
                </p>
            ))}
        </div>
    );
};
