import React, {useState, useEffect} from 'react'
import { UserApi } from '../../../../api/apiUser';
import { useAuth } from '../../../../Hooks/useAuth';
import { Loader } from 'semantic-ui-react';
import { map, size } from 'lodash';
import { UserItem } from '../UserItem/UserItem';

const userController = new UserApi();

export function UserList(props) {
    const {usersActive, reload, onReload} = props;
    const [users, setUsers] = useState(null);
    const { accessToken } = useAuth();

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
