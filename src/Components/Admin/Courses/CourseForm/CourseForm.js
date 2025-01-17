import React from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { CourseApi } from '../../../../api/apiCourse.js';
import {useAuth} from "../../../../Hooks/useAuth.js"

const courseApi = new CourseApi();

export function CourseForm({ close, onReload }) {
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
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
        placeholder="Título del curso"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      />
      <Form.Input
        name="description"
        placeholder="Descripción del curso"
        onChange={formik.handleChange}
        value={formik.values.description}
        error={formik.errors.description}
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