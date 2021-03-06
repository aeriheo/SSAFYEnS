import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import { useUserContext } from "../../context";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import 'moment/locale/ko';
const Changecontainer = styled.div`
  overflow: auto;
  width: auto;
  height: 98.4%;
  margin: 0px;
  padding-top: 14px;
  padding-right: 12px;
  padding-left: 12px;
  padding-bot: 14px;
  font-size: 20px;
`;
const Changetitle = styled.div`
  display: flex-row;
  flex-wrap: no-wrap;
  border-radius: 4px;
  justify-content: space-around;
  color: white;
  width: auto;
  height: 20%;
  background-color: ${(props) => (props.isdark === true ? "gray" : "#a3cca3")};
  margin-bottom: 14px;
  padding: 0px;
`;
const Changetitlenamecon = styled.div`
  width: auto;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 16px;
  padding-top: 4px;
`;
const Changegoal = styled.div`
  width: auto;
  height: 20%;
  display: flex;
  align-items: center;
  margin: 0px 16px;
  padding-top: 4px;
`;

const Changetitlename = styled.div`
  width: 500px;
  height: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  padding-top: 4px;
`;

const Changetitletime = styled.div`
  width: auto;
  height: 100%;
  padding-top: 4px;
`;

const Changechangecon = styled.div`
  width: auto;
  height: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 16px;
`;

const Changechangebtn = styled.button`
  width: 78px;
  height: 60%;
  border-radius: 8px;
  border: 0px;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  background-color: ${(props) =>
    props.isdark === true ? "#424242" : "#69a569"};
  padding: 4px;
`;
const Nodiv = styled.div`
  color : ${props => props.isdark ? "white" : "#121212"}; 
`;

const Changelayout = () => {
  const [itemList, setItemList] = useState([]);
  const Delete = async (props) => {
    const id = props;
    console.log(id)
    if (window.confirm("?????? ??????????????? ??????????")) {
      await axios
        .delete(`http://127.0.0.1:4500/schedule/${id}`)
        .then(({ data }) => {
        })
        .catch((e) => {});
      window.location.replace(`/Change`);
    } else {
    }
  };
  useEffect(() => {
    async function loadCalendar() {
      await axios
        .get(
          `http://127.0.0.1:4500/schedule/getdaily/${moment().format(
            "YYYYMMDD"
          )}`
        )
        .then(({ data }) => {
          setItemList(data);
        })
        .catch((e) => {});
    }
    loadCalendar();
    setInterval(() => {
      loadCalendar();
    }, 60000);

  }, []);
  const { isdarked } = useUserContext();
  return (
    <Changecontainer isdark={isdarked}>
      {itemList.length !== 0 ? (
        <div style={{ height: "100%" }}>
          {" "}
          {itemList.map((item) => (
            <Changetitle isdark={isdarked}>
              <Changetitlenamecon>
                <Changetitlename>?????? ??????</Changetitlename>
                <Changetitletime>
                  {moment(item.started_at).format("HH:mm")} ~ 
                  {moment(item.finished_at).format("HH:mm")}
                </Changetitletime>
              </Changetitlenamecon>
              <Changegoal>{item.title}</Changegoal>
              <Changechangecon>
                <Changetitlename>{item.context}</Changetitlename>
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    alignItems: "center",
                    width: "180px",
                    justifyContent: "space-between",
                  }}
                >
                  <Changechangebtn
                    isdark={isdarked}
                    onClick={() => Delete(item.schedule_id)}
                  >
                    ??????
                  </Changechangebtn>
                  {item.is_finished ? (<div 
                    style = {{display:"flex",justifyContent:"flex-end",width: "120px",fontSize:"16px"}}
                    isdark={isdarked}
                  >
                    ????????? ??????
                  </div>) : (<Changechangebtn
                    isdark={isdarked}
                    onClick={() =>
                      window.location.replace(`/Change/${item.schedule_id}`)
                    }
                  >
                    ??????
                  </Changechangebtn>)}
                </div>
              </Changechangecon>
            </Changetitle>
          ))}
        </div>
      ) : (
        <Nodiv
          isdark={isdarked}
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "40px",
          }}
        >
          ????????? ?????? ????????? ????????????.
        </Nodiv>
      )}
    </Changecontainer>
  );
};

const Change = () => {
  return <Layout pages={Changelayout()}></Layout>;
};

export default Change;
