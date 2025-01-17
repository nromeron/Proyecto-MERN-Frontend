import React, { useEffect, useState } from 'react';
import { CourseApi } from '../../../../api/apiCourse.js';
import { useAuth } from "../../../../Hooks/useAuth.js"
import { Loader } from 'semantic-ui-react';
import { map, size } from 'lodash';
import {CourseItem} from "../../../../Components/Admin/Courses/indexCourse.js"

const courseApi = new CourseApi();

export function ListCourses(props) {
  const {active, reload, onReload} = props;
  const { accessToken } = useAuth();
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setCourses(null);
        const response = await courseApi.getAllCourses(accessToken, active);
        setCourses(response.docs);
      } catch (error) {
        console.log(error)
      }
    })();
  }, [active, accessToken, reload]);

  console.log(courses)

  if (!courses) {
          return <Loader active inline="centered"/>
      }
      if (size(courses) === 0) {
          return <h3>No hay cursos</h3>
      }

  return ( map(courses, (course) => (
          <CourseItem key={course._id} course={course} onReload = {onReload} />
          )
      )
    )
}