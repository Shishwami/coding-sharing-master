import React from "react";

export default function Selector({ options, onChange }) {
    return (
        <select onChange={onChange}>
            {options.map((option) => {
                <li value={option.id}>
                    {option.aliases[0]}
                </li>
            })}
        </select>
    );
}