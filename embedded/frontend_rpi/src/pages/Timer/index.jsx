import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { Link } from "react-router-dom";
import axios from "axios";
import Stopwatch from "./Stopwatch";
import Timer from "./Timer";
import styled from "styled-components";
import { useUserContext } from "../../context";
const Timercon = styled.div`
  border-radius: 4px;
  width: auto;
  height: 99.8%;
  color: #121212;
  font-size: 40px;
`;

const Timerlayout = () => {
  const { isdarked } = useUserContext();
  return (
    <Timercon>
      <Stopwatch isdark = {isdarked}/>
      <div><hr className="line" /></div>
      <Timer isdark = {isdarked} />
    </Timercon>
  );
};

const Today = () => {
  return <Layout pages={Todaylayout()}></Layout>;
};

export default Today;
