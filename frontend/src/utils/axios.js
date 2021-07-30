import axios from 'axios';

const request = axios.create({
    baseURL:"http://i5a109.p.ssafy.io:8080"
});

export const scheduleAPI = {
    getMonthly: (year, month)=>{
        return request.get(`/mvp/getMonthly/${year}/${month}`, {
            year, month
        })
    },
    addSchedule:(title, started_at, deadline_at)=>{
        return request.post('/mvp/addSchedule', {
            user_id : 'jbj', date : '2021-07-30', title, context : 'test'
            , started_at, finished_at : '2021-07-31', deadline_at, point : 10, is_finished : false
        })
    }
}