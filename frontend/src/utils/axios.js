import axios from "axios";

const request = axios.create({
  baseURL:"http://i5a109.p.ssafy.io:8079",
//   baseURL: "http://127.0.0.1:8079",
  headers: {
    "content-type": "application/json;charset=UTF-8",
  },
});

export const scheduleAPI = {
    getMonthly: (date)=>{
        return request.get(`/schedule/month/${date}`, {
            date
        },{
            headers:{
                access_token: window.sessionStorage.getItem('token')
            }
        })
    },
    addSchedule:(title, started_at, deadline_at, date, notification)=>{
        return request.post('/schedule', {
           date , title, context : 'test', started_at, deadline_at, notification, finished_at:deadline_at
        }
        ,{
            headers:{
                access_token: window.sessionStorage.getItem('token')
            }
        }
        )
    },
    modifySchedule:(schedule_id, date, title, notification, started_at, deadline_at, finished_at)=>{
        // console.log(`${title}, ${notification}`);
        return request.put(`/schedule/${schedule_id}`,{
            schedule_id, date, title, started_at, deadline_at, finished_at, notification
        },{
            headers:{
                access_token: window.sessionStorage.getItem('token')
            }
        })
    },
    deleteSchedule:(schedule_id)=>{
        return request.delete(`/schedule/${schedule_id}`,{
            schedule_id
        },{
            headers:{
                access_token: window.sessionStorage.getItem('token')
            } 
        })
    },
    getSchedule:(schedule_id) =>{
        return request.get(`/schedule/${schedule_id}`,{
            schedule_id
        },{
            headers:{
                access_token: window.sessionStorage.getItem('token')
            }
        })
    },
    getDailyAverage:(date)=>{
        return request.get(`/average/daily/${date}`,{
            date
        },{
            headers:{
                access_token: window.sessionStorage.getItem('token')
            }
        })
    },
    getWeeklyAverage:(year, week)=>{
        return request.get(`/average/weekly/${year}/${week}`,{
            year, week
        },{
            headers:{
                access_token: window.sessionStorage.getItem('token')
            }
        })
    },
    getMonthlyAverage:(date)=>{
        return request.get(`/average/monthly/${date}`,{
            date
        },{
            headers:{
                access_token: window.sessionStorage.getItem('token')
            }
        })
    }
};

export const userAPI = {
    login: (id, password) =>{
        return request.post('/user/login', { 
            user_id:id, password
        }).then(response=>{
            const access_token = response.data.access_token;
            window.sessionStorage.setItem('token', access_token);
        }).catch(error=>{
            console.log(error);
        })
    },
    checkUserId: (id)=>{
        return request.get(`/user/duplicatecheckid/${id}`,{
            user_id: id
        })
    },
    checkUserPhone: (number)=>{
        return request.get(`/user/duplicatecheckcellphone/${number}`,{
            cellphone: number
        })
    },
    checkUserEmail: (email)=>{
        return request.get(`/user/duplicatecheckemail/${email}`,{
            email
        })
    },
    addUser:(id, name, email, number, password)=>{
        return request.post(`/user`,{
            user_id: id, name, email, cellphone:number, password
        })
    },
    mypage: (user_id)=>{
        return request.get(`/user/${user_id}`,{
            user_id
        },{
            headers:{
                access_token : window.sessionStorage.getItem('token')
            } 
        }).catch(e=>{
            console.log(e);
        })
    },
    logout:()=>{
        return request.get(`/user/logout`,{
            headers:{
                access_token : window.sessionStorage.getItem('token')
            }
        })
    },
    findId: (name, email)=>{
        return request.get(`/user/id`,{
            name, email
        })
    },
    findPw: (name, id, email)=>{
        return request.get('/user/password',{
            name, user_id:id, email
        })
    },
    resetPw:(id, password)=>{
        return request.put('/user/password',{
            user_id:id, password
        })
    },
    getTrophy:(user_id)=>{
        return request.get(`/user/${user_id}/trophy`,{
            user_id
        },{
            headers:{
                access_token : window.sessionStorage.getItem('token')
            }
        }
        )
    },
    modifyUser:(user_id, name, email, cellphone, password)=>{
        return request.put(`/user/${user_id}`,{
            user_id, name, email, cellphone, password
        },{
            headers:{
                access_token : window.sessionStorage.getItem('token')
            }
        })
    }
}

export const groupAPI = {
  addGroup: (name, context) => {
    return request.post(
      "/group",
      {
        name,
        context,
      },
      { headers: { access_token: window.sessionStorage.getItem("token") } }
    );
  },
  validateGroupName: (name) => {
    return request.post(
      `/group/namevalidation`,
      {
        name,
      },
      { headers: { access_token: window.sessionStorage.getItem("token") } }
    );
  },
  findAllGroup: () => {
    return request.post(`/group/search`, {
      q: "",
    });
  },
  getGroup: (groupid) => {
    return request.get(`/group/${groupid}`, {
      headers: { access_token: window.sessionStorage.getItem("token") },
    });
  },
  updateGroup: (groupid, title, content) => {
    return request.put(
      `/group/${groupid}`,
      { name: title, context: content },
      { headers: { access_token: window.sessionStorage.getItem("token") } }
    );
  },
  deleteGroup: (groupid) => {
    return request.delete(`/group/${groupid}`, {
      headers: { access_token: window.sessionStorage.getItem("token") },
    });
  },
  searchGroup: (question) => {
    return request.post(
      `/group/search`,
      {
        q: question,
      },
      { headers: { access_token: window.sessionStorage.getItem("token") } }
    );
  },
  // 그룹 가입 신청 목록
  applicantListGroup: (groupid) => {
    return request.get(`/group/${groupid}/applicant`, {
      headers: { access_token: window.sessionStorage.getItem("token") },
    });
  },
  // 그룹 가입 신청
  applicantGroup: (groupid, reas) => {
    return request.post(
      `/group/${groupid}/applicant`,
      {
        reason: reas,
      },
      { headers: { access_token: window.sessionStorage.getItem("token") } }
    );
  },
  // 그룹 가입 신청 거절? 취소?
  rejectGroup: (groupid) => {
    return request.delete(`/group/${groupid}/applicant`, {
      headers: {
        access_token: window.sessionStorage.getItem("token"),
      },
    });
  },
  // 그룹 신청 승인
  joinGroup: (groupid, userid) => {
    return request.post(`/group/${groupid}/applicant/${userid}`, {
      headers: {
        access_token: window.sessionStorage.getItem("token"),
      },
    });
  },
  //그룹 신청
  exileGroup: (groupid, userid) => {
    return request.delete(`/group/${groupid}/applicant${userid}`, {
      headers: {
        access_token: window.sessionStorage.getItem("token"),
      },
    });
  },
};
