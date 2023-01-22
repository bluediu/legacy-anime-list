export const validationsFormRegister = (form) => {
  let errors = {};

  // regular expressions
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

  //Validations
  if (!form.name.trim())
    errors.name = 'El "nombre" es requerido';
  else if (!regexName.test(form.name.trim()))
    errors.name =
      'El campo "nombre" solo acepta letras y espacio en blanco';

  if (!form.email.trim())
    errors.email = 'El  "email" es requerido';
  else if (!regexEmail.test(form.email.trim()))
    errors.email = 'El campo "email" es incorrecto';

  if (
    form.password.trim() !== form.password2.trim() ||
    form.password < 5
  )
    errors.password =
      'el campo "contraseña" esta vacio o las contraseña no son iguales';

  return errors;
};

export const validationsFormLogin = (form) => {
  let errors = {};

  // regular expressions
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

  //Validations
  if (!form.email.trim())
    errors.email = 'El  "email" es requerido';
  else if (!regexEmail.test(form.email.trim()))
    errors.email = 'El campo "email" es incorrecto';

  if (!form.password.trim() || form.password < 5)
    errors.password = 'el campo "contraseña" es incorrecto';

  return errors;
};
