import React from "react";
import Leftsidecontainer from "./styles";
import styled from "styled-components";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import TimerIcon from "@material-ui/icons/Timer";
import { useUserContext } from "../../context";
const Leftsidebtn = styled.button`
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  padding: 0 15px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0px;
  color: ${(props) => (props.isdark === true ? "white" : "#424242")};
  background-color: ${(props) => (props.isdark === true ? "#424242" : "white")};
  font-size: 20px;
  border: ${(props) =>
    props.isdark === true ? "1px solid gray" : "1px solid #a3cca3"};
  cursor: pointer;
  &:active {
    background-color: ${(props) =>
      props.isdark === true ? "gray" : "#a3cca3"};
    color: white;
  }
`;

function Leftsidebar() {
  const { isdarked } = useUserContext();
  return (
    <Leftsidecontainer>
      <Leftsidebtn
        isdark={isdarked}
        onClick={() => window.location.replace(`/Progress`)}
      >
        <CalendarTodayIcon fontSize="large" />
        진행중인 일정
      </Leftsidebtn>
      <Leftsidebtn
        isdark={isdarked}
        onClick={() => window.location.replace(`/Today`)}
      >
        <EventAvailableIcon fontSize="large" />
        오늘 일정
      </Leftsidebtn>
      <Leftsidebtn
        isdark={isdarked}
        onClick={() => window.location.replace(`/Streaming`)}
      >
        <OndemandVideoIcon fontSize="large" />
        모니터링
      </Leftsidebtn>
      <Leftsidebtn
        isdark={isdarked}
        onClick={() => window.location.replace(`/Timer`)}
      >
        <TimerIcon fontSize="large" />
        <div>
          <div>타이머/</div> <div>스탑워치</div>
        </div>
      </Leftsidebtn>
    </Leftsidecontainer>
  );
}

export default Leftsidebar;
