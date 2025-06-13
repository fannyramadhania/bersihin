"use client";
import { Controller } from "react-hook-form";
import { Input } from "antd";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const InputField = ({
  control,
  name,
  label,
  defaultValue,
  disabled,
  prefix,
  classNames,
  suffix,
  useAutocomplete = true,
  rules = {},
  type = "text",
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className={`w-full mb-4 ${classNames}`}>
          {label && (
            <label className="block text-sm text-gray-700  mb-1">{label}</label>
          )}
          <Input
            {...field}
            {...rest}
            autoComplete={useAutocomplete ? "on" : "off"}
            type={
              type === "password" && !isPasswordVisible ? "password" : "text"
            }
            className={`w-full ${error ? "border-red-500" : ""} ${
              disabled ? "bg-gray-200" : ""
            }`}
            readOnly={disabled}
            suffix={
              type === "password" ? (
                isPasswordVisible ? (
                  <EyeOutlined
                    onClick={() => setIsPasswordVisible(false)}
                    className="cursor-pointer"
                  />
                ) : (
                  <EyeInvisibleOutlined
                    onClick={() => setIsPasswordVisible(true)}
                    className="cursor-pointer"
                  />
                )
              ) : (
                suffix
              )
            }
            prefix={prefix}
          />
          {error && (
            <p className="text-red-500 text-xs mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default InputField;
