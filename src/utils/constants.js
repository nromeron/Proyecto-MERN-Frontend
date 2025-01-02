const SERVER_IP = 'http://localhost:3977';

export const ENV = {
    BASE_PATH: `${SERVER_IP}`,
    BASE_API: `${SERVER_IP}/api/v1`,
    API_ROUTES:{
        REGISTER: "auth/register",
        LOGIN: "auth/login",
        GETUSER: "/user/me",
        CREATEUSER: "/user/createUser",
        GETALLUSERS: "/user/all",
        USER: "user",
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh"
    }
};
