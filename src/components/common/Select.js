export default function Select({
    options = [],
    labelKey = "name",
    valueKey = "id",
    name,
    value,
    onChange,
    disabled = false,
    className = "",
}) {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 ${className}`}
        >
            <option value="">-- Chọn --</option>
            {options.map((item) => (
                <option key={item[valueKey]} value={item[valueKey]}>
                    {item[labelKey]}
                </option>
            ))}
        </select>
    );
}
