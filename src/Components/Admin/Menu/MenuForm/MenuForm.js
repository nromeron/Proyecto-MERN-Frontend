import React, { useState} from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import "./MenuForm.scss";
import { MenuApi } from '../../../../api/apiMenu';
import { useAuth } from '../../../../Hooks/useAuth';
import { initialValues, validationSchema } from './MenuForm.form';

const menuController = new MenuApi();

export function MenuForm(props) {
    //console.log("props", props);    
    const { close, onReload, menu } = props;
    const { accessToken } = useAuth();
    const [error, setError] = useState("");
    
    const formik = useFormik({
        initialValues: initialValues(menu),
        validationSchema: validationSchema(menu),
        validateOnChange: false,
        onSubmit: async (formValue) => {
        try {
            if (!menu) {
                console.log("entro en crear")
            await menuController.createMenu(accessToken, formValue);
            } else {
                console.log("entro en editar")
            await menuController.updateMenu(accessToken, menu._id, formValue);
            }
            close();
            onReload();
        } catch (error) {
            setError(error.message);
        }
        },
    });
    
    
    
    return (
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Input
                      name="title"
                      label="Titulo"
                      placeholder="Titulo"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                      error={formik.errors.title}
                    />
                    <Form.Input
                      name="path"
                      label="Path"
                      placeholder="Path"
                      onChange={formik.handleChange}
                      value={formik.values.path}
                      error={formik.errors.path}
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Input
                      name="description"
                      label="Descripción"
                      placeholder="Descripción"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      error={formik.errors.description}
                    />
                </Form.Group>

                <Form.Checkbox 
                        name='active' 
                        label="Activar"
                        onChange={(_, data) => formik.setFieldValue("active", data.checked)} 
                        checked = {formik.values.active}
                        error={formik.errors.active}
                    />
            
            <Button type="submit">Guardar</Button>
            {error && <div className="error">{error}</div>}
            </Form>
    );
}
