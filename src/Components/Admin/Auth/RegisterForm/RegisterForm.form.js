import * as Yup from "yup";

// Initial Values for the register form

export function initialValues() {
    return {
        email: "",
        username: "",
        password: "",
        repeatPassword: "",
        conditionsAccepted: false
    };
}

// Validation Schema for the register form

export function validationSchema() {
    return Yup.object({
        email: Yup.string().email("El Email no es valido").required("El Email es obligatorio"),
        username: Yup.string().required("El nombre de usuario es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria"),
        repeatPassword: Yup.string().required().oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
        conditionsAccepted: Yup.boolean().isTrue("Debes aceptar los términos y condiciones")
    });
}