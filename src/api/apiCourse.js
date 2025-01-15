import {ENV} from "../utils/index";

export class CourseApi {

    async getAllCourses(accessToken, active = undefined) {
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.GETALLUSERS}?active=${active}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        const result = await response.json();
        return result;
    }

    async getUser(accessToken) {
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.GETUSER}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        return await response.json();
    }

    async updateUser(accessToken, idUser, userData) {
          const data = userData;
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
    
            const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USER}/${idUser}`;
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    authorization: `Bearer ${accessToken}`
                },
                body: formData
            });
            return await response.json();
      }

    async deleteUser(idUser, accessToken) {
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USER}/${idUser}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${accessToken}`
            },
        });
        return await response.json();
    }

    async createUser(accessToken ,data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });

            if (data.fileAvatar) {
                formData.append("avatar", data.fileAvatar);
            }

            const url = `${ENV.BASE_API}/${ENV.API_ROUTES.CREATEUSER}`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${accessToken}`
                },
                body: formData
            });
        return await response.json();

        } catch (error) {   
            throw error;
        }
    }
}