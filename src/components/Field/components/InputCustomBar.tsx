import React from 'react';
import style from '../Field.module.css';
import { MAX_LEVEL, MIN_LEVEL } from '@/zunstand/session';

export const InputCustomBar = (
    props: React.InputHTMLAttributes<HTMLInputElement>,
) => {
    const inputRef = React.useRef<HTMLInputElement>(null);


    const handleButtonClick = (level: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (inputRef.current) {
            inputRef.current.value = level.toString();
            const event = new Event('input', { bubbles: true });
            inputRef.current.dispatchEvent(event);


            const button = e.currentTarget;
            const siblings = button.parentElement?.querySelectorAll("button");

            siblings?.forEach((button) => {
                if(button.value <= level.toString()) {
                    button.dataset.active = "true";
                } else {
                    button.dataset.active = "false";
                }
            });
        }
    }
    return (
        <div className={style['field__custom-bar']}>
            <input
                type="number"
                min={MIN_LEVEL}
                max={MAX_LEVEL}
                step={1}
                ref={inputRef}
                {...props}
            />
            {Array.from({ length: MAX_LEVEL }, (_, index) => {
                const level = index + 1;
                return (
                    <button
                        key={`${props.name}-level-${level}`}
                        className={`${style[`field__custom-bar__${level}`]}`}
                        onClick={(e) => handleButtonClick(level, e)}
                        title={`change value level to ${index + 1}`}
                        aria-label={`change value level to ${index + 1}`}
                        value={level}
                        data-active={props.defaultValue && Number(props.defaultValue) >= level ? "true" : "false"}
                    />
                )
            })}
        </div>
    );
};
