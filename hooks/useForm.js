import { useState } from "react";

export default function useForm() {
  const [form, setForm] = useState({});

  const handleForm = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  return {
    form,
    handleForm,
    bind: {
      //onChangeText : handleForm,
    },
  };
}
