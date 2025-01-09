import React, {useState} from 'react';
import { Tab, Button } from 'semantic-ui-react';
import "./Menu.scss";
import { ListMenu } from '../../../Components/Admin/Menu/MenuList/ListMenu';
import { BasicModal } from '../../../Components/SharedComponents/BasicModal';
import { MenuForm } from '../../../Components/Admin/Menu/MenuForm/MenuForm';

export function Menu() {

  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const openModal = () => setShowModal(prevState => !prevState);
  const onReload = () => setReload(prevState => !prevState);

const panels = [
  {
    menuItem: 'Menus activos',
    render: () => (
    <Tab.Pane attached={false}>
      <ListMenu active = {true} reload = {reload} onReload = {onReload} />
    </Tab.Pane>
    ),
  },
  {
    menuItem: 'Menus inactivos',
    render: () => (
    <Tab.Pane attached={false}>
      <ListMenu active = {false} reload = {reload} onReload = {onReload} />
    </Tab.Pane>),
  },
]


  return (
    <>
      <div className="menu-page">
        <Button className='menu-page__add' primary onClick={openModal}>
          Agregar menu
          </Button>
        <h1>Menus</h1>
        <Tab menu={{ secondary: true, pointing: true }} panes={panels} />
      </div>
        <BasicModal show={showModal} onClose={openModal} title="Crear nuevo menu">
            <MenuForm close={openModal} onReload={onReload} />
        </BasicModal>
    </>
  )
}
