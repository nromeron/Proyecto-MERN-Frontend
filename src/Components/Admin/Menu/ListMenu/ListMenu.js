import React, {useEffect, useState} from 'react';
import { MenuApi } from "../../../../api/indexApi";
import { Loader } from 'semantic-ui-react';
import { map, size } from 'lodash';
import { useAuth } from '../../../../Hooks/useAuth';

const menuController = new MenuApi();

export function ListMenu(props) {

    const { active } = props;
    const [menus, setMenus] = useState(null);
    const { accessToken } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                const response = await menuController.getAllMenus(accessToken, active);
                setMenus(response);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [active, accessToken]);

    if (!menus) {
        return <Loader active inline="centered"/>
    }

    if (size(menus) === 0) {
        return <h3>No hay menus</h3>
    }

    return ( map(menus, (menu) => (
        //<Menu key={menu._id} menu={menu} />
        <div key={menu._id}>{menu.name }</div>
        
        )
    )
    )
}
