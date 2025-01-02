import { useState, useEffect, createContext } from "react";
import { UserApi, AuthApi} from "../api/indexApi";
import { hasExpiredToken } from "../utils/index";

export const AuthContext = createContext(); // create a new context called AuthContext
const userApi = new UserApi();
const authApi = new AuthApi();

// create a new component called AuthProvider.
// This component will provide the AuthContext to all of its children, 
// manage the user state and loading state using the useState hook, 
// provide the login and logout functions to the AuthContext value object,
// and persist the user data in the local storage.

export const AuthProvider = (props) => {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
          const accessToken = authApi.getAccessToken();
          const refreshToken = authApi.getRefreshToken();
    
          if (!accessToken || !refreshToken) {
            logout();
            setLoading(false);
            return;
          }
    
          if (hasExpiredToken(accessToken)) {
            if (hasExpiredToken(refreshToken)) {
              logout();
            } else {
              await reLogin(refreshToken);
            }
          } else {
            await login(accessToken);
          }
    
          setLoading(false);
        })();
      }, []);

      const reLogin = async (refreshToken) => {
        try {
          const { accessToken } = await authApi.refreshAccessToken(
            refreshToken
          );
          authApi.setAccessToken(accessToken);
          await login(accessToken);
        } catch (error) {
          console.error(error);
        }
      };

    const login = async (accessToken) => { // create a login function that takes a user object as an argument
        const response = await userApi.getUser(accessToken);
        delete response.password;
        setUser(response);
        setToken(accessToken);  
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        authApi.removeTokens();
      };

    const value = { accessToken: token, 
                    user, 
                    login, 
                    logout, 
                };

    if (loading) return null;

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}