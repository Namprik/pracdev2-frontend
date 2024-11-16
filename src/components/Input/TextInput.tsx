export default function TextInput({
  type,
  label,
  required,
  value,
  onChange,
}: {
  type: string;
  label: string;
  required: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col space-y-2">
      <label>
        {label}:{required ? "*" : ""}
      </label>
      <input
        type={type}
        placeholder={label}
        className="border border-dp-border rounded-lg px-6 py-3 placeholder:text-dp-border text-black focus:border-dp-blue focus:outline-none disabled:border-dp-red-error"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
