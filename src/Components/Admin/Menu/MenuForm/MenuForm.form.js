import * as Yup from 'yup';

export function initialValues(menu) {
    return {
        title: menu?.title || '',
        description: menu?.description || '',
        path: menu?.path || '',
        order: menu?.order || '',
        active: menu?.active || false,
    }
}

export function validationSchema(menu) {
    return Yup.object({
        title: Yup.string().required(true),
        description: Yup.string().required(true),
        path: Yup.string().required(true),
        order: Yup.number(),
        active: Yup.boolean().required(true),
    });
}