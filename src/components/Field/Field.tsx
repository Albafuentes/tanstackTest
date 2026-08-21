import style from "./Field.module.css";

interface FieldProps {
    type: "text" | "password" | "custom-number" | "custom-bar";
    name: string;
    label: string;
    description?: string;
    placeholder?: string;
    orientation?: "horizontal" | "vertical";
    errors?: string[];
}

const InputField = ({ type, ...props }: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & { type: "text" | "password" | "custom-number" | "custom-bar" }) => {
    switch (type) {
        case "text":
            return <input type="text" {...props} />;
        case "password":
            return <input type="password" {...props} />;
        case "custom-number":
            return <>Addd</>;
        case "custom-bar":
            return <>Addd</>;
        default:
            return null;
    }
}

export const Field = (props: FieldProps) => {

    const { orientation, name, label, description, errors, ...inputProps } = props;

    const hasErrors = errors && errors.length > 0;

    return (
        <div aria-orientation={orientation} className={style.field}>

            <label htmlFor={name}>{label}</label>

            {description && <p id={`${name}-description`}>{description}</p>}

            <InputField
                id={name}
                name={name}
                aria-invalid={hasErrors ? "true" : undefined}
                aria-describedby={description ? `${name}-description` : undefined}
                {...inputProps}
            />

            {hasErrors && errors.map((error, index) => (
                <small key={index} id={`${name}-error`} >
                    {error}
                </small>
            ))}
        </div>
    )


}