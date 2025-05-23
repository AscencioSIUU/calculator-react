import { act, renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useCalculatorLogic } from '../hooks/useCalculatorLogic'

describe('useCalculatorLogic', () => {

     it('invierte el signo correctamente con toggleSign cuando currentValue está vacío', () => {
          const { result } = renderHook(() => useCalculatorLogic())

          act(() => {
               result.current.clear()
               result.current.toggleSign()
          })

          expect(result.current.expression).toBe('-')
          expect(result.current.display).toBe('0')
     })

     it('no permite operaciones con operador sin currentValue', () => {
          const { result } = renderHook(() => useCalculatorLogic())

          act(() => {
               result.current.clear()
               result.current.handleOperator('+')  // No hace nada porque currentValue está vacío
          })

          expect(result.current.expression).toBe('')
     })

     it('clear resetea todos los estados correctamente', () => {
          const { result } = renderHook(() => useCalculatorLogic())

          act(() => {
               result.current.appendValue('9')
               result.current.handleOperator('*')
               result.current.appendValue('5')
               result.current.clear()
          })

          expect(result.current.display).toBe('0')
          expect(result.current.expression).toBe('')
     })

})
