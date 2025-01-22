import {ENV} from "../utils/index";

export class CourseApi {

    async getAllCourses(params) {
        const pageFilter = `page=${params?.page || 1}`;
        const limitFilter = `limit=${params?.limit || 10}`;
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.GETALLCOURSES}?${pageFilter}&${limitFilter}`;
        const response = await fetch(url, {
            method: "GET",
        });
        const result = await response.json();
        return result;
    }

    async getCourse(accessToken) {
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.GETALLCOURSES}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        return await response.json();
    }

    async updateCourse(accessToken, idUser, userData) {
          const data = userData;
    
          const formData = new FormData();
          Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
          });
    
          if (data.fileAvatar) {
            formData.append("avatar", data.fileAvatar);
          }
    
            const url = `${ENV.BASE_API}/${ENV.API_ROUTES.UPDATECOURSE}/${idUser}`;
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    authorization: `Bearer ${accessToken}`
                },
                body: formData
            });
            return await response.json();
      } 

    async deleteCourse(idCourse, accessToken) {
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.DELETECOURSE}/${idCourse}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${accessToken}`
            },
        });
        return await response.json();
    }

    async createCourse(accessToken ,data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });

            if (data.miniature) {
                formData.append("avatar", data.miniature);
            }

            const url = `${ENV.BASE_API}/${ENV.API_ROUTES.CREATECOURSE}`;
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