const { validationResult, check, oneOf, body } = require("express-validator");
const { isEmpty } = require("lodash");
const moment = require("moment");
moment.tz.setDefault("Asia/Seoul");

//example

exports.date = check("date")
  .notEmpty()
  .custom((value, { req }) => moment(value).isValid())
  .customSanitizer((value, { req }) => moment(value).startOf("day").toDate());

exports.started_at = check("started_at") //req에 있는 key 중 started_at를 찾아 value를 검사
  .notEmpty() //(validation) empty 값 null, "", false 이면 req에 에러 추가
  .custom((value, { req }) => moment(value).isValid()) // (validation) 반환값이 false면 req에 에러추가
  .custom((value, { req }) => {
    let { started_at, finished_at } = req.body;
    const result =
      moment(started_at).isSame(finished_at, "day") &&
      moment(started_at).diff(finished_at, "second") <= 0;

    // console.log("here : ", moment(started_at).isSame(finished_at, "day"));
    // console.log("here : ", moment(started_at).diff(finished_at, "second") <= 0);
    if (!result)
      throw new Error(
        "started_at과 end_at이 다른 날짜로 작성되었거나 started_at이 finished_at보다 늦게 설정되었습니다."
      );
    else return true;
  }) //started_at과 finished_at 차이가 하루 이상이면 에러

  .customSanitizer((value, { req }) => moment(value).toDate()); //(Sanitization) 입려된 started_at value값을 변조해 반환

exports.finished_at = check("finished_at")
  .notEmpty()
  .custom((value, { req }) => moment(value).isValid())
  .customSanitizer((value, { req }) => moment(value).toDate());

exports.deadline_at = check("deadline_at")
  .notEmpty()
  .custom((value, { req }) => moment(value).isValid())
  .customSanitizer((value, { req }) => moment(value).toDate());
exports.notification = oneOf([
  check("notification")
    .custom((value, { req }) => moment(value).isValid())
    .customSanitizer((value, { req }) =>
      moment(value).isValid() ? moment(value).toDate() : null
    ),
  check("notification").custom((value, { req }) => value == null),
]);
exports.is_finished = check("is_finished").isIn([null, true, false]);
//   check("isfinished").isBoolean(),);
//   .custom((value, { req }) => [null, true, false].indexOf(value) != -1)

exports.month = check("month").customSanitizer(
  (value, { req }) => moment(req.body.started_at).month() + 1
);

exports.week = check("week").customSanitizer((value, { req }) =>
  moment(req.body.started_at).isoWeek()
);

exports.year = check("year").customSanitizer((value, { req }) =>
  moment(req.body.started_at).year()
);
exports.point = check("point").customSanitizer((value, { req }) => 0);
exports.user_id = check("user_id").default("jbj");
