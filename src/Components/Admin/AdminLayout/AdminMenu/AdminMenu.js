import React from 'react'
import { Menu, Icon } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth} from '../../../../Hooks/useAuth';
import "../AdminMenu/AdminMenu.scss"

export  function AdminMenu() {

  const {pathname} = useLocation();
  const {
    user: {role},
  } = useAuth();

  const isAdmin = role === 'admin';

  const isActive = (path) => {
    return pathname === path;
  }

  return (
    <Menu fluid vertical icon text className='admin-menu'>
        {isAdmin && (
            <>
            <Menu.Item as={Link} to='/admin/users' active={isActive('/admin/users')} >
            <Icon name='user outline' />
            usuarios
        </Menu.Item>

        <Menu.Item as={Link} to='/admin/menu' active={isActive('/admin/menu')} >
            <Icon name='bars' />
            Menu
        </Menu.Item>

        <Menu.Item as={Link} to='/admin/courses' active={isActive('/admin/courses')} >
            <Icon name='computer' />
            Cursos
        </Menu.Item>

        <Menu.Item as={Link} to='/admin/newsletter' active={isActive('/admin/newsletter')} >
            <Icon name='mail' />
            newsletter
        </Menu.Item>
            </>
            )}
        <Menu.Item as={Link} to='/admin/blog' active={isActive('/admin/blog')} >
            <Icon name='comment alternate outline' />
            Blog
        </Menu.Item>
    </Menu>        
  )
}
