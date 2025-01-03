import {ENV} from "../utils/index";

export class MenuApi {
    
    async getAllMenus(accessToken, active = undefined) {
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.GETALLMENUS}?active=${active}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        const result = await response.json();
        return result;
    }

    async getMenu(accessToken) {
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.GETMENU}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        return await response.json();
    }

    async updateMenu(accessToken, idMenu, menuData) {
        const data = menuData;
        if (!data.password) {
            delete data.password;
        }
  
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
  
        if (data.fileAvatar) {
            formData.append("avatar", data.fileAvatar);
        }
  
          const url = `${ENV.BASE_API}/${ENV.API_ROUTES.UPDATEMENU}/${idMenu}`;
          const response = await fetch(url, {
              method: "PATCH",
              headers: {
                  authorization: `Bearer ${accessToken}`
              },
              body: formData
          });
          return await response.json();
    }

    async deleteMenu(idMenu, accessToken) {
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.DELETEMENU}/${idMenu}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${accessToken}`
            },
        });
        return await response.json();
    }
}