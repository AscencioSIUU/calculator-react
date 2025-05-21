export default function Button ({ label, onClick, extraClass = '' }) {
     return (
       <button
         value={label}
         onClick={() => onClick(label)}
         className={`w-full h-full ${extraClass}`}
       >
         {label}
       </button>
     )
   }   