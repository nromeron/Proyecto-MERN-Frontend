import React, {useCallback, useState} from 'react';
import { Image, Form } from 'semantic-ui-react';
import './UserForm.scss';
import { useFormik } from 'formik';
import { UserApi } from '../../../../api/apiUser';
import {useAuth} from "../../../../Hooks/useAuth"
import { useDropzone } from 'react-dropzone'; 
import { initialValues, validationSchema } from './UserForm.form';
import { ENV } from '../../../../utils';

// este componente es el formulario que se muestra en el modal de creación y edición de usuarios
// recibe las propiedades close, onReLoad y user, que son funciones y un objeto respectivamente y
// se encarga de mostrar los campos necesarios para la creación o edición de un usuario
// y de manejar la lógica de envío de los datos del formulario

const userController = new UserApi();

export function UsersForm(props) {
  const { close, onReload, user } = props;
  const { accessToken } = useAuth();
  const [error, setError] = useState("");

  const roleOptions = [
    { key: 'admin', text: 'Admin', value: 'admin' },
    { key: 'user', text: 'User', value: 'user' }
];

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: validationSchema(user),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (!user) {
          await userController.createUser(accessToken, formValue);
        } else {
          await userController.updateUser(accessToken, user._id, formValue);
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
    formik.setFieldValue("avatar", URL.createObjectURL(file));
    formik.setFieldValue("fileAvatar", file);
  }, [formik]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
    onDrop
});

const getAvatar = () => {
  if (formik.values.fileAvatar) {
      return formik.values.avatar;
  }else if (formik.values.avatar) {
      return `${ENV.BASE_PATH}/${formik.values.avatar}`;
  }
  return user?.avatar || 'https://react.semantic-ui.com/images/avatar/large/matthew.png';
};
  return (
    <Form className="users-form" onSubmit={formik.handleSubmit}>
      <div className="users-form__avatar" {...getRootProps()}>
        <input {...getInputProps()} />
        <Image avatar size="small" src={getAvatar()} className="avatar-image"/>
      </div>

      <Form.Group widths="equal">
        <Form.Input
          name="firstName"
          label="Nombre"
          placeholder="Nombre"
          onChange={formik.handleChange}
          value={formik.values.firstname}
          error={formik.errors.firstname}
        />
        <Form.Input
          name="lastName"
          label="Apellidos"
          placeholder="Apellidos"
          onChange={formik.handleChange}
          value={formik.values.lastname}
          error={formik.errors.lastname}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="email"
          label="Email"
          placeholder="Correo electronico"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Input
          name="phone"
          label="Teléfono"
          placeholder="Teléfono"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
        </Form.Group>

        <Form.Group widths="equal">
        <Form.Dropdown
          name="role"
          label="Rol"
          placeholder="Seleccióna un rol"
          options={roleOptions}
          selection
          onChange={(_, data) => formik.setFieldValue("role", data.value)}
          value={formik.values.role}
          error={formik.errors.role}
        />
      
        <Form.Input
          type="password"
          name="password"
          label="Contraseña"
          placeholder="Contraseña"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />
      </Form.Group>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {user ? "Actualizar usuario" : "Crear usuario"}
        {error && <p>{error}</p>}
      </Form.Button>
    </Form>
  );
}
