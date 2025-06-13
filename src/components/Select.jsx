import { Controller } from "react-hook-form";
import { Select } from "antd";

const SelectField = ({
  control,
  name,
  funcCondition,
  label,
  options = [],
  defaultValue, // Tambahkan defaultValue sebagai prop
  rules = {},
  ...rest
}) => {
  const onSearch = (value) => {};

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          {label && (
            <label className="block text-sm text-gray-700  mb-1">{label}</label>
          )}
          <Select
            {...field}
            {...rest}
            showSearch
            value={field.value ?? defaultValue}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={options}
            className={`w-full my-1 ${
              error ? "border-red-500 border rounded-md" : ""
            }`}
            onChange={(value) => {
              field.onChange(value);

              // Misalnya ini array opsinya:
              const selectedOption = options.find(
                (item) => item.value === value
              );

              if (funcCondition) {
                funcCondition(selectedOption);
              }
            }}
            placeholder={`Select ${name}`}
          />
          {error && (
            <p className="text-red-500 text-xs mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default SelectField;
