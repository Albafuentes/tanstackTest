import type { JSX } from "react/jsx-runtime";

interface FieldProps {
    type: "text" | "custom-number" | "custom-bar";
    name: string;
    label: string;
    description?: string;
    orientation?: "horizontal" | "vertical";
}
const FieldLayout = ({ children, orientation = "vertical", name, label, description }: Omit<FieldProps, "type"> & { children: JSX.Element }) => {
    return <div aria-orientation={orientation} className="field">
        <div>
            <label htmlFor={name}>{label}</label>
            {description && <p id={`${name}-description`}>{description}</p>}
        </div>

        {children}
    </div>;
}

export const Field = (props: FieldProps) => {

    const { type, ...layoutProps } = props;

    switch (type) {
        case "text":
            return <FieldLayout {...layoutProps}><input type="text" id={layoutProps.name} name={layoutProps.name} aria-describedby={layoutProps.description ? `${layoutProps.name}-description` : undefined} /></FieldLayout>;
        case "custom-number":
            return <FieldLayout {...layoutProps}><input type="number" id={layoutProps.name} name={layoutProps.name} aria-describedby={layoutProps.description ? `${layoutProps.name}-description` : undefined} /></FieldLayout>;
        case "custom-bar":
            return <FieldLayout {...layoutProps}><progress id={layoutProps.name} value={50} max={100} aria-describedby={layoutProps.description ? `${layoutProps.name}-description` : undefined} /></FieldLayout>;
        default:
            return null;
    }
}