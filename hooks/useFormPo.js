import { useState } from "react";
import PasswordValidation from "../modules/InputValidation";

export default function useFormPo() {
  const [form, setForm] = useState({});
  // const [errorMessage, setErrorMessage] = useState("");
  // const [isBadUserInput, setIsBadUserInput] = useState(false);
  const [inputValidation, setInputValidation] = useState({});

  // const passwordRegex =
  //   /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{10,}$/;

  // const handleChangePwd = (value) => {
  //   console.log("value =>", value);
  //   console.log("I executed the handleChangePwd function!");
  //   // if (!form.Password) return;
  //   // setOnChangeText({ ...onChangeText, Password: value });
  //   // setPassword(value);
  //   if (!passwordRegex.test(value)) {
  //     setIsBadUserInput(true);
  //     setErrorMessage(
  //       "Password must include:\n     • at least 10 characters\n     • 1 uppercase letter\n     • 1 number\n     • 1 special character"
  //     );
  //   } else {
  //     setIsBadUserInput(false);
  //     setErrorMessage("");
  //   }
  // };

  // const handleForm = (val, name) => setForm({ ...form, [name]: val });
  const handleForm = (val, name) => {
    setForm({ ...form, [name]: val });
    console.log("form =>", form);
    if (name === "Password")
      setInputValidation({ name: name, message: PasswordValidation(val) });
    // if (name === "Email") setInputValidation(PasswordValidation(val));
  };

  return {
    form,
    handleForm,
    inputValidation,
    // errorMessage,
    // setErrorMessage,
    // isBadUserInput,
    // setIsBadUserInput,
  };
}
