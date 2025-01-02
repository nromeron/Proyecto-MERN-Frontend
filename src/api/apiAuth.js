import {ENV} from "../utils/index";

export class AuthApi {  
     async register(data) {
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.REGISTER}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    email: data.email,
                    firstName: data.username,
                    password: data.password
                })
        });
        return await response.json();
    }

    async login(data) {
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.LOGIN}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
        });
        return await response.json();
    }

    setAccessToken(token) {
        localStorage.setItem(ENV.JWT.ACCESS, token);
      }
    
      getAccessToken() {
        return localStorage.getItem(ENV.JWT.ACCESS);
      }
    
      setRefreshToken(token) {
        localStorage.setItem(ENV.JWT.REFRESH, token);
      }
    
      getRefreshToken() {
        return localStorage.getItem(ENV.JWT.REFRESH);
      }
    
      removeTokens() {
        localStorage.removeItem(ENV.JWT.ACCESS);
        localStorage.removeItem(ENV.JWT.REFRESH);
      }
}