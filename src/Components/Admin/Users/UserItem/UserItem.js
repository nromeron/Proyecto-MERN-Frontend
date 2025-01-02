import React, {useState} from 'react';
import './UserItem.scss';
import { Image, Button, Icon, Confirm } from 'semantic-ui-react';
import { ENV } from '../../../../utils';
import { BasicModal } from '../../../SharedComponents/BasicModal';
import { UsersForm } from '../UserForm/UsersForm';
import { UserApi } from '../../../../api/apiUser';
import { useAuth } from '../../../../Hooks/useAuth';

// este componente es un item de la lista de usuarios, que muestra la información de un usuario
// y permite realizar acciones sobre el mismo, como editar, activar/desactivar y eliminar
// recibe la propiedad user, que es un objeto con la información del usuario a mostrar
// y se encarga de mostrar la información y los botones de acción correspondientes

const userController = new UserApi();

export function UserItem(props) {

    const { user, onReload } = props;
    const { accessToken } = useAuth();


    const [showModal, setShowModal] = useState(false);
    const [titelModal, setTitelModal] = useState("");
    const [confirmMessage, setconfirmMessage] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const openModal = () => setShowModal(prevState => !prevState);
    const openConfirm = () => setShowConfirm(prevState => !prevState);

    const handleEdit = () => {
        setTitelModal(`Editar ${user.firstName}`);
        openModal();
    }

    const openActivationConfirm = () => {
        setIsDelete(false);
        setconfirmMessage(user.active ? `¿Desactivar ${user.firstName}?` : `¿Activar ${user.firstName}?`);
        openConfirm();
    }

    const openDeleteConfirm = () => {
        setIsDelete(true);
        setconfirmMessage(`¿Eliminar ${user.firstName}?`);
        openConfirm();
    }

    const userDelete = async () => {
        try {
            await userController.deleteUser(user._id, accessToken);
            onReload();
            openConfirm();
        } catch (error) {
            console.error(error);
        }
    }

    const userActivation = async () => {
        try {
            await userController.updateUser(accessToken, user._id, {active: !user.active});
            onReload();
            openConfirm();
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <>
    <div className="user-item">
        <div className="user-item__info">
            <Image src={user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` :'https://react.semantic-ui.com/images/avatar/small/matt.jpg'} avatar />
                <div>
                    <p>{user.firstName} {user.lastName}</p>
                    <p>{user.email}</p>
                </div>
        </div>
        <div className="user-item__actions">
            <Button icon primary onClick={handleEdit}>
                <Icon name="pencil alternate" />
            </Button>
            <Button icon color={user.active ? 'orange' : 'teal'} onClick={openActivationConfirm}>
                <Icon name={user.active ? "ban" : "check"} />
            </Button>
            <Button icon color="red" onClick={openDeleteConfirm}>
                <Icon name="trash" />
            </Button>
        </div>
    </div>

    <BasicModal show={showModal} onClose={openModal} title={titelModal}>
        <UsersForm close={openModal} onReload={onReload} user={user} />
    </BasicModal>

    <Confirm open={showConfirm} onCancel={openConfirm} onConfirm={isDelete? userDelete :userActivation } content={confirmMessage} size='mini' />
    </>


  )
}
