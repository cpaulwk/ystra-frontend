import { useState } from "react";

export default function useForm() {
  const [form, setForm] = useState({});

  const handleForm = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const updateForm = (newObject) => {
    newObject && setForm(Object.assign(form, newObject));
  };

  return {
    form,
    handleForm,
    updateForm,
    bind: {
      //onChangeText : handleForm,
    },
  };
}
