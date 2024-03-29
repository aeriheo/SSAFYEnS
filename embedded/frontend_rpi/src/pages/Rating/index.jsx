import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import styled1 from "styled-components";
import Ratingstar from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import "moment/locale/ko";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import { useUserContext } from "../../context";
const StyledRating = withStyles({
  iconFilled: {
    color: "#f6f924",
  },
  iconHover: {
    color: "#f6f924",
  },
})(Ratingstar);
const GreenRadio = withStyles({
  root: {
    color: `${(props) => (props.isdark === true ? "gray" : "#a3cca3")}`,
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);
const Starttime = styled1.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  width: auto;
  height: 5%;
  color: white;
  background-color: ${(props) => (props.isdark === true ? "gray" : "#a3cca3")};
  margin: 12px 0px;
  padding: 4px;
  padding-left:16px;
  padding-right:16px;
`;
const Endtime = styled1.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  width: auto;
  height: 5%;
  color: white;
  background-color: ${(props) => (props.isdark === true ? "gray" : "#a3cca3")};
  margin: 12px 0px;
  padding: 4px;
  padding-left:16px;
  padding-right:16px;
`;
const Ratingbody = styled1.div`
  display: flex-row;
  justify-content: space-between;
  border-radius: 4px;
  width: auto;
  height: 80%;
  color: white;
  background-color: ${(props) => (props.isdark === true ? "gray" : "#a3cca3")};
  margin-top: 12px;
  padding: 4px;
  padding-left:16px;
  padding-right:16px;
`;
const Ratingcontent = styled1.div`
  display: flex-row;
  border-radius: 4px;
  width: auto;
  height: 80%;
  color: black;
  background-color: ${(props) => (props.isdark === true ? "#C9C9C9" : "white")};
  font-size: 20px;
  overflow: auto;
  margin-top: 12px;
  padding-top: 5px;
  padding-left:16px;
  padding-right:16px;
`;
const Ratingquestiontitle = styled1.div`
  width: auto;
  margin-bottom:8px;
  height: auto;

`;
const Ratingquestion = styled1.div`
  width: auto;
  margin-bottom:5px;
  height: auto;

`;
const Ratingbtncon = styled1.div`
  width: auto;
  display: flex;
  align-items: center;
  height: auto;
  border-radius: 8px;
  border: 0px;
  color: white;
`;
const Ratingbtn = styled1.button`
  width: 78px;
  height: 60px;
  border-radius: 8px;
  border: 0px;
  cursor: pointer;
  color: white;
  background-color: ${(props) =>
    props.isdark === true ? "#424242" : "#69a569"};
  padding: 4px;
  margin-left:16px;
`;
const Ratingstarcon = styled1.div`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  width: auto;
  height: auto;
  color: white;
  margin-top: 4%;
  padding: 4px;
`;

const Ratingcon = styled1.div`
  width: auto;
  font-size: 20px;
  height: 99.8%;
  display: flex-row;
  flex-wrap: nowrap;
  color: #a3cca3;
  margin: 0px;
  padding-left:12px;
  padding-right:12px;
  overflow: auto;
`;

const Changestarttext = styled1.div`
  width: auto;
  height: auto;
  color: white;
  align-items: center;
`;

const Changeendtext = styled1.div`
  width: auto;
  height: auto;
  color: white;
`;

const Ratinglayout = (props) => {
  const [selectedValue1, setSelectedValue1] = React.useState("1");
  const [selectedValue2, setSelectedValue2] = React.useState("1");
  const [selectedValue3, setSelectedValue3] = React.useState("1");
  const [selectedValue4, setSelectedValue4] = React.useState("1");
  const [notitime, setNotitime] = useState("");
  const [starttime, setStarttime] = useState("");
  const [deadline, setDeadline] = useState("");
  const [context, setContext] = useState("");
  const { id } = props;
  const [temp, setTemp] = useState(0);
  const [humid, setHumid] = useState(0);
  const [noise, setNoise] = useState(0);
  const [light, setLight] = useState(0);

  const Confirm = async () => {
    const string = `집중점수 :${Number(selectedValue1) * 20} 점 진행점수 :${
      Number(selectedValue2) * 20
    } 점 달성점수 :${Number(selectedValue3) * 20} 점 환경점수 :${
      Number(selectedValue4) * 20
    } 점`;
    const starthour = Number(`${starttime[9]}${starttime[10]}`);
    const startmin = Number(`${starttime[11]}${starttime[12]}`);
    const endhour = Number(
      `${moment().format("YYYYMMDD HHmm")[9]}${
        moment().format("YYYYMMDD HHmm")[10]
      }`
    );
    const endmin = Number(
      `${moment().format("YYYYMMDD HHmm")[11]}${
        moment().format("YYYYMMDD HHmm")[12]
      }`
    );
    if (starthour <= endhour && startmin <= endmin) {
      if (window.confirm("정말 완료하시겠 습니까?")) {
        await axios
          .put(`http://127.0.0.1:4500/schedule/${id}`, {
            date: `${moment().format("YYYYMMDD")}`,
            started_at: starttime,
            finished_at: moment().format("YYYYMMDD HHmm"),
            deadline_at: deadline,
            notificationtime: notitime ? notitime : null,
            notification: null,
            is_finished: true,
            context: `${context} ${string}`,
            point:
              ((Number(selectedValue1) +
                Number(selectedValue2) +
                Number(selectedValue3) +
                Number(selectedValue4)) /
                4) *
              20,
            humidity: humid,
            illuminance: light,
            noise: noise,
            temperature: temp,
          })
          .then(({ data }) => {})
          .catch((e) => {});
        window.location.replace(`/Today`);
      } else {
        // console.log("변화 없음");
      }
    } else {
      window.alert(
        "일정 종료 시간이 시작시간 보다 빠릅니다. 일정 변경에서 시작시간을 변경하여 주세요"
      );
    }
  };

  const Cancel = () => {
    if (window.confirm("정말 취소하시겠 습니까?")) {
      window.location.replace(`/Today`);
    } else {
      // console.log("변화 없음");
    }
  };

  useEffect(() => {
    async function loadSensor() {
      await axios
        .get("http://127.0.0.1:4500/sensor")
        .then(({ data }) => {
          setTemp(data.temp);
          setNoise(data.noise);
          setHumid(data.humid);
          setLight(data.light);
        })
        .catch((e) => {
          console.error(e);
        });
    }

    async function loadCalendar() {
      await axios
        .get(`http://127.0.0.1:4500/schedule/${id}`)
        .then(({ data }) => {
          setStarttime(moment(data.started_at).format("YYYYMMDD HHmm"));
          setDeadline(moment(data.deadline_at).format("YYYYMMDD HHmm"));
          if (data.notificationtime) {
            setNotitime(moment(data.notificationtime).format("YYYYMMDD HHmm"));
          }
          setContext(data.context);
        })
        .catch((e) => {});
    }
    loadCalendar();
    loadSensor();
    setInterval(() => {
      loadSensor();
    }, 60000);
    console.log("ASDFASD");
  }, []);
  const handleChange1 = (event) => {
    setSelectedValue1(event.target.value);
  };
  const handleChange2 = (event) => {
    setSelectedValue2(event.target.value);
  };
  const handleChange3 = (event) => {
    setSelectedValue3(event.target.value);
  };
  const handleChange4 = (event) => {
    setSelectedValue4(event.target.value);
  };
  const { isdarked } = useUserContext();
  return (
    <Ratingcon>
      <Starttime isdark={isdarked}>
        <Changestarttext>일정 시작 시간</Changestarttext>
        <Changestarttext>{moment(starttime).format("HH : mm")}</Changestarttext>
      </Starttime>
      <Endtime isdark={isdarked}>
        <Changeendtext>일정 종료 시간</Changeendtext>
        <Changeendtext>{moment().format("H : mm")}</Changeendtext>
      </Endtime>
      <Ratingbody isdark={isdarked}>
        <Ratingcontent isdark={isdarked}>
          <Ratingquestiontitle>일정 평가</Ratingquestiontitle>
          <Ratingquestion>
            1. 유해물질 탐지 시간이 일정 진행시간의 몇 %인가요?
          </Ratingquestion>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="detect"
              value={selectedValue1}
              onChange={handleChange1}
            >
              <FormControlLabel
                value="1"
                control={<GreenRadio isdark={isdarked} />}
                label="80%이상 100%이하"
              />
              <FormControlLabel
                value="2"
                control={<GreenRadio isdark={isdarked} />}
                label="60% 이상 80% 이하"
              />
              <FormControlLabel
                value="3"
                control={<GreenRadio isdark={isdarked} />}
                label="40% 이상 60% 이하"
              />
              <FormControlLabel
                value="4"
                control={<GreenRadio isdark={isdarked} />}
                label="20% 이상 40% 이하"
              />
              <FormControlLabel
                value="5"
                control={<GreenRadio isdark={isdarked} />}
                label="0% 이상 20% 이하"
              />
            </RadioGroup>
          </FormControl>

          <Ratingquestion>
            2. 일정 진행시간이 원래 일정 진행시간의 몇 %인가요?
          </Ratingquestion>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              value={selectedValue2}
              onChange={handleChange2}
            >
              <FormControlLabel
                value="1"
                control={<GreenRadio isdark={isdarked} />}
                label="0%이상 20%이하"
              />
              <FormControlLabel
                value="2"
                control={<GreenRadio isdark={isdarked} />}
                label="20% 이상 40% 이하"
              />
              <FormControlLabel
                value="3"
                control={<GreenRadio isdark={isdarked} />}
                label="40% 이상 60% 이하"
              />
              <FormControlLabel
                value="4"
                control={<GreenRadio isdark={isdarked} />}
                label="60% 이상 80% 이하"
              />
              <FormControlLabel
                value="5"
                control={<GreenRadio isdark={isdarked} />}
                label="80% 이상 100% 이하"
              />
            </RadioGroup>
          </FormControl>
          <Ratingquestion>3. 일정 목표의 몇 %를 달성하셨나요?</Ratingquestion>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              value={selectedValue3}
              onChange={handleChange3}
            >
              <FormControlLabel
                value="1"
                control={<GreenRadio isdark={isdarked} />}
                label="0%이상 20%이하"
              />
              <FormControlLabel
                value="2"
                control={<GreenRadio isdark={isdarked} />}
                label="20% 이상 40% 이하"
              />
              <FormControlLabel
                value="3"
                control={<GreenRadio isdark={isdarked} />}
                label="40% 이상 60% 이하"
              />
              <FormControlLabel
                value="4"
                control={<GreenRadio isdark={isdarked} />}
                label="60% 이상 80% 이하"
              />
              <FormControlLabel
                value="5"
                control={<GreenRadio isdark={isdarked} />}
                label="80% 이상 100% 이하"
              />
            </RadioGroup>
          </FormControl>
          <Ratingquestion>4. 오늘의 공부 환경은 어떠하였나요?</Ratingquestion>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              value={selectedValue4}
              onChange={handleChange4}
            >
              <FormControlLabel
                value="1"
                control={<GreenRadio isdark={isdarked} />}
                label="매우 별로였다."
              />
              <FormControlLabel
                value="2"
                control={<GreenRadio isdark={isdarked} />}
                label="별로였다."
              />
              <FormControlLabel
                value="3"
                control={<GreenRadio isdark={isdarked} />}
                label="그저 그랬다."
              />
              <FormControlLabel
                value="4"
                control={<GreenRadio isdark={isdarked} />}
                label="좋았다."
              />
              <FormControlLabel
                value="5"
                control={<GreenRadio isdark={isdarked} />}
                label="매우 좋았다."
              />
            </RadioGroup>
          </FormControl>
        </Ratingcontent>
        <Ratingstarcon>
          <StyledRating
            name="customized-empty"
            value={
              (Number(selectedValue1) +
                Number(selectedValue2) +
                Number(selectedValue3) +
                Number(selectedValue4)) /
              4
            }
            size="large"
            precision={0.25}
            readOnly
          />
          <Ratingbtncon>
            <Ratingbtn isdark={isdarked} onClick={() => Cancel()}>
              취소
            </Ratingbtn>
            <Ratingbtn isdark={isdarked} onClick={() => Confirm()}>
              완료
            </Ratingbtn>
          </Ratingbtncon>
        </Ratingstarcon>
      </Ratingbody>
    </Ratingcon>
  );
};
const Rating = ({ match }) => {
  const { id } = match.params;
  return <Layout pages={Ratinglayout({ id })}></Layout>;
};

export default Rating;
