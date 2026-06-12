import { useEffect } from "react";
import Style from "./style.module.scss";

export default function Dropdown({
    Data,
    SelectValue,
    OnChange,
    Title,
}) {
    return (
        <div className={Style.wrapper}>
            <p>{Title}</p>
            <select
                onChange={OnChange}
                value={SelectValue}
            >
                {Data?.map((item, i) => (
                    <option key={i} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
}