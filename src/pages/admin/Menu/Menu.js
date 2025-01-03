import React, {} from 'react';
import { Tab, Button } from 'semantic-ui-react';
import "./Menu.scss";
import { ListMenu } from "../../../Components/Admin/Menu/ListMenu/ListMenu";

export function Menu() {

const panels = [
  {
    menuItem: 'Menus activos',
    render: () => (
    <Tab.Pane attached={false}>
      <ListMenu active = {true} />
    </Tab.Pane>
    ),
  },
  {
    menuItem: 'Menus inactivos',
    render: () => (
    <Tab.Pane attached={false}>
      <ListMenu active = {false} />
    </Tab.Pane>),
  },
]


  return (
    <>
      <div className="menu-page">
        <Button className='menu-page__add' primary >
          Agregar menu
          </Button>
        <h1>Menus</h1>
        <Tab menu={{ secondary: true, pointing: true }} panes={panels} />
      </div>
    </>
  )
}
