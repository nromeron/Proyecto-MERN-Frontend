import React, {useState} from "react";
import {RegisterForm, LoginForm} from "../../../Components/Admin/Auth/indexAuth";
import { Icon } from "../../../assets";
import { Tab } from "semantic-ui-react";
import "./Auth.scss";

export function AdminAuth(){ 

    const [activeIndex, setActiveIndex] = useState(0);
    const openLogin = () => setActiveIndex(0);

    const panes = [
        {
            menuItem: "Login",
            render: () => (
            <Tab.Pane>
                <h2><LoginForm/></h2>
            </Tab.Pane>
            )
        },
        {
            menuItem: "Registro",
            render: () => (
            <Tab.Pane>
                <RegisterForm openLogin = {openLogin} />
            </Tab.Pane>
            )
        },
    ]

    return(
        <div className="auth">
            <Icon.LogoWhite className="auth__logo"/>
            <Tab className="auth__forms" panes={panes} activeIndex={activeIndex} onTabChange={(_, data) => (setActiveIndex(data.activeIndex))}/>
        </div>
    )
}
