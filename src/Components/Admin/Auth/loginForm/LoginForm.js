import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './LoginForm.form';
import { AuthApi } from '../../../../api/apiAuth';
import { useAuth } from '../../../../Hooks/useAuth';


// este componente es el formulario que se muestra en el modal de login
// se encarga de mostrar los campos necesarios para el login
// y de manejar la lógica de envío de los datos del formulario

const loginController = new AuthApi();

export function LoginForm() {
    const { login } = useAuth();

    const [ error, setError ] = useState("");
    
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            setError(""); // Reset error message
            try {
                const response = await loginController.login(formValue);
                console.log(response);

                if (response.access) {
                    loginController.setAccessToken(response.access);
                    loginController.setRefreshToken(response.refresh);
                    login(response.access);
                } else {
                    setError(response.msg);
                }
            } catch (error) {
                setError(error.message);
            }
        },
      }); 

    return (
        <Form className='login-form' onSubmit={formik.handleSubmit}>
            <Form.Input
                name = "email" 
                placeholder = "Correo Electrónico" 
                onChange={formik.handleChange} 
                value = {formik.values.email}
                error={formik.errors.email}
            />
            <Form.Input
                name = "password" 
                placeholder = "Contraseña" 
                type="password" onChange={formik.handleChange} 
                value = {formik.values.password}
                error={formik.errors.password}
            />
            <Form.Button type='submit' primary fluid content="Login" loading = {formik.isSubmitting} />
            {error && <p className='error-message'>{error}</p>}
        </Form>
    );
};