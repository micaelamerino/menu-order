import { useRef, useState } from "react";

const useForm = (initialValue) => {
  const [form, setForm] = useState(initialValue);
  const formulario = useRef();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return { form, setForm, handleChange, formulario };
};
export default useForm;
