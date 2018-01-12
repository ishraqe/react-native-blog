import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER
} from "./types";
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


export const signUpUser = ({email, password}) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => loginUserSuccess(dispatch, user))
            .catch(() => loginUserFail(dispatch));
    }
}


export const signupUserfail = (dispatch) => {
    dispatch({
        type: SIGNUPUSER_USER_FAIL
    });
};


export const signupUserSuccess = (dispatch, user) => {
    dispatch({
        type: SIGNUPUSER_USER_SUCCESS,
        payload: user
    });

    Actions.lightbox();

}


export const loginUser = ({ email, password }) => {
    return (dispatch) => {

        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => loginUserSuccess(dispatch, user))
            .catch(() => loginUserFail(dispatch));
            
    };
};

export const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL
    });
};


export const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    Actions.lightbox();
};