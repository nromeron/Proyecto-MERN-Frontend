import React, { useState } from 'react';
import { Tab, Button } from 'semantic-ui-react';
import "./Courses.scss";
import { ListCourses } from '../../../Components/Admin/Courses/CourseList/ListCourses.js';
import { BasicModal } from '../../../Components/SharedComponents/BasicModal';
import { CourseForm } from "../../../Components/Admin/Courses/CourseForm/CourseForm"

export function Courses() {

  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const openModal = () => setShowModal(prevState => !prevState);
  const onReload = () => setReload(prevState => !prevState);

  const panels = [
    {
      menuItem: 'Cursos activos',
      render: () => (
        <Tab.Pane attached={false}>
          <ListCourses active={true} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Cursos inactivos',
      render: () => (
        <Tab.Pane attached={false}>
          <ListCourses active={false} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className="courses-page">
        <Button className="courses-page__add" primary onClick={openModal}>
          Crear nuevo curso
          </Button>
          <h1>Cursos</h1>
        <Tab menu={{ secondary: true, pointing: true }} panes={panels} />
      </div>
      <BasicModal show={showModal} onClose={openModal} title="Crear nuevo usuario">
        <CourseForm close={openModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
