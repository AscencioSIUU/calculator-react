import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../App'

describe('Calculadora', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('debe mostrar los números concatenados en el display', () => {
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('2'))
    fireEvent.click(screen.getByText('3'))

    expect(screen.getByTestId('display')).toHaveTextContent('123')
  })

  it('debe calcular automáticamente al presionar operador y segundo número (7 + 3 = 10)', () => {
    fireEvent.click(screen.getByText('7'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('3'))

    expect(screen.getByTestId('display')).toHaveTextContent('10')
  })

  it('debe mostrar ERROR si el resultado es negativo o mayor a 999999999', () => {
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('-'))
    fireEvent.click(screen.getByText('7'))

    expect(screen.getByTestId('display')).toHaveTextContent('ERROR')

    fireEvent.click(screen.getByText('C'))

     '999999999'.split('').forEach(n => {
          fireEvent.click(screen.getByRole('button', { name: n }))
     })
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('1'))

    expect(screen.getByTestId('display')).toHaveTextContent('ERROR')
  })

  it('debe permitir ingresar punto decimal una sola vez y mostrar 0.5 si se inicia con "."', () => {
    fireEvent.click(screen.getByText('.'))
    fireEvent.click(screen.getByText('5'))

    expect(screen.getByTestId('display')).toHaveTextContent('0.5')

    fireEvent.click(screen.getByText('.'))
    expect(screen.getByTestId('display')).toHaveTextContent('0.5') // no debe cambiar
  })

  it('debe cambiar el signo del número con +/- y mostrar ERROR si el resultado es negativo', () => {
    fireEvent.click(screen.getByText('7'))
    fireEvent.click(screen.getByText('+/-')) // se vuelve -7
    expect(screen.getByTestId('display')).toHaveTextContent('-7')

    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('2'))

    expect(screen.getByTestId('display')).toHaveTextContent('ERROR')
  })
})
