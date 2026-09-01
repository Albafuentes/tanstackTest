// vitest.setup.ts
import '@testing-library/jest-dom/vitest';
import type { JSX } from 'react/jsx-runtime';
import { vi } from 'vitest'

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
}))
