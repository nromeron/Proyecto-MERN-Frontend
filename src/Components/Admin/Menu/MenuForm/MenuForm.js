import React, { useState} from 'react';
import { Button, Form, Dropdown, Input } from 'semantic-ui-react';
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

    const options = [
        { key: "https://", text: "https://", value: "https://" },
        { key: "http://", text: "http://", value: "http://" },
        { key: "/", text: "/", value: "/" },
      ];
    
    const formik = useFormik({
        initialValues: initialValues(menu),
        validationSchema: validationSchema(menu),
        validateOnChange: false,
        onSubmit: async (formValue) => {
        try {
            const data = {
                title: formValue.title,
                description: formValue.description,
                path: `${formValue.protocol}${formValue.path}`,
                order: formValue.order,
                active: formValue.active,
              };
              if (menu) {
                data.path = formValue.path;
                await menuController.updateMenu(accessToken, menu._id, data);
              } else {
                await menuController.createMenu(accessToken, data);
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
                        name="order"
                        label="Orden"
                        type="number"
                        placeholder="Orden"
                        onChange={formik.handleChange}
                        value={formik.values.order}
                        error={formik.errors.order}
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
                    <Input
                    name="path"
                    placeholder="URL"
                    fluid
                    onChange={formik.handleChange}
                    value={formik.values.path}
                    error={formik.errors.path}
                    label={
                    !menu ? (
                        <Dropdown
                        options={options}
                        onChange={(_, data) =>
                            formik.setFieldValue("protocol", data.value)
                        }
                        value={formik.values.protocol}
                        error={formik.errors.protocol}
                        />
                    ) : null
                    }
                />

                
            <br></br>
            <Button type="submit" primary fluid loading={formik.isSubmitting}>
                {menu ? "Actualizar menú" : "Crear menú"}
            </Button>
            {error && <div className="error">{error}</div>}
            </Form>
    );
}
