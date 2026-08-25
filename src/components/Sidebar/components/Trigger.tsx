import { Button } from "@/components/Button/Button";

import type { ButtonProps } from "@/components/Button/Button";

export interface TriggerProps extends ButtonProps {
    children: React.ReactNode;
}

export const Trigger = ({ children, ...props }: TriggerProps) => {
    
    return (
        <Button {...props} variant="link">
            {children}
        </Button>
    );
};