import React from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { CourseApi } from '../../../../api/apiCourse.js';
import {useAuth} from "../../../../Hooks/useAuth.js"

const courseApi = new CourseApi();

export function CourseForm(props) {
  const { close, onReload, course } = props;
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(course),
    validationSchema: validationSchema(course),
    onSubmit: async (formValue) => {
      try {
        await courseApi.createCourse(accessToken, formValue);
        onReload();
        close();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form className="course-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        label="Titulo"
        placeholder="Título del curso"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      />
      <Form.Input
        name="description"
        label="Descripción"
        placeholder="Descripción del curso"
        onChange={formik.handleChange}
        value={formik.values.description}
        error={formik.errors.description}
      />
      <Form.Input
        name="url"
        label="URL"
        placeholder="Url del curso"
        onChange={formik.handleChange}
        value={formik.values.description}
        error={formik.errors.description}
      />
      <Form.Input
        name="price"
        label="Precio"
        type="number"
        placeholder="Precio"
        onChange={formik.handleChange}
        value={formik.values.order}
        error={formik.errors.order}
      />
      <Form.Input
        name="score"
        label="Calificación"
        type="number"
        placeholder="Calificación"
        onChange={formik.handleChange}
        value={formik.values.order}
        error={formik.errors.order}
      />
      <Button type="submit" primary fluid loading={formik.isSubmitting}>
        Crear curso
      </Button>
    </Form>
  );
}

function initialValues() {
  return {
    title: '',
    description: '',
  };
}

function validationSchema() {
  return Yup.object({
    title: Yup.string().required('El título es obligatorio'),
    description: Yup.string().required('La descripción es obligatoria'),
  });
}