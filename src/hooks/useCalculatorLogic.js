import { useState } from 'react'

export function useCalculatorLogic() {
     const [expression, setExpression] = useState('')
     const [currentValue, setCurrentValue] = useState('')
     const [accumulated, setAccumulated] = useState(null)
     const [operator, setOperator] = useState(null)
     const [result, setResult] = useState('0')

     const appendValue = (value) => {
          if (result === 'ERROR') return
          if (value === '.') {
               if (currentValue.includes('.')) return
               if (currentValue === '') {
                    setCurrentValue('0.')
                    setExpression(prev => prev + '0.')
                    setResult('0.')
                    return
               }
          }
          if ((currentValue + value).length > 9) return
          const updated = currentValue + value
          setCurrentValue(updated)
          setExpression(prev => prev + value)
          if (accumulated !== null && operator !== null) {
               const res = calculate(accumulated, Number(updated), operator)
               if (res === 'ERROR') {
                    showError()
                    return
               }
               setResult(res.toString())
          } else {
               setResult(updated)
          }
     }


     const handleOperator = (op) => {
          if (result === 'ERROR') return
          if (currentValue === '') return

          if (accumulated === null) {
               setAccumulated(Number(currentValue))
          } else if (operator) {
               const res = calculate(accumulated, Number(currentValue), operator)
               if (res === 'ERROR') {
                    showError()
                    return
               }
               setAccumulated(res)
               setResult(res.toString())
          }
          setOperator(op)
          setExpression(prev => prev + op)
          setCurrentValue('')
     }

     const handleEqual = () => {
          if (accumulated === null || operator === null || currentValue === '') return
          const res = calculate(accumulated, Number(currentValue), operator)
          if (res === 'ERROR') {
               showError()
               return
          }
          setResult(res.toString())
          setExpression(res.toString())
          setCurrentValue(res.toString())
          setAccumulated(null)
          setOperator(null)
     }

     const toggleSign = () => {
          if (result === 'ERROR') return
          if (currentValue === '') {
               setCurrentValue('-')
               setExpression(prev => prev + '-')
               return
          }
          if (currentValue.startsWith('-')) {
               const updated = currentValue.slice(1)
               setCurrentValue(updated)
               setExpression(prev => prev.slice(0, -currentValue.length) + updated)
               setResult(updated)
          } else {
               const updated = '-' + currentValue
               setCurrentValue(updated)
               setExpression(prev => prev.slice(0, -currentValue.length) + updated)
               setResult(updated)
          }
     }

     const clear = () => {
          setExpression('')
          setCurrentValue('')
          setResult('0')
          setAccumulated(null)
          setOperator(null)
     }

     const calculate = (a, b, op) => {
          let res
          switch (op) {
               case '+': res = a + b; break
               case '-': res = a - b; break
               case '*': res = a * b; break
               case '/': res = b !== 0 ? a / b : 'ERROR'; break
               case '%': res = a % b; break
               default: return 'ERROR'
          }
          if (res < 0 || res > 999999999 || isNaN(res)) return 'ERROR'
          return Number(res.toString().slice(0, 9))
     }

     const showError = () => {
          setResult('ERROR')
          setExpression('')
          setCurrentValue('')
          setAccumulated(null)
          setOperator(null)
     }

     return {
          display: result,
          expression,
          appendValue,
          handleOperator,
          handleEqual,
          clear,
          toggleSign
     }
}