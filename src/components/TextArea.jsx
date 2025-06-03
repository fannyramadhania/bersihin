"use client";
import { Controller } from "react-hook-form";
import { Input } from "antd";

const { TextArea } = Input;

const TextareaField = ({
  control,
  name,
  label,
  defaultValue,
  disabled,
  classNames,
  useAutocomplete = true,
  rules = {},
  rows = 4,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className={`w-full mb-4 ${classNames}`}>
          {label && (
            <label className="block text-sm text-gray-700 dark:text-neutral-200 mb-1">
              {label}
            </label>
          )}
          <TextArea
            {...field}
            {...rest}
            autoComplete={useAutocomplete ? "on" : "off"}
            rows={rows}
            className={`w-full ${error ? "border-red-500" : ""} ${
              disabled ? "bg-gray-200" : ""
            }`}
            readOnly={disabled}
          />
          {error && (
            <p className="text-red-500 text-xs mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default TextareaField;
