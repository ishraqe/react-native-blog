import {
    POST_STORY,
    POST_STORY_FAIL,
    POST_STORY_SUCCESS
} from "./types";

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';



const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export const postStory = (desc, imageData) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({type: POST_STORY });
        this.uploadImage(imageData)
            .then(url =>
                firebase.database().ref('blogs/' + currentUser.uid).set({
                   imageUrl: url,
                   blogDescription: desc 
                }).then(
                    (blogInfo) => postStorySuccess(dispatch,blogInfo)
                )
            
            )
            .catch(error => postStoryFail(dispatch, error));
    };
};

export const postStoryFail = (dispatch, error) => {
    dispatch({
        type: POST_STORY_FAIL,
        payload: error
    });
};


export const postStorySuccess = (dispatch, post) => {
    dispatch({
        type: POST_STORY_SUCCESS,
        payload: post
    });
};

uploadImage =(uri) => {
     
    return new Promise((resolve, reject) => {
        const uploadUri = uri;
        let uploadBlob = null;
        let mime = 'image/jpg';
        const imageRef = firebase.storage().ref('uploads').child('images');

        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` });
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime });
            })
            .then(() => {
                uploadBlob.close();
                return imageRef.getDownloadURL();
            })
            .then((url) => {
                resolve(url)
            })
            .catch((error) => {
                reject(error)
            }); 
    });
}