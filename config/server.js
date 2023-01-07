const BASE_URL = 'http://localhost:8000/api'

export const ADMIN_ATTENDANCE_URL = BASE_URL + '/admin/attendance';

export const ADMIN_REGISTER_URL = BASE_URL + '/admin/register';

export const ADMIN_LOGIN_URL = BASE_URL + '/admin/login';

export const CLOCK_IN_URL = BASE_URL + '/user/clock_in';

export const CLOCK_OUT_URL = BASE_URL + '/user/clock_out';

export const GET_ALL_ATTENDANCE_URL = (id) => BASE_URL + `/user/fetch_attendance/${id}`;

export const GET_PRESENT_ATTENDANCE_URL = (id) => BASE_URL + `/user/fetch_present_attendance/${id}`;

export const REGISTER_COURSE_URL = (id) => BASE_URL + `/user/add_course/${id}`;

export const COURSES_URL = BASE_URL + '/user/courses';

export const USER_COURSES_URL = BASE_URL + '/user/user_course';

export const LOGIN_URL = BASE_URL + '/user/login';

export const REGISTER_URL = BASE_URL + '/user/register';
