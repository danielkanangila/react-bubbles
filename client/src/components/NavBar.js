import React from "react";
import styled from 'styled-components';
import { NavLink, Redirect } from "react-router-dom";
import { Container } from "./styled-components";
import SideNav from './SideNav';
import Logo from "./Logo";

const NavBar = () => {
    const logout = e => {
        e.preventDefault()
        localStorage.removeItem("token");
        window.location = "/";
    }
    const openSidenav = () => {
        document.getElementById("mySidenav").style.width = "350px";
    }
    return(
        <div className={!localStorage.getItem('token') ? 'navbar hide' : 'navbar'}>
            <SideNav />
            <Toolbar>
                <Container className="items">
                    <MenuIcon onClick={openSidenav}>
                        <svg focusable="false" aria-label="Open Menu" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 14" height="20" width="28"><path d="M.64,12H16.36c.36,0,.64.43.64,1s-.28,1-.64,1H.64C.28,14,0,13.57,0,13s.28-1,.64-1M23.1,2H.9A.94.94,0,0,1,0,1,.94.94,0,0,1,.9,0H23.1A.94.94,0,0,1,24,1a.94.94,0,0,1-.9,1M.9,8A.94.94,0,0,1,0,7,.94.94,0,0,1,.9,6H23.1A.94.94,0,0,1,24,7a.94.94,0,0,1-.9,1Z" fill="#fff"></path></svg>
                    </MenuIcon>
                    <Logo />
                    <div className="items-right">
                        <NavLink activeClassName="active" onClick={logout} to="/logout">
                        <i className="fas fa-sign-out-alt"></i>
                        </NavLink>
                    </div>
                </Container>
            </Toolbar>
        </div>
    )
}

const Toolbar = styled.nav`
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 900;
    width: 100%;
    height: 55px;
    box-shadow: 1px 1px 10px -1px rgba(0,0,0,5);
    background-color: #212121;
    overflow: hidden;
    h1.logo {
        
    }
    a {
        display: block;
        text-decoration: none;
        color: #fff;
        padding: 18px;
        transition: .3s;
        &:hover, &.active {
            background-color: #fff;
            color: #212121;
        }
    }
    .items {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        &-right {
            @media (min-width: 600px) {
                display: flex
            }
        }
    }
`;

const MenuIcon = styled.div`
    cursor: pointer;
`

export default NavBar;