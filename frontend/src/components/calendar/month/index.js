import React, { useState, useEffect } from "react";
import { Grid, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Wrapper from "./styles";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Plan from "../plan";
import { scheduleAPI } from "../../../utils/axios";

const Month = () => {
  const [query, setQuery] = useState("react");
  const [todayPlan, setTodayPlan] = useState({});
  let data = [];
  let history = useHistory();
  const [getMoment, setMoment] = useState(moment());
  const [planOpen, setPlanOpen] = useState(false);

  useEffect(() => {
    let completed = false;

    async function getMonthlySchedule() {
      const result = await scheduleAPI.getMonthly(
        today.format("YYYY"),
        today.format("MM")
      );
      data = result.data;
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (
          today.format("MM-DD") === moment(data[i].started_at).format("MM-DD")
        ) {
          setTodayPlan(data[i]);
        }
      }
    }
    getMonthlySchedule();
    return () => {
      completed = true;
    };
  }, [query]);

  const openPlanModal = () => {
    setPlanOpen(true);
  };

  const closePlanModal = () => {
    setPlanOpen(false);
  };

  const today = getMoment;
  const previousMonth = () => {
    setMoment(getMoment.clone().subtract(1, "month"));
  };

  const nextMonth = () => {
    setMoment(getMoment.clone().add(1, "month"));
  };

  const firstWeek = today.clone().startOf("month").week();
  let lastWeek =
    today.clone().endOf("month").week === 1
      ? 53
      : today.clone().endOf("month").week();

  const weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const weekArr = () => {
    let result = [];
    for (let i = 0; i < weeks.length; i++) {
      result = result.concat(
        <th style={{ background: "#A3CCA3", height: "45px", color: "#ffffff" }}>
          {weeks[i]}
        </th>
      );
    }
    return result;
  };

  const dateArr = () => {
    let result = [];
    let week = firstWeek;
    // firstWeek가 lastWeek보다 큰 경우는 12월만 존재한다.
    if (firstWeek > lastWeek) {
      lastWeek = 53;
    }

    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week}>
          {Array(7)
            .fill(0)
            .map((data, index) => {
              let days = today
                .clone()
                .startOf("year")
                .week(week)
                .startOf("week")
                .add(index, "day");

              if (moment().format("YYYYMMDD") === days.format("YYYYMMDD")) {
                return (
                  <td
                    key={index}
                    style={{
                      color: "#A3CCA3",
                      width: "100px",
                      height: "100px",
                      verticalAlign: "top",
                    }}
                    onClick={() => {
                      history.push({
                        pathname: "/planlist",
                        state: {
                          month: days.format("MM"),
                          day: days.format("DD"),
                        },
                      });
                    }}
                  >
                    <Grid container direction="column">
                      <span>{days.format("D")}</span>
                      <span
                        style={{
                          color: "black",
                          fontSize: 12,
                          marginTop: "3px",
                        }}
                      >
                        {todayPlan["title"]}
                      </span>
                    </Grid>
                  </td>
                );
              } else if (days.format("MM") !== today.format("MM")) {
                return (
                  <td
                    key={index}
                    style={{
                      background: "#D6E6F5",
                      width: "100px",
                      height: "100px",
                      verticalAlign: "top",
                    }}
                  >
                    <span>{days.format("D")}</span>
                  </td>
                );
              } else {
                return (
                  <td
                    key={index}
                    style={{
                      width: "100px",
                      height: "100px",
                      verticalAlign: "top",
                    }}
                    onClick={() => {
                      history.push({
                        pathname: "/planlist",
                        state: {
                          month: days.format("MM"),
                          day: days.format("DD"),
                        },
                      });
                    }}
                  >
                    <Grid container direction="column">
                      <span>{days.format("D")}</span>
                      {/* <span style={{color:'black'}}>title</span> */}
                    </Grid>
                  </td>
                );
              }
            })}
        </tr>
      );
    }
    return result;
  };

  return (
    <Wrapper>
      <Grid container justifyContent="center">
        <Grid container justifyContent="space-around" style={{ width: "20%" }}>
          <Grid item>
            <IconButton onClick={previousMonth}>
              <KeyboardArrowLeftIcon
                fontSize="large"
                style={{ color: "#A3CCA3" }}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <div
              style={{
                background: "#A3CCA3",
                width: "130px",
                height: "30px",
                textAlign: "center",
                paddingTop: "5px",
                marginTop: "10px",
                borderRadius: 45,
                color: "#ffffff",
                fontWeight: "bold",
              }}
            >
              {today.format("YYYY년 MM월")}
            </div>
          </Grid>
          <Grid item>
            <IconButton onClick={nextMonth}>
              <KeyboardArrowRightIcon
                fontSize="large"
                style={{ color: "#A3CCA3" }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{ width: "100%" }}>
        <div style={{ height: "50px", width: "700px", textAlign: "right" }}>
          <React.Fragment>
            <AddCircleIcon
              fontSize="large"
              style={{ color: "#A3CCA3" }}
              onClick={openPlanModal}
            />
            <Plan open={planOpen} close={closePlanModal} />
          </React.Fragment>
        </div>
      </Grid>
      <Grid container justifyContent="center">
        <table style={{ borderStyle: "solid", borderColor: "#A3CCA3" }}>
          <tr>{weekArr()}</tr>
          <tbody>{dateArr()}</tbody>
        </table>
      </Grid>
    </Wrapper>
  );
};

export default Month;
