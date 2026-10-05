import * as motionReact from "motion/react";
import { vi } from "vitest";

export const createMotionReactMock = () => {
    function setAnimateComplete() {
        return vi.spyOn(motionReact, "animate")
            .mockImplementationOnce((value: any, target: any, options: any = {}) => {
                value.set(target);
                options.onComplete?.(); // dispara onFinish solo en el primer ciclo, evita recursión infinita
                return { stop: vi.fn() } as never;
            })
            .mockImplementation((value: any, target: any) => {
                value.set(target);
                return { stop: vi.fn() } as never;
            });
    }

    function resetAnimate() {
    return vi.mocked(motionReact.animate).mockReset();
}


    return { setAnimateComplete, resetAnimate };
};

// The mock is in the setup file src/test/vitest.setup.tsx. You don't need to copy in the test.