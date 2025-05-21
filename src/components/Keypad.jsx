import Button from './Button'
import { useValidationLogic } from '../hooks/validations'
export default function Keypad ({ onNumber, onOperator, onEqual, onClear }) {
  const { isNumber } = useValidationLogic()
  const keys = [ ['7', '8', '9', '+'], ['4', '5', '6', '-'], ['1', '2', '3', '*'], ['C', '0', '%', '/'],   ['+/-', '.', '=']]
  return (
    <div className="grid grid-cols-4 gap-2 p-2">
      {keys.flat().map(key => {
        const isOp = ['+', '-', '*', '/', '=', 'C', '%'].includes(key)
        const baseClass = isNumber(key) ? 'bg-gray-200 text-gray-800 border border-gray-400 rounded text-xl h-20' : 'bg-orange-500 text-white border border-orange-700 rounded text-xl h-20'  
        const className = key === '=' ? `${baseClass} col-span-2 rounded text-xl h-20` : `${baseClass} rounded text-xl h-20`
        return (
          <Button key={key} label={key} extraClass={className} onClick={ key === 'C' ? onClear : key === '=' ? onEqual : isOp ? () => onOperator(key) : () => onNumber(key) } />
        )
      })}
    </div>
  )
}