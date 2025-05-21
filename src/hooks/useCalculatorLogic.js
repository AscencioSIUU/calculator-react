import { useState } from 'react'

export function useCalculatorLogic() {
     const [display, setDisplay] = useState('0')
     const [previousValue, setPreviousValue] = useState(null)
     const [operator, setOperator] = useState(null)
     const [shouldResetDisplay, setShouldResetDisplay] = useState(false)

     const appendValue = (value) => {
          if (display === 'ERROR') return

          if (shouldResetDisplay) {
               setDisplay(value)
               setShouldResetDisplay(false)
               return
          }

          if (display.length >= 9) return

          if (display === '0') {
               setDisplay(value)
          } else {
               setDisplay(display + value)
          }
     }

     const handleOperator = (op) => {
          if (display === 'ERROR') return

          setPreviousValue(Number(display))
          setOperator(op)
          setShouldResetDisplay(true)
     }

     const handleEqual = () => {
          if (previousValue === null || operator === null || display === 'ERROR') return

          const currentValue = Number(display)
          let result

          switch (operator) {
               case '+':
                    result = previousValue + currentValue
                    break
               case '-':
                    result = previousValue - currentValue
                    break
               case '*':
                    result = previousValue * currentValue
                    break
               case '/':
                    result = currentValue !== 0 ? previousValue / currentValue : 'ERROR'
                    break
               case '%':
                    result = previousValue % currentValue
                    break
               default:
                    return
          }
             

          // Validaciones
          if (result < 0 || result > 999999999 || result === 'ERROR') {
               setDisplay('ERROR')
          } else {
               const resultString = result.toString().slice(0, 9)
               setDisplay(resultString)
          }
             

          setPreviousValue(null)
          setOperator(null)
     }

     const clear = () => {
          setDisplay('0')
          setPreviousValue(null)
          setOperator(null)
          setShouldResetDisplay(false)
     }

     return {
          display,
          appendValue,
          handleEqual,
          handleOperator,
          clear
     }
}
