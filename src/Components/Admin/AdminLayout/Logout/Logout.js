import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useAuth } from "../../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function Logout() {

    const { logout } = useAuth();
    const Navigate = useNavigate();

    const handleLogout = () => {
        logout();
        Navigate("/admin");
    }

  return (
    <div className="logout">
      <Button icon labelPosition="left" color="red" onClick={handleLogout}>
        <Icon name="log out" />
        Cerrar Sesión
      </Button>
    </div>
  );
}