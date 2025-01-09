import React, {useEffect, useState} from 'react';
import { MenuApi } from "../../../../api/indexApi";
import { Loader } from 'semantic-ui-react';
import { map, size } from 'lodash';
import { useAuth } from '../../../../Hooks/useAuth';
import { MenuItem } from '../MenuItem/MenuItem';

const menuController = new MenuApi();

export function ListMenu(props) {

    const { active, onReload, reload } = props;
    const [menus, setMenus] = useState(null);
    const { accessToken } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                setMenus(null);
                const response = await menuController.getAllMenus(accessToken, active);
                setMenus(response);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [active, accessToken, reload]);

    if (!menus) {
        return <Loader active inline="centered"/>
    }

    if (size(menus) === 0) {
        return <h3>No hay menus</h3>
    }

    return ( map(menus, (menu) => (
            <MenuItem key={menu._id} menu={menu} onReload = {onReload} />
            )
        )
    )
}
