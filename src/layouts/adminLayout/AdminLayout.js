import React from 'react';
import "./AdminLayout.scss";
import { AdminMenu, Logout } from '../../Components/Admin/AdminLayout/adminLayoutIndex';
import { Icon } from "../../assets/index"

export function AdminLayout(props) {
    const {children} = props;

  return (
    <div className='admin-layout'>
      <div className='admin-layout__sidebar'>
        <Icon.LogoWhite className='logo'/>
        <AdminMenu />
      </div>

      <div className='admin-layout__content'>
        <div className='admin-layout__content-header'>
          <Logout />
        </div>
        <div className='admin-layout__content-main'> 
          { children }
        </div>
      </div>
    </div>
  )
}
