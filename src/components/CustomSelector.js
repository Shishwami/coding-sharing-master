export default function CustomSelector({ options, onChange, value }) {
  return (
    <select onChange={onChange} value={value}>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.aliases[0]}
        </option>
      ))}
    </select>
  );
}