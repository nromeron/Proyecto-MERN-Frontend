import React, {useState} from 'react'
import { MenuApi } from '../../../../api/apiMenu';
import { Button, Confirm } from 'semantic-ui-react';
import { useAuth } from '../../../../Hooks/useAuth';
import { BasicModal } from '../../../SharedComponents/BasicModal';
import { ENV } from '../../../../utils';
import { MenuForm } from '../MenuForm/MenuForm';
import './MenuItem.scss';

// Este componente es un item de la lista de menus, que muestra la información de un menu
// y permite realizar acciones sobre el mismo, como editar, activar/desactivar y eliminar

const menuController = new MenuApi();

export function MenuItem(props) {
    
    const { menu, onReload } = props;
    const { accessToken } = useAuth();
    const [titelModal, setTitelModal] = useState("");
    const [confirmMessage, setconfirmMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDelete, setIsDelete] = useState(false); 

    //console.log("menu", menu);

    const openModal = () => setShowModal(prevState => !prevState);
    const openConfirm = () => setShowConfirm(prevState => !prevState);

    const openActivationConfirm = () => {
        setIsDelete(false);
        setconfirmMessage(menu.active ? `¿Desactivar ${menu.title}?` : `¿Activar ${menu.title}?`);
        openConfirm();
    }

    const openDeleteConfirm = () => {
        setIsDelete(true);
        setconfirmMessage(`¿Eliminar ${menu.title}?`);
        openConfirm();
    }

    const menuDelete = async () => {
        try {
            await menuController.deleteMenu(menu._id, accessToken);
            onReload();
            openConfirm();
        } catch (error) {
            console.error(error);
        }
    }

    const menuActivation = async () => {
        try {
            await menuController.updateMenu(menu._id, accessToken, !menu.active);
            onReload();
            openConfirm();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="menu-item">
            <div className="menu-item__info">
                <span className="menu-item__info-title">{menu.title}</span>
                <span className="menu-item__info-description">{menu.description}</span>
                <span className="menu-item__info-path">{menu.path}</span>
            </div>
            <div className="menu-item__actions">
                <Button primary onClick={openModal}>Editar</Button>
                <Button onClick={openActivationConfirm} color={menu.active ? 'orange' : 'teal'}>{menu.active ? "Desactivar" : "Activar"}</Button>
                <Button onClick={openDeleteConfirm} color='red'>Eliminar</Button>
            </div>

            <BasicModal show={showModal} onClose={openModal} title={titelModal}>
                <MenuForm close={openModal} onReload={onReload} menu={menu} />
            </BasicModal>

            <Confirm open={showConfirm} onCancel={openConfirm} onConfirm={isDelete? menuDelete :menuActivation } content={confirmMessage} size='mini' />
        </div>
        
    )
}