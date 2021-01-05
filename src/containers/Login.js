import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./Login.css";
import { Button } from "react-bootstrap";
 

export default function Login() {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      const user = await Auth.signIn(fields.email, fields.password);
      console.log(user)
      const credentials = await Auth.currentCredentials();
      console.log(credentials);
      console.log(Auth.essentialCredentials(credentials))
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  async function handleFbSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
    const response = await Auth.federatedSignIn({provider: 'Facebook'});
    console.log(response);
    const credentials = await Auth.currentCredentials();
      console.log(credentials);
      console.log(Auth.essentialCredentials(credentials))
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <Button size="lg" onClick={handleFbSubmit}>Login with FB</Button>
      <br/>
      <Form onSubmit={handleSubmit}>

        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
        
      </Form>
    </div>
  );
}