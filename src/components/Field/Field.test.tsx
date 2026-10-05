import { describe, it, expect, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { Field } from './Field'

vi.mock('./components/InputCustomNumber/InputCustomNumber', () => ({
    InputCustomNumber: (props: any) => <input data-testid="input-custom-number" {...props} />,
}))

vi.mock('./components/InputCustomBar/InputCustomBar', () => ({
    InputCustomBar: (props: any) => <input data-testid="input-custom-bar" {...props} />,
}))

describe('Field component', () => {
    it('links the label to the input via htmlFor/id when provided the name prop', () => {
        render(<Field type="text" name="username" label="Usuario" />)

        const input = screen.getByLabelText('Usuario')
        expect(input).toBeInTheDocument()
        expect(input).toHaveAttribute('id', 'username')
        expect(input).toHaveAttribute('name', 'username')
    })

    it('renders a description paragraph and links it via aria-describedby when provided', () => {
        render(<Field type="text" name="username" label="Usuario" description="Tu nombre de usuario" />)

        expect(screen.getByText('Tu nombre de usuario')).toBeInTheDocument()
        expect(screen.getByLabelText('Usuario')).toHaveAttribute('aria-describedby', 'username-description')
    })

    it('does not set aria-describedby when no description is provided', () => {
        render(<Field type="text" name="username" label="Usuario" />)

        expect(screen.getByLabelText('Usuario')).not.toHaveAttribute('aria-describedby')
    })

    it('renders every error message and marks the input as invalid when errors are provided', () => {
        render(
            <Field
                type="text"
                name="username"
                label="Usuario"
                errors={['Campo requerido', 'Formato inválido']}
            />,
        )

        expect(screen.getByText('Campo requerido')).toBeInTheDocument()
        expect(screen.getByText('Formato inválido')).toBeInTheDocument()
        expect(screen.getByLabelText('Usuario')).toHaveAttribute('aria-invalid', 'true')
    })

    it('does not mark the input as invalid when errors is an empty array', () => {
        render(<Field type="text" name="username" label="Usuario" errors={[]} />)

        expect(screen.getByLabelText('Usuario')).not.toHaveAttribute('aria-invalid')
    })

    it('sets aria-orientation on the fieldset when the orientation prop is provided', () => {
        render(<Field type="text" name="username" label="Usuario" orientation="horizontal" />)

        expect(screen.getByRole('group')).toHaveAttribute('aria-orientation', 'horizontal')
    })

    it('renders a text input when the type prop is "text"', () => {
        render(<Field type="text" name="username" label="Usuario" />)

        expect(screen.getByLabelText('Usuario')).toHaveAttribute('type', 'text')
    })

    it('renders a password input when the type prop is "password"', () => {
        render(<Field type="password" name="password" label="Contraseña" />)

        expect(screen.getByLabelText('Contraseña')).toHaveAttribute('type', 'password')
    })

    it('renders the InputCustomNumber component when the type prop is "custom-number"', () => {
        render(<Field type="custom-number" name="amount" label="Cantidad" />)
        screen.debug()
        expect(screen.getByTestId('input-custom-number')).toBeInTheDocument()
    })

    it('renders the InputCustomBar component when the type prop is "custom-bar"', () => {
        render(<Field type="custom-bar" name="range" label="Rango" />)

        expect(screen.getByTestId('input-custom-bar')).toBeInTheDocument()
    })

    it('forwards extra input props (e.g. onChange) to the underlying input when provided', () => {
        const handleChange = vi.fn()
        render(<Field type="text" name="username" label="Usuario" onChange={handleChange} />)

        act(() => {
            fireEvent.change(screen.getByLabelText('Usuario'), { target: { value: 'new value' } })
        })

        expect(handleChange).toHaveBeenCalledTimes(1)
    })
})