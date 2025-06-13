import { Controller } from "react-hook-form";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const DatePickerField = ({ control, name, label, rules }) => {
  return (
    <div className="">
      <label className="block text-sm text-gray-700  mb-1">{label}</label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <DatePicker
              {...field}
              format="YYYY-MM-DD"
              className={`w-full my-1 ${
                fieldState.error ? "border-red-500 border rounded-md" : ""
              }`}
              onChange={(date) => field.onChange(date)}
              value={field.value ? dayjs(field.value) : null}
            />
            {fieldState.error && (
              <p className="text-red-500 text-sm mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default DatePickerField;
