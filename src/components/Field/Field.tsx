import style from './Field.module.css';
import React from 'react';
import { InputCustomBar } from './components/InputCustomBar/InputCustomBar';
import { InputCustomNumber } from './components/InputCustomNumber/InputCustomNumber';
import { IconInfoCircle } from '@tabler/icons-react';
import { Button } from '../Button/Button';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: 'text' | 'password' | 'custom-number' | 'custom-bar';
    name: string;
    label: string;
    description?: string;
    tooltip?: string;
    placeholder?: string;
    orientation?: 'horizontal' | 'vertical';
    errors?: string[];
}

const InputField = ({
    type,
    ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    type: 'text' | 'password' | 'custom-number' | 'custom-bar';
}) => {
    switch (type) {
        case 'text':
            return (
                <input
                    type="text"
                    {...props}
                    className={`${style['field__input-text']} ${props.className || ''}`}
                />
            );
        case 'password':
            return (
                <input
                    type="password"
                    {...props}
                    className={`${style['field__input-password']} ${props.className || ''}`}
                />
            );
        case 'custom-number':
            return <InputCustomNumber {...props} />;
        case 'custom-bar':
            return <InputCustomBar {...props} />;
        default:
            return null;
    }
};

export const Field = (props: FieldProps) => {
    const {
        orientation,
        name,
        label,
        description,
        tooltip,
        errors,
        ...inputProps
    } = props;

    const hasErrors = errors && errors.length > 0;

    return (
        <fieldset aria-orientation={orientation} className={style.field}>
            <div className={style['field__label-container']}>
                <label htmlFor={name}>
                    {label}{' '}
                    {tooltip && (
                        <>
                            <Button
                                type="button"
                                variant="link"
                                popoverTarget={`field-tooltip`}
                                aria-describedby={`field-tooltip`}
                                className={'anchor-tooltip'}
                            >
                                <IconInfoCircle size={18} />
                            </Button>

                            <p id={`field-tooltip`} popover="hint" className={'tooltip'}>
                                {tooltip}
                            </p>
                        </>
                    )}
                </label>
                {description && <p id={`${name}-description`}>{description}</p>}
            </div>

            <div className={style['field__label-container']}>
                <InputField
                    id={name}
                    name={name}
                    aria-invalid={hasErrors ? 'true' : undefined}
                    aria-describedby={
                        [
                            description ? `${name}-description` : null,
                            hasErrors ? `${name}-error` : null,
                        ]
                            .filter(Boolean)
                            .join(' ') || undefined
                    }
                    {...inputProps}
                />

                {hasErrors &&
                    errors.map((error, index) => (
                        <small
                            key={`input-error-${name}-${index}`}
                            id={`${name}-error-${index}`}
                        >
                            {error}
                        </small>
                    ))}
            </div>
        </fieldset>
    );
};
