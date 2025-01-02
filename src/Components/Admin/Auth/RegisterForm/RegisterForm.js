import React, {useState} from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useFormik } from 'formik';
import { AuthApi } from '../../../../api/indexApi';
import { initialValues, validationSchema } from './RegisterForm.form';
import "./RegisterForm.scss";

export function RegisterForm(props) {

    const {openLogin} = props;
    const authController = new AuthApi();

    const [error, setError] = useState("");

    const formik = useFormik({

        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                setError("");
                await authController.register(formData);
                openLogin();
            } catch (error) {
                setError(error.message);
            }
        },
    });

  return (
    <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input 
            name = "email" 
            placeholder = "Correo Electrónico" 
            onChange={formik.handleChange} 
            value = {formik.values.email}
            error={formik.errors.email}
        />
        <Form.Input 
            name = "username" 
            placeholder = "Nombre de Usuario" 
            onChange={formik.handleChange} 
            value = {formik.values.username}
            error={formik.errors.username}
        />
        <Form.Input 
            name = "password" 
            placeholder = "Contraseña" 
            type="password" onChange={formik.handleChange} 
            value = {formik.values.password}
            error={formik.errors.password}
        /> 
        <Form.Input 
            name = "repeatPassword" 
            placeholder = "Repetir Contraseña" 
            type="password"
            onChange={formik.handleChange} 
            value = {formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
        />
        <Form.Checkbox 
            name='conditionsAccepted' 
            label="Acepto los términos y condiciones"
            onChange={(_, data) => formik.setFieldValue("conditionsAccepted", data.checked)} 
            checked = {formik.values.conditionsAccepted}
            error={formik.errors.conditionsAccepted}
        />
        <Button type="submit" primary fluid loading = {formik.isSubmitting}>Registrarse</Button>

        {error && <p className="register-form__error">{error}</p>}
    </Form>
  )
}
