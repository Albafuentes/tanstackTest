import { MAX_TIMER, MIN_TIMER, TIMER_INCREMENT } from "@/zunstand/store/session.store";
import React from "react";
import style from '../Field.module.css';
import { Button } from "@/components";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { secondsToTime } from "@/utils/formats";

export const InputCustomNumber = (props: React.InputHTMLAttributes<HTMLInputElement>) => {

    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleButtonClick = (type: 'increase' | 'decrease', e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (type === 'increase') {
            inputRef.current?.stepUp();
        } else {
            inputRef.current?.stepDown();
        }
    }
    return (<div className={style['field__custom-number']}>
        <Button
            className="value-control"
            onClick={(e) => handleButtonClick('decrease', e)}
            title="Decrease value"
            aria-label="Decrease value"
            variant="green"
        >
            <IconMinus size={22} />
        </Button>
        <input
            type="time"
            min={secondsToTime(MIN_TIMER)}
            max={secondsToTime(MAX_TIMER)}
            step={TIMER_INCREMENT}
            ref={inputRef}
            lang="en-US"
            {...props}
        />
        <Button
            className="value-control"
            onClick={(e) => handleButtonClick('increase', e)}
            title="Increase value"
            aria-label="Increase value"
            variant="green"
        >
            <IconPlus size={26} />
        </Button>
    </div>)
}