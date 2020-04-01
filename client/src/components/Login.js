import React, {useState} from "react";
import axios from 'axios';
import styled from 'styled-components';
import { StyledForm, Error } from './styled-components';
import Logo from './Logo';
import {API_URL} from '../utils';

const Login = () => {
  const [credentials, setCredentials] = useState({
      username: "",
      password: ""
  });
  const [errors, setErrors] = useState(null);

  const handleChange = e => {
      setCredentials({
          ...credentials,
          [e.target.name]: e.target.value.trim()
      })
  };
  const handleLogin = e => {
    e.preventDefault();
    if (credentials.username === "" && credentials.password === "") {
        setErrors({
            message: "Bad credentials. Username and password are required."
        })
        return;
    }
    axios.post(`${API_URL}/login`, credentials)
      .then(res => {
            localStorage.setItem("token", res.data.payload);
            window.location = "/bubbles";
        })
        .catch(err => setErrors({
            message: err.response.data.error || err.message
        }));
  }; 
  return (
    <Wrapper>
      <Logo />
      <StyledForm onSubmit={handleLogin}>
            <h1>Sign in</h1>
            {errors && <Error>{errors.message}</Error>}
            <input type="text" name="username" onChange={handleChange} value={credentials.username} placeholder="Username" />
            <input type="password" name="password" onChange={handleChange} value={credentials.password} placeholder="Password" />
            <button color="primary" type="submit">Sign in</button>
        </StyledForm>
        <div className="credentials">
                <h6>Default credentials</h6>
                <div>
                  <p>Username: LambdaSchool</p>
                  <p>Password: {'i<3Lambd4'}</p>
                </div>
          </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  top: 25px;
  @media (min-width: 600px) {
      top: 80px
  }
  h1 {
      text-align: center;
      color: #212121;
      padding: 0;
  }
  form {
    display:block;
    margin: 0 auto;
    width: 95%;
    border-radius: 5px;
    max-width: 450px;
  }
  h6 {
    margin: 0;
    padding: 0;
    font-size: 1rem;
  }
  .credentials {
    text-align: center;
    color: #0091ea;
    margin: 15px 0 30px;
    div {
      display: flex;
      justify-content: center;
      p {
        margin: 5px 0 0;
        padding: 0;
        margin-right: 15px;
        font-size: 0.8rem;
      }
    }
  }
`

export default Login;
