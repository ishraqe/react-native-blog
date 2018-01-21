import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER,
    SIGNUPUSER_USER_FAIL,
    SIGNUPUSER_USER_SUCCESS,
    USERINFO_FETCH_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
    userInfo : null
};

export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case LOGIN_USER:
            console.log(actions);
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            console.log(actions);
            return { ...state, user: actions.payload, ...INITIAL_STATE };
        case LOGIN_USER_FAIL:
            console.log(actions);
            return {
                ...state,
                error: 'Intruder Alert !!',
                password: '',
                loading: false
            };
        case SIGNUP_USER:
            console.log(actions);
            return { ...state, loading: true, error: '' };
        case SIGNUPUSER_USER_SUCCESS:
            console.log(actions);
            return { ...state, user: actions.payload.user, userInfo: actions.payload.userInfo,...INITIAL_STATE };
        case SIGNUPUSER_USER_FAIL:
            console.log(actions);
            return {
                ...state,
                error: 'Sign Up failed !!',
                password: '',
                loading: false
            };
        case USERINFO_FETCH_SUCCESS :
            return { ...state, userInfo: actions.payload, ...INITIAL_STATE };  
        default:
            return state;
    }
};