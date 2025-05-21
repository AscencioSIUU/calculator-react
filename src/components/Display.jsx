export default function Display({ value, expression }) {
  return (
    <div className="bg-black text-white p-4 rounded mb-4">
      <div className="text-right text-sm text-gray-400 h-5">{expression}</div>
      <div className="text-right text-2xl">{value}</div>
    </div>
  )
}
