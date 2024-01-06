

//validate email (RegEx pattern)
export const email_Pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

//access user from localStorage
export const user = JSON.parse(localStorage.getItem('user'))

//access qna from localStorage
export const quesAndAns = JSON.parse(localStorage.getItem('qna'))

//access quesList from localStorage 
export const quesList = JSON.parse(localStorage.getItem('quesList'))