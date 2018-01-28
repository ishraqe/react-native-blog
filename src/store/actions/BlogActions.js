import {
    POST_STORY,
    POST_STORY_FAIL,
    POST_STORY_SUCCESS,
    ALL_BLOG_FETCH_SUCCESS,
    ALL_BLOG_FETCH_FAIL,
    POST_DELETE,
    POST_DELETE_SUCCESS,
    POST_DELETE_ERROR,
    POST_LIKE,
    POST_LIKE_SUCCESS,
    POST_LIKE_FAIL,
    BLOG_ACTIVITY_FETCH,
    BLOG_ACTIVITY_TABLE_CREATED,
    POST_COMMENT,
    POST_COMMENT_FAIL,
    POST_COMMENT_SUCCESS
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
        let timestamp = new Date().getTime();
        this.uploadImage(imageData)
        .then(url =>
            firebase.database().ref('blogs/' + currentUser.uid).push({
                imageUrl: url,
                blogDescription: desc, 
                creatorInfo: userInfo,
                createdAt: timestamp
            }).then( 
                (blogInfo) => {  
                    firebase.database().ref('blogActions/' + blogInfo.key).set({
                        like: 0,
                        comment: 0
                    }).then(() => {
                        dispatch({type: BLOG_ACTIVITY_TABLE_CREATED });

                        firebase.database().ref('blogs/').child(currentUser.uid).child(blogInfo.key)
                        .on('value', snapshot => postStorySuccess(dispatch, snapshot.val()));
                    });
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
    Actions.landing_page();
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
    let keys = [];
    let thirdArray = [];
    for (var key in snapshot.val()) {
        for (var item in snapshot.val()[key]) {
            items.push({
                ownerId : key,
                key: item,
                values: snapshot.val()[key][item]
            });
        }
    } 

    console.log(items, 'items');
    // thirdArray = mergeArrays(keys, items);
    // console.log(thirdArray);
    return items;
}


export const  mergeArrays = (arr1, arr2) => {
    var l = Math.min(arr1.length, arr2.length),
        ret = [],
        i;

    for (i = 0; i < l; i++) {
        ret.push(arr1[i] + ":" + arr2[i]);
    }

    return ret;
}


export const deleteBlogPost = ({userId,blogId}) => {
    console.log(userId, blogId );
    
    return (dispatch) => {
        dispatch({ type: POST_DELETE });
        firebase.database().ref('blogs/').child(userId).child(blogId).update({
            imageUrl: null,
            blogDescription: null,
            creatorInfo: null,
            createdAt: null
        })
            .then(() => postDeleteSuccess(dispatch))
            .catch(err => postDeleteFail(dispatch, err));
    }
};

export const postDeleteSuccess = (dispatch) => {
    dispatch({
        type: POST_DELETE_SUCCESS
    });
    Actions.landing_page();
};

export const postDeleteFail = (dispatch, error) => {
    dispatch({
        type: POST_DELETE_ERROR,
        payload: error
    });
};

export const likeAction = ({ blogId, userId }) => {
    return (dispatch) => {
        dispatch({type : POST_LIKE});
        hasChild({blogId, userId})
        .then(activity => {
            if (activity) {
                likeDslikeQuery(null, blogId, userId, dispatch);
            } else {
                likeDslikeQuery(true, blogId, userId, dispatch);
            }
        });      
    }
};

export const likeDslikeQuery = (activity, blogId, userId, dispatch) => {
    firebase.database().ref('blogActions/').child(blogId).child('likes').child(userId).set({
        like: activity
    }).then(like => likeSuccess(dispatch, like))
        .catch(err => likeFail(dispatch, err));
}

export const hasChild= ({blogId, userId}) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref('blogActions/').child(blogId).child('likes').once('value')
        .then(snapshot => {
                if (snapshot.hasChild(userId)) {
                    return true;
                }
                return false;
        }).then((activity) => {
            resolve(activity);
        });
    });
}

export const likeSuccess = (dispatch, payload) => {
    dispatch({
        type: POST_LIKE_SUCCESS,
        payload: payload
    });
};

export const likeFail = (dispatch, err) => {
    dispatch({
        type: POST_LIKE_FAIL,
        payload: err
    });
};

export const fetchBlogActivity = (blogId) => {
    return (dispatch) => {
        firebase.database().ref('blogActions/' + blogId )
            .on('value', snapshot => {
                dispatch({ type: BLOG_ACTIVITY_FETCH, payload: snapshot.val() });
        });
    };
}

export const postComment = ({comment, user, blogId}) => {
    let timestamp = new Date().getTime();
    console.log(comment, user, 'comment');
    const userId = user.userId;
    return (dispatch) => {
        dispatch({type: POST_COMMENT});
        firebase.database().ref('blogActions/').child(blogId).child('comments').child(userId).set({ 
               text: comment,
               commentByInfo: {
                   user
               },
               createdAt: timestamp
        })
        .then((comment) => postCommentSuccess(dispatch, comment))
        .catch((err) => postCommentFail(dispatch, err));
    }
};

export const  postCommentSuccess = (dispatch, comment) => {
    dispatch({
        type: POST_COMMENT_SUCCESS,
        payload: comment
    });
};

export const postCommentFail = (dispatch, err) => {
    dispatch({
        type: POST_COMMENT_FAIL,
        payload: err
    });
};