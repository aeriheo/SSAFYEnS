import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import styled1 from "styled-components";
import axios from "axios";
import moment from "moment";
import { useUserContext } from "../../context";
import "moment/locale/ko";

const Changeselect = styled1.select`
  width: 15%;
  border: 0px;
  font-size: 36px;
  margin-left: 12px;
  height: 50%;
  display: flex;
  background-color: ${(props) => (props.isdark === true ? "#c9c9c9" : "")};
  align-items: center;
`;
const Changeselect2 = styled1.select`
  width: 15%;
  border: 0px;
  font-size: 36px;
  margin-left: 12px;
  height: 50%;
  display: flex;
  background-color: ${(props) => (props.isdark === true ? "#c9c9c9" : "")};
  align-items: center;
`;
const Changeoption = styled1.option`
  width: 100%;
  background-color: ${(props) => (props.isdark === true ? "#c9c9c9" : "")};
  height: 100%;
`;
const Changecalcon = styled1.div`
  width: auto;
  height: 99.8%;
  flex-wrap: nowrap;
  color: #a3cca3;
  margin: 0px;
  font-size: 20px;
  padding-left:12px;
  padding-right:12px;
  overflow: auto;
`;
const Changeend = styled1.div`
  display: flex;
  justify-content: space-between;
  width: auto;
  align-items: center;
  height: 12%;
  color: white;
  background-color: ${(props) => (props.isdark === true ? "gray" : "#a3cca3")};
  border-radius: 4px;
  margin: 12px 0px;
  padding: 4px;
  padding-right: 3.5%;
  padding-left: 3.5%;
`;
const Btndiv = styled1.div`
  display: flex;
  justify-content: flex-end;
  width: auto;
  align-items: center;
  height: 10%;
  border-radius: 4px;
  margin: 12px 0px;
  padding: 4px;
  padding-left: 3.5%;
`;
const Addbtn = styled1.button`
    background-color: #a3cca3;
    background-color: ${(props) =>
      props.isdark === true ? "gray" : "#a3cca3"};
    color: white;
    border: none;
    border-radius: 8px;
    height:100%;
    width: 150px;
    &:hover{
        background-color: ${(props) =>
          props.isdark === true ? "#c9c9c9" : "#69a569"};
    }
`;
const Changeendtext = styled1.div`
  width: auto;
  height: auto;
`;

