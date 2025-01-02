import React, {useState} from 'react';
import { Button, Tab } from 'semantic-ui-react';
import "./Users.scss";
import { BasicModal } from '../../../Components/SharedComponents/BasicModal';
import { UsersForm, UserList } from '../../../Components/Admin/Users/userIndex';

// este componente es la página de usuarios, que muestra un listado de usuarios activos e inactivos
// y permite agregar nuevos usuarios se encarga de mostrar un modal con el formulario de creación de usuarios
// y de mostrar un tab con dos paneles, uno para usuarios activos y otro para usuarios inactivos

export function Users() {

  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const openModal = () => setShowModal(prevState => !prevState);
  const onReload = () => setReload(prevState => !prevState);

  const panels = [
    {
      menuItem: 'Usuarios activos',
      render: () => (
      <Tab.Pane attached={false}>
        <UserList usersActive={true} reload = {reload} onReload = {onReload} />
      </Tab.Pane>
      ),
    },
    {
      menuItem: 'Usuarios inactivos',
      render: () => (
      <Tab.Pane attached={false}>
        <UserList usersActive={false} reload = {reload} onReload = {onReload}/>
      </Tab.Pane>),
    },
  ]
  return (
    <>
      <div className="users-page">
        <Button className='users-page__add' primary onClick={openModal}>
          Agregar usuario
          </Button>
        <h1>Usuarios</h1>
        <Tab menu={{ secondary: true, pointing: true }} panes={panels} />
      </div>

      <BasicModal show={showModal} onClose={openModal} title="Crear nuevo usuario">
        <UsersForm close={openModal} onReload={onReload} />
      </BasicModal>
    </>
  )
}
