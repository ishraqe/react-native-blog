import {
    POST_STORY,
    POST_STORY_FAIL,
    POST_STORY_SUCCESS
} from "./types";

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


export const postStory = (desc, imageData) => {
    return (dispatch) => {
        dispatch({
             type: POST_STORY ,
             payload: {desc, imageData}
        });
        // firebase.auth().signInWithEmailAndPassword(email, password)
        //     .then((user) => loginUserSuccess(dispatch, user))
        //     .catch(() => loginUserFail(dispatch));

    };
};

export const postStoryFail = (dispatch) => {
    dispatch({
        type: POST_STORY_FAIL
    });
};


export const postStorySuccess = (dispatch, user) => {
    dispatch({
        type: POST_STORY_SUCCESS,
        payload: user
    });
};