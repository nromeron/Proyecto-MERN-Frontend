import React, { useEffect, useState } from 'react';
import { CourseApi } from '../../../../api/apiCourse.js';
import { useAuth } from "../../../../Hooks/useAuth.js"
import { List, Button } from 'semantic-ui-react';

const courseApi = new CourseApi();

export function ListCourses({ active, reload, onReload }) {
  const { accessToken } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await courseApi.getAllCourses(accessToken, active);
      setCourses(response);
    })();
  }, [reload, ]);

  return (
    <List>
      {courses.map(course => (
        <List.Item key={course._id}>
          <List.Content>
            <List.Header>{course.title}</List.Header>
            <List.Description>{course.description}</List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
}