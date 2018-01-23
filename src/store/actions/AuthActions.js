import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER,
    SIGNUPUSER_USER_FAIL,
    SIGNUPUSER_USER_SUCCESS,
    USERINFO_FETCH_SUCCESS,
    USER_LOG_OUT
} from "./types";
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';


export const signUpUser = ({fullname, email, password}) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                const uid = user.uid;
                firebase.database().ref('userInfo/' + uid).set({
                       fullname : fullname 
                }).then (
                    (userInfo) => signupUserSuccess(dispatch, userInfo, user, {email, password})
                )
            })
            .catch(() => signupUserfail(dispatch));
    }
}


export const signupUserfail = (dispatch) => {
    dispatch({
        type: SIGNUPUSER_USER_FAIL
    });
};


export const signupUserSuccess = (dispatch, userInfo,user, {email, password}) => {

    dispatch({
        type: SIGNUPUSER_USER_SUCCESS,
        payload: {
            user
        }
    });
    const status = 'signUp';
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
        (user) => loginUserSuccess(dispatch, user, status)
        )
        .catch(() => loginUserFail(dispatch));
   
}


export const loginUser = ({ email, password }) => {
    const status = 'login';
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => loginUserSuccess(dispatch, user, status))
            .catch(() => loginUserFail(dispatch));
            
    };
};

export const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL
    });
};



export const loginUserSuccess = (dispatch, user, status) => {   
    console.log(user.uid, 'from sction');
    
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
   
    const { currentUser } = firebase.auth();
   
    currentUser.getIdToken()
        .then(data => {
                AsyncStorage.setItem('as:auth:user', data);
                if (status === 'login') {
                    console.log(status);
                    Actions.lightbox();
                } else if (status === 'signUp') {
                    console.log(status);
                    Actions.successScreen();
                }
            }
        );
   
};

export const fetchUserInfo = (uid) => {
   
    return (dispatch) => {
        firebase.database().ref('userInfo/' + uid)
        .on('value', snapshot=> {
            dispatch ({type: USERINFO_FETCH_SUCCESS, payload: snapshot.val()});
        });
    };
}

export const logOutUser = () => {
    return (dispatch) => {
        firebase.auth().signOut()
            .then(()=> {
                dispatch({type: USER_LOG_OUT});
                AsyncStorage.removeItem('as:auth:user');
                Actions.auth();
            }).catch(()=> {
                console.log('error');
            });
    }
};
