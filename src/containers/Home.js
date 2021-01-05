import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import "./Home.css";
import { API, Auth } from "aws-amplify";

export default function Home() {
  const [data, setData] = useState([]);
  const callAPIGateway = async () => {
    const customerEmail = "prashantkumarsingh9423@gmail.com"
    const result = await API.get("GoFlexeOrderPlacement", `/customerorder/customer/${customerEmail}`)
    console.log(result);
    setData(result);
    console.log("Set data ato : ", result)
    const credentials = await Auth.currentCredentials();
    console.log(Auth.essentialCredentials(credentials))
  }
  return (
    <div className="Home">
      <div className="lander">
        <h1>GoFlexe</h1>
        <p className="text-muted">Role Based Access Control Experiment</p>

        <Button onClick={() => callAPIGateway()}>Hit Privileged/Protected Rooute</Button>
      </div>
      <div>
        {
          data && data.length ? <div> {
              data.map(
                item => {
                  return <p>{JSON.stringify(item)}</p>
                }
              )
            } </div>: <div/>
        }
      </div>
    </div>
  );
}