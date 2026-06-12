import React, { useEffect, useState, useMemo } from 'react';
import TextInput from '../../components/textInput/textInput';
import Style from './style.module.scss'
import { RxCrossCircled } from "react-icons/rx";

export default function BranchSearching ({
    InputValue,
    InputFunc,
    DataFilled,

}) {
    const [InputFocused, setFocused] = useState(false)
    const [query, setQuery] = useState('');
    const [selectedBranch, setBranch] = useState('')

    const filteredData = useMemo(() => {
        if (!query.trim()) return DataFilled;

        const lowerQuery = query.toLowerCase();
        const result = {};

        for (const [branch, names] of Object.entries(DataFilled)) {
            const matchedNames = names.filter((name) => 
                name.toLowerCase().includes(lowerQuery)
            );

            matchedNames.sort((a, b) => {
                const aStarts = a.toLowerCase().startsWith(lowerQuery);
                const bStarts = b.toLowerCase().startsWith(lowerQuery);
                
                if (aStarts && !bStarts) return -1;
                if (!aStarts && bStarts) return 1;
                return 0; 
            });

            if (matchedNames.length > 0) {
                result[branch] = matchedNames;
            }
        }

        return result;
    }, [query]);

    useEffect(() => {
        if (selectedBranch !== '') {
            InputFunc(selectedBranch)
        }
    }, [selectedBranch])
    
    useEffect(() => {
        if (InputValue === '') {
            setQuery('')
            setBranch('')
        }
    }, [InputValue])

    function Unselect() {
        setBranch('')
        InputFunc('')
    }

    function HandleInput(value) {
        InputFunc(value)
        setQuery(value)
    }

    return (
        <div className={Style.content}>
            <button 
                className={[Style.unselect, (selectedBranch !== '') && Style.active].join(' ')}
                onClick={() => Unselect()}
            >
                <RxCrossCircled />
            </button>
            <TextInput
                Type={'text'}
                Value={(selectedBranch !== '')? selectedBranch : InputValue}
                Title={'Филиал'}
                OnChange={(e) => HandleInput(e.target.value)}
                Placeholder={'Населенный пункт'}
                SetFocused={setFocused}
                Disabled={selectedBranch}
            />
            <ul 
                id='search'
                className={[Style.searchWrapper, InputFocused && Style.active].join(' ')}
            >
                {Object.entries(filteredData).map(([branch, names]) => (names.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => setBranch(branch)}
                    >
                        {item}
                    </li>
                ))))}
            </ul>
        </div>
    );
};