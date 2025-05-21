export function useValidationLogic() {
     function isNumber(input) {
          return /^\d$/.test(input)
     }

     function isOperator(input) {
          return ['+', '-', '*', '/', '=', '%'].includes(input)
     }

     function isControlKey(input) {
          return ['C', '+/-', '.'].includes(input)
     }

     return {
          isNumber,
          isOperator,
          isControlKey
     }
}
   