import React, {useCallback, useState} from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { useFormik } from 'formik';
import "./MenuForm.scss";
import { MenuApi } from '../../../../api/apiMenu';
import { useAuth } from '../../../../Hooks/useAuth';
import { initialValues, validationSchema } from './MenuForm.form';
import { useDropzone } from 'react-dropzone';
import { ENV } from '../../../../utils';

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
            await menuController.createMenu(accessToken, formValue);
            } else {
            await menuController.updateMenu(accessToken, menu._id, formValue);
            }
            close();
            onReload();
        } catch (error) {
            setError(error.message);
        }
        },
    });
    
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        formik.setFieldValue("image", URL.createObjectURL(file));
        formik.setFieldValue("fileImage", file);
    }, [formik]);
    
    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
        onDrop
    });
    
    const getImage = () => {
        if (formik.values.fileImage) {
        return formik.values.image;
        }
        if (menu) {
        return `${ENV.urlImages}/${menu.image}`;
        }
        return `${ENV.urlImages}/no-image.png`;
    }
    
    return (
        <Modal open={true} onClose={close}>
        <Modal.Header>
            {menu ? `Editar ${menu.name}` : "Nuevo Menu"}
        </Modal.Header>
        <Modal.Content>
            <Form onSubmit={formik.handleSubmit}>
            <Form.Field>
                <div {...getRootProps()} className="dropzone" style={{ backgroundImage: `url(${getImage()})` }}>
                <input {...getInputProps()} />
                </div>
            </Form.Field>
            <Form.Field>
                <label>Nombre</label>
                <input type="text" {...formik.getFieldProps("name")} />
                {formik.touched.name && formik.errors.name ? (
                <div className="error">{formik.errors.name}</div>
                ) : null}
            </Form.Field>
            <Form.Field>
                <label>Precio</label>
                <input type="number" {...formik.getFieldProps("price")} />
                {formik.touched.price && formik.errors.price ? (
                <div className="error
                ">{formik.errors.price}</div>
                ) : null}
            </Form.Field>
            <Form.Field>
                <label>Descripción</label>
                <textarea {...formik.getFieldProps("description")} />
                {formik.touched.description && formik.errors.description ? (
                <div className="error">{formik.errors.description}</div>
                ) : null}
            </Form.Field>
            <Button type="submit">Guardar</Button>
            </Form>
            {error && <div className="error">{error}</div>}
        </Modal.Content>
        </Modal>
    );
}
