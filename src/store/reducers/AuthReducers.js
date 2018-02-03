import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER,
    SIGNUPUSER_USER_FAIL,
    SIGNUPUSER_USER_SUCCESS,
    USERINFO_FETCH_SUCCESS,
    USER_LOG_OUT,
    UPDATE_USER_NAME,
    UPDATE_USER_NAME_SUCCESS,
    UPDATE_USER_EMAIL,
    UPDATE_USER_EMAIL_SUCCESS,
    UPDATE_USER_EMAIL_FAIL,
    UPDATE_USER_PASSWORD,
    UPDATE_USER_PASSWORD_FAIL,
    UPLOAD_PROFILE_IMAGE,
    UPLOAD_PROFILE_IMAGE_FAIL,
    UPLOAD_PROFILE_IMAGE_SUCCESS
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
            console.log(actions );
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            console.log(actions);
            return { ...state, user: actions.payload, loading:  false};
        case LOGIN_USER_FAIL:
            console.log(actions);
            return {
                ...state,
                error: 'Intruder Alert !!',
                password: '',
                loading: false
            };
        case USER_LOG_OUT: 
            console.log(actions);
            return { ...state, ...INITIAL_STATE };
                
        case SIGNUP_USER:
            console.log(actions);
            return { ...state, loading: true, error: '' };
        case SIGNUPUSER_USER_SUCCESS:
            console.log(actions);
            return { ...state, user: actions.payload.user};
        case SIGNUPUSER_USER_FAIL:
            console.log(actions);
            return {
                ...state,
                error: 'Sign Up failed !!',
                password: '',
                loading: false
            };
        case USERINFO_FETCH_SUCCESS :
            console.log(actions);
            return { ...state, userInfo: actions.payload}; 
        case UPDATE_USER_NAME: 
            console.log(actions);
            return {...state}
        case UPDATE_USER_NAME_SUCCESS: 
        console.log(actions);
            return {...state}
        case UPDATE_USER_EMAIL:
            console.log(actions);
            return {...state}
        case    UPDATE_USER_EMAIL_SUCCESS:
            console.log(actions);
            return { ...state }            
        case  UPDATE_USER_EMAIL_FAIL:
            console.log(actions);
            return { ...state }
        case UPDATE_USER_PASSWORD:
            console.log(actions);
            return { ...state }
        case UPDATE_USER_PASSWORD_FAIL:
            console.log(actions);
            return { ...state } 
        case UPLOAD_PROFILE_IMAGE: 
            console.log(actions);
            return { ...state } 
        case UPLOAD_PROFILE_IMAGE_FAIL:
            console.log(actions);
            return { ...state } 

        case UPLOAD_PROFILE_IMAGE_SUCCESS  :
            console.log(actions);
            return { ...state, userInfo: actions.payload };          
        default:
            return state;
    }
};