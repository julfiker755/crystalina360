import { useState } from "react";

export function useFormFields<T extends Record<string, any>>(initialState: T) {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = (field: keyof T, value: T[keyof T]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return { formData, handleChange, setFormData };
}
