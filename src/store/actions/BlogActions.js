import {
    POST_STORY,
    POST_STORY_FAIL,
    POST_STORY_SUCCESS,
    ALL_BLOG_FETCH_SUCCESS,
    ALL_BLOG_FETCH_FAIL
} from "./types";

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';



const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export const postStory = (desc, imageData, userInfo) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({type: POST_STORY });
        this.uploadImage(imageData)
        .then(url =>
            firebase.database().ref('blogs/' + currentUser.uid).push({
                imageUrl: url,
                blogDescription: desc, 
                creatorInfo: userInfo
            }).then( 
                (blogInfo) => {  
                    firebase.database().ref('blogs/').child(currentUser.uid).child(blogInfo.key)
                    .on('value', snapshot => postStorySuccess(dispatch,snapshot.val())
                    )
                }
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
    console.log(uiqueID());
    return new Promise((resolve, reject) => {
        const uploadUri = uri;
        let uploadBlob = null;
        let mime = 'image/jpg';
        const imageRef = firebase.storage().ref('uploads').child(uiqueID());

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

uiqueID = () => {
     s4=() => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

export const fetchAllBlog = () => {
    return (dispatch) => {
        firebase.database().ref('blogs/')
            .on('value', snapshot => {
                dispatch({ type: ALL_BLOG_FETCH_SUCCESS, payload: iterate(snapshot) });
            });
    };
}


export const iterate = (snapshot) => {
    let items = [];
    for (var key in snapshot.val()) {
        for (var item in snapshot.val()[key]) {
            items.push(snapshot.val()[key][item]);
        }
    }
    return items;
}
