import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER,
    SIGNUPUSER_USER_FAIL,
    SIGNUPUSER_USER_SUCCESS,
    USERINFO_FETCH_SUCCESS
} from "./types";
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


export const signUpUser = ({fullname, email, password}) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                const uid = user.uid;
                firebase.database().ref('userInfo/' + uid).set({
                       fullname : fullname 
                }).then(
                    (userInfo) => signupUserSuccess(dispatch, userInfo, user)
                )
            })
            .catch(() => loginUserFail(dispatch));
    }
}


export const signupUserfail = (dispatch) => {
    dispatch({
        type: SIGNUPUSER_USER_FAIL
    });
};


export const signupUserSuccess = (dispatch, userInfo,user) => {

    dispatch({
        type: SIGNUPUSER_USER_SUCCESS,
        payload: {
            user
        }
    });
    Actions.successScreen();
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

export const fetchUserInfo = () => {
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        firebase.database().ref('userInfo/' +currentUser.uid)
        .on('value', snapshot=> {
            dispatch ({type: USERINFO_FETCH_SUCCESS, payload: snapshot.val()});
        });
    };
}