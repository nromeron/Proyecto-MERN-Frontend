import * as Yup from 'yup';

export function initialValues() {
    return {
        email: '',
        password: ''
    };
}   // End of initialValues  function

export function validationSchema() {
    return Yup.object({
      email: Yup.string()
        .email("El email no es valido")
        .required("Campo obligatorio"),
      password: Yup.string().required("Campo obligatorio"),
    });
  }  // End of validationSchema  function