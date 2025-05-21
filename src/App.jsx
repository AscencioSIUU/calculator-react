import './App.css'
import Keypad from './components/Keypad'
import Display from './components/Display'
import { useCalculatorLogic } from './hooks/useCalculatorLogic'
function App () {
  const { display, appendValue, handleEqual, handleOperator, clear } = useCalculatorLogic()
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-6 rounded-lg shadow-xl w-80'>
        <Display value={display} />
        <Keypad onNumber={appendValue} onOperator={handleOperator} onEqual={handleEqual} onClear={clear} />
      </div>
    </div>
  )
}
export default App