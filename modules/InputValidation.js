function PasswordValidation(value) {
  const passwordRegex =
    // /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{10,}$/;
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,}$/;

  if (!passwordRegex.test(value)) {
    const errorMessage =
      // "Password must include:\n     • at least 10 characters\n     • 1 uppercase letter\n     • 1 number\n     • 1 special character";
      "Password must include:\n     • at least 8 characters\n     • 1 uppercase letter\n     • 1 number\n";
    return { result: false, errorMessage: errorMessage };
  } else {
    return { result: true };
  }
}

function EmailValidation(value) {
  console.log("Executed EmailValidation function");
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // if (!emailRegex.test(email)) {
  if (!emailRegex.test(value)) {
    console.log("value =>", value);
    return { result: false, errorMessage: "Invalid email address" };
  } else {
    return { result: true };
  }
}

module.exports = { PasswordValidation, EmailValidation };
