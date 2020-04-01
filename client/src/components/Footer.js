import React from 'react';
import styled from 'styled-components';
import { Container } from './styled-components';

const Footer = () => {
    return(
        <Wrapper show={localStorage.getItem('token') ? true : false}>
            <Container>
            
                <p>Sprint Challenge: Advanced Web Applications - React Bubbles - Marsh 2020</p>
                <p>Advanced Web Application</p>
                <p>By Kabandangi Kanangila - WEBPT12</p>
                <a href="https://github.com/danielkanangila/react-bubbles/tree/kabandangi-kanangila">
                    <i className="fab fa-github-square"></i>
                    Project Repository
                </a> 
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    ${props => props.show ? `display: block;` : 'display: none;'}
    width: 100;
    background-color: #212121;
    color: #fff;
    padding: 50px 0;
    text-align: center;
    p {
        line-height: 1.5;
        &:first-child {
            font-size: 1.4rem
        }
    }
    a {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        margin-top: 8px;
        i {
            font-size: 2rem;
            margin-right: 10px;
        }
    }
`;

export default Footer;