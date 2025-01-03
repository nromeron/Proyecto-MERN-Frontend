import React, {useState, useEffect} from 'react'
import { UserApi } from '../../../../api/apiUser';
import { useAuth } from '../../../../Hooks/useAuth';
import { Loader } from 'semantic-ui-react';
import { map, size } from 'lodash';
import { UserItem } from '../UserItem/UserItem';

// Este componente es una lista de usuarios, que muestra un listado de usuarios activos o inactivos
// y se encarga de mostrar un item por cada usuario en la lista
// recibe la propiedad usersActive, que es un booleano que indica si se deben mostrar usuarios activos o inactivos
// y la propiedad reload, que es un booleano que indica si se debe recargar la lista de usuarios
// y la propiedad onReload, que es una función que se ejecuta cuando se recarga la lista de usuarios
// y de cargar la lista de usuarios activos o inactivos

const userController = new UserApi();

export function UserList(props) {
    const {usersActive, reload, onReload} = props; // usersActive es un booleano que indica si se deben mostrar usuarios activos o inactivos
    const [users, setUsers] = useState(null); // users es un array con la lista de usuarios
    const { accessToken } = useAuth(); // accessToken es un string con el token de acceso del usuario

    useEffect(() => {
        (async () => {
            try {
                setUsers(null);
                const response = await userController.getAllUsers(accessToken, usersActive);
                setUsers(response);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [usersActive, accessToken, reload]);

    if (!users) {
        return <Loader active inline="centered"/>
    }
    if (size(users) === 0) {
        return <h3>No hay usuarios</h3>
    }

  return ( map(users, (user) => (
        <UserItem key={user._id} user={user} onReload = {onReload} />
        )
    )
  )
}
