// vitest.setup.ts
import '@testing-library/jest-dom/vitest';
import type { JSX } from 'react/jsx-runtime';
import { vi } from 'vitest'
import { webcrypto } from 'node:crypto';

Object.defineProperty(globalThis, 'crypto', {
    value: webcrypto,
    configurable: true,
});

const NativeUint8Array = Object.getPrototypeOf(Buffer.prototype).constructor;
Object.defineProperty(globalThis, 'Uint8Array', {
    value: NativeUint8Array,
    configurable: true,
});

vi.mock('motion/react', () => ({
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    motion: new Proxy(
        {},
        {
            get: (_target, tag: string) => {
                return ({ children, variants, initial, animate, exit, transition, ...rest }: any) => {
                    const Tag = tag as keyof JSX.IntrinsicElements
                    return (
                        <Tag data-motion-tag={tag} data-variant-keys={variants ? Object.keys(variants).join(',') : undefined} data-animate-width={animate?.width} {...rest}>
                            {children}
                        </Tag>
                    )
                }
            },
        },
    ),
    useMotionValue: (initial: any) => {
        let current = initial;
        const listeners = new Set<(latest: any) => void>();

        return {
            get: () => current,
            set: (next: any) => {
                current = next;
                listeners.forEach((listener) => listener(current));
            },
            on: (event: string, callback: (latest: any) => void) => {
                if (event === "change") {
                    listeners.add(callback);
                }
                return () => listeners.delete(callback);
            },
        };
    },
    useMotionValueEvent: (
        value: { on: (event: string, cb: (latest: any) => void) => () => void },
        event: string,
        callback: (latest: any) => void,
    ) => {
        // The subscription is real like a hook
        value.on(event, callback);
    },
    animate: vi.fn((target: any, targetValue: any, options: any = {}) => {
        let stopped = false;
        const durationMs = (options.duration ?? 0) * 1000;

        const timeoutId = setTimeout(() => {
            if (stopped) return;
            if (target && typeof target.set === "function") {
                target.set(targetValue);
            }
            options.onComplete?.();
        }, durationMs);

        return {
            stop: vi.fn(() => {
                stopped = true;
                clearTimeout(timeoutId);
            }),
            pause: vi.fn(),
            play: vi.fn(),
            complete: vi.fn(),
            cancel: vi.fn(() => {
                stopped = true;
                clearTimeout(timeoutId);
            }),
        };
    }),
}))