const Changecalendarlayout = () => {
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notitime, setNotitime] = useState(null);
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [startarr, setStartarr] = useState([]);
  const [notiarr, setNotiarr] = useState([]);
  const [titlearr, setTitlearr] = useState([]);
  const [contextarr, setContextarr] = useState([]);

  const handlestartChange = (event) => {
    setStarttime(event.target.value);
  };
  const handleendChange = (event) => {
    setEndtime(event.target.value);
  };
  const handledeadChange = (event) => {
    setDeadline(event.target.value);
  };
  const handlenotiChange = (event) => {
    setNotitime(event.target.value);
    if (event.target.value[0] + event.target.value[1] === "??????") {
      setNotitime(null);
    }
  };
  const handletitleChange = (event) => {
    setTitle(event.target.value);
    console.log(event.target.value);
  };
  const handlecontextChange = (event) => {
    setContext(event.target.value);
    console.log(event.target.value);
  };
  const Confirm = async () => {
    const starthour = Number(`${starttime[0]}${starttime[1]}`);
    const startmin = Number(`${starttime[2]}${starttime[3]}`);
    const endhour = Number(`${endtime[0]}${endtime[1]}`);
    const endmin = Number(`${endtime[2]}${endtime[3]}`);
    console.log(notitime);
    if (starthour < endhour) {
      if (window.confirm("??????????????? ??????????")) {
        await axios
          .post(`http://127.0.0.1:4500/schedule`, {
            date: `${moment().format("YYYYMMDD")}`,
            started_at: `${moment().format("YYYYMMDD")} ${
              starttime[0] + starttime[1] + starttime[2] + starttime[3]
            }`,
            finished_at: `${moment().format("YYYYMMDD")} ${
              endtime[0] + endtime[1] + endtime[2] + endtime[3]
            }`,
            deadline_at: `${moment().format("YYYYMMDD")} ${
              deadline[0] + deadline[1] + deadline[2] + deadline[3]
            }`,
            notificationtime: notitime
              ? `${moment().format("YYYYMMDD")} ${
                  notitime[0] + notitime[1] + notitime[2] + notitime[3]
                }`
              : null,
            is_finished: false,
            month: `${moment().format("MM")}`,
            year: `${moment().format("YYYY")}`,
            week: "1",
            point: 0,
            user_id: "wony5248",
            title: title,
            context: context,
          })
          .then(({ data }) => {
            setStarttime(moment(data.started_at).format("YYYYMMDD HHmm"));
          })
          .catch((e) => {});
        window.location.replace(`/Today`);
      } else {
        // console.log("?????? ??????");
      }
    } else if (starthour === endhour && startmin <= endmin) {
      if (window.confirm("??????????????? ??????????")) {
        await axios
          .post(`http://127.0.0.1:4500/schedule`, {
            date: `${moment().format("MMDD")}`,
            started_at: `${moment().format("YYYYMMDD")} ${
              starttime[0] + starttime[1] + starttime[2] + starttime[3]
            }`,
            finished_at: `${moment().format("YYYYMMDD")} ${
              endtime[0] + endtime[1] + endtime[2] + endtime[3]
            }`,
            deadline_at: `${moment().format("YYYYMMDD")} ${
              deadline[0] + deadline[1] + deadline[2] + deadline[3]
            }`,
            notificationtime: `${moment().format("YYYYMMDD")} ${
              notitime
                ? notitime[0] + notitime[1] + notitime[2] + notitime[3]
                : null
            }`,
            is_finished: false,
            month: `${moment().format("MM")}`,
            year: `${moment().format("YYYY")}`,
            week: "1",
            point: 0,
            user_id: "wony5248",
            title: title,
            context: context,
          })
          .then(({ data }) => {
            setStarttime(moment(data.started_at).format("YYYYMMDD HHmm"));
          })
          .catch((e) => {});
        window.location.replace(`/Today`);
      } else {
        // console.log("?????? ??????");
      }
    } else {
      window.alert("?????? ??????????????? ?????? ?????????????????? ????????? ????????? ?????????");
    }
  };
  useEffect(() => {
    setContextarr([
      "??????",
      "?????? ??????",
      "?????? ??????",
      "?????? ??????",
      "?????? ??????",
      "?????? ??????",
      "?????? ??????",
      "?????? ?????? ?????????",
      "?????? ??????",
    ]);
    setTitlearr([
      "??????",
      "??????",
      "??????",
      "??????",
      "??????",
      "??????",
      "??????",
      "??????",
      "??????",
    ]);
    const rendering = () => {
      const result = [];
      const result2 = [];
      result.push("??????");
      result2.push("?????? ??????");
      for (let i = 0; i < 24; i++) {
        if (i < 10) {
          result.push(`0${i}:00`);
          result.push(`0${i}:30`);
        } else {
          result.push(`${i}:00`);
          result.push(`${i}:30`);
        }
      }
      for (let i = 0; i < 24; i++) {
        if (i < 10) {
          result2.push(`0${i}:00`);
          result2.push(`0${i}:30`);
        } else {
          result2.push(`${i}:00`);
          result2.push(`${i}:30`);
        }
      }
      setStartarr(result);
      setNotiarr(result2);
    };

    rendering();
  }, []);
  const { isdarked } = useUserContext();
  return (
    <Changecalcon>
      <Changeend isdark={isdarked}>
        <Changeendtext>?????? ?????? ??????</Changeendtext>
        <Changeselect
          isdark={isdarked}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={starttime}
          onChange={handlestartChange}
        >
          {startarr.map((item) => (
            <Changeoption
              isdark={isdarked}
              value={item[0] + item[1] + item[3] + item[4]}
            >
              {item}
            </Changeoption>
          ))}
        </Changeselect>
      </Changeend>
      <Changeend isdark={isdarked}>
        <Changeendtext>?????? ?????? ??????</Changeendtext>
        <Changeselect
          isdark={isdarked}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={endtime}
          onChange={handleendChange}
        >
          {startarr.map((item) => (
            <Changeoption
              isdark={isdarked}
              value={item[0] + item[1] + item[3] + item[4]}
            >
              {item}
            </Changeoption>
          ))}
        </Changeselect>
      </Changeend>
      <Changeend isdark={isdarked}>
        <Changeendtext>?????? ?????? ??????</Changeendtext>
        <Changeselect
          isdark={isdarked}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={deadline}
          onChange={handledeadChange}
        >
          {startarr.map((item) => (
            <Changeoption
              isdark={isdarked}
              value={item[0] + item[1] + item[3] + item[4]}
            >
              {item}
            </Changeoption>
          ))}
        </Changeselect>
      </Changeend>
      <Changeend isdark={isdarked}>
        <Changeendtext>?????? ?????? ??????</Changeendtext>
        <Changeselect
          isdark={isdarked}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={notitime}
          onChange={handlenotiChange}
        >
          {notiarr.map((item) => (
            <Changeoption
              isdark={isdarked}
              value={item[0] + item[1] + item[3] + item[4]}
            >
              {item}
            </Changeoption>
          ))}
        </Changeselect>
      </Changeend>
      <Changeend isdark={isdarked}>
        <Changeendtext>?????? ??????</Changeendtext>
        <Changeselect
          isdark={isdarked}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={title}
          onChange={handletitleChange}
        >
          {titlearr.map((item) => (
            <Changeoption isdark={isdarked} value={item}>
              {item}
            </Changeoption>
          ))}
        </Changeselect>
      </Changeend>
      <Changeend isdark={isdarked}>
        <Changeendtext>?????? ??????</Changeendtext>
        <Changeselect2
          isdark={isdarked}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={context}
          onChange={handlecontextChange}
        >
          {contextarr.map((item) => (
            <Changeoption isdark={isdarked} value={item}>
              {item}
            </Changeoption>
          ))}
        </Changeselect2>
      </Changeend>
      <Btndiv>
        <Addbtn isdark={isdarked} onClick={() => Confirm()}>
          ????????????
        </Addbtn>
      </Btndiv>
    </Changecalcon>
  );
};

const Create = () => {
  return <Layout pages={Changecalendarlayout()}></Layout>;
};

export default Create;
