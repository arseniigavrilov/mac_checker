import React, { useEffect, useState } from 'react';
import TextArea from '../../components/textArea/TextArea';
import { FaCopy } from "react-icons/fa";
import Style from './style.module.scss'

export default function CopyField ({
    InputValue,
    InputFunc,
    Branch,
    Model,
    MAC,
    SN,
    Abon,
}) {

    useEffect(() => {
        editField(
            Branch,
            '1)'
        )
    }, [Branch])
    useEffect(() => {
        editField(
            Model,
            '2)'
        )
    }, [Model])
    useEffect(() => {
        editField(
            MAC,
            '3)'
        )
    }, [MAC])
    useEffect(() => {
        editField(
            SN,
            '4)'
        )
    }, [SN])
    useEffect(() => {
        editField(
            Abon,
            '5)'
        )
    }, [Abon])

    const editField = (Value, searchSymbol) => {
        if (Value !== undefined && Value !== null && InputValue.includes(searchSymbol)) {
            const escapedSymbol = searchSymbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            
            const regex = new RegExp(`${escapedSymbol}.*`);
            const newValue = InputValue.replace(regex, `${searchSymbol}${Value}`);
            
            InputFunc(newValue);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(InputValue)
            .then(() => {
                alert("Скопировано успешно");
            })
            .catch(err => {
                console.error("Не удалось скопировать", err);
            });
    }

    return (
        <div className={Style.content}>
            <TextArea
                Value={InputValue}
                Title={'Форма отправки'}
                OnChange={(e) => InputFunc(e.target.value)}
                Placeholder={''}
            />
            <button 
                className={Style.copy}
                onClick={() => handleCopy()}
            >
                <FaCopy /> Скопировать текст
            </button>
        </div>
    );
};