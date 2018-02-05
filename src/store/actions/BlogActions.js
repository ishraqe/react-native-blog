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
    POST_COMMENT_SUCCESS,
    POST_COMMENT_DELETE,
    POST_COMMENT_DELETE_SUCCESS,
    POST_COMMENT_DELETE_FAIL,
    SINGLE_BLOG_FETCH,
    NOTIFICATION_ADD,
    NOTIFICATION_ADD_SUCCESS,
    NOTIFICATION_ADD_FAIL,
    FETCH_USER_NOTIFICATIONS,
    BLOG_BY_USER_ID_FETCH_SUCCESS

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
                creatorInfo: {
                    ownerId: currentUser.uid,
                    userInfo 
                },
                createdAt: timestamp
            }).then( 
                (blogInfo) => {  
                    firebase.database().ref('blogActions/' + blogInfo.key).set({
                        likes: 0,
                        comments: 0
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
                dispatch({ type: ALL_BLOG_FETCH_SUCCESS, payload: iterate(snapshot, 'all', null) });
            });
    };
}


export const fetchBlogByUserId = ({ userId }) => {
    return (dispatch) => {
        firebase.database().ref('blogs/').child(userId)
            .on('value', snapshot => {
                dispatch({ type: BLOG_BY_USER_ID_FETCH_SUCCESS, payload: iterate(snapshot, 'profile', userId)});
            });
    };
};

export const fetchSinleBlog = ({userId, blogId}) => {
    return (dispatch) => {
        firebase.database().ref('blogs/').child(userId).child(blogId)
        .on('value', snapshot => {
            dispatch({ type: SINGLE_BLOG_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
}

export const iterate = (snapshot, type, ownerId) => {
    let items = [];

    if (type === 'all') {
        for (var key in snapshot.val()) {
            for (var item in snapshot.val()[key]) {
                items.push({
                    ownerId: key,
                    key: item,
                    values: snapshot.val()[key][item]
                });
            }
        } 
        return items;
    } else if (type === 'profile') {
        for (var item in snapshot.val()) {
            items.push({
                ownerId: ownerId,
                key: item,
                values: snapshot.val()[item]
            });
        }
        return items;
    }
    
   
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

export const fetchBlogActivity = ({blogId}) => {
    return (dispatch) => {
        firebase.database().ref('blogActions/' + blogId )
            .on('value', snapshot => {
            dispatch({ type: BLOG_ACTIVITY_FETCH, payload: snapshot.val() });
        });
    };
}

export const postComment = ({ comment, user, blogId, ownerId}) => {
    let timestamp = new Date().getTime();
    const userId = user.userId;
    return (dispatch) => {
        dispatch({type: POST_COMMENT});
        firebase.database().ref('blogActions/').child(blogId).child('comments').child(userId).push({ 
              comment : {
                  blogId: blogId,
                  text: comment,
                  commentByInfo: {
                      id: userId,
                      name: user.userInfo,
                      profileImage: user.profileImage
                  },
                  createdAt: timestamp
              }
        })
        .then((comment) => {
            const notificationInfo ={ 
                senederId: userId,
                receiverid: ownerId,
                blogId: blogId
            };
            if (notificationInfo.senederId === notificationInfo.receiverid) {
                postCommentSuccess(dispatch, comment, notificationInfo);
            }else {
                firebase.database().ref('notifications/').child(notificationInfo.receiverid).push({
                    senederId: notificationInfo.senederId,
                    blogId: notificationInfo.blogId,
                    status: {
                        view: 0,
                        read: 0
                    }
                })
                .then( postCommentSuccess(dispatch, comment, notificationInfo))
                .catch(dispatch({ type: NOTIFICATION_ADD_FAIL })); 
            }
        })
        .catch((err) => postCommentFail(dispatch, err));
    }
};

export const postCommentSuccess = (dispatch,comment, notificationInfo) => {
    dispatch({ type: POST_COMMENT_SUCCESS, payload: comment });
    dispatch({ type: NOTIFICATION_ADD_SUCCESS })
};

export const postCommentFail = (dispatch, err) => {
    dispatch({
        type: POST_COMMENT_FAIL,
        payload: err
    });
};

export const deletePostComment = ({userId, commentId, blogId}) => {
    return (dispatch) => {
        dispatch({type: POST_COMMENT_DELETE})
        firebase.database().ref('blogActions/').child(blogId).child('comments').child(userId).child(commentId).child('comment').update({
            blogId: null,
            text: null,
            commentByInfo: {
                id: null,
                name: null
            },
            createdAt: null
        })
        .then(dispatch({ type: POST_COMMENT_DELETE_SUCCESS }))
        .catch(dispatch({ type: POST_COMMENT_DELETE_FAIL }));
    }
};


export const fetchAllUserNotification = ({ownerId}) => {
    return (dispatch) => {
        firebase.database().ref('notifications/').child(ownerId)
        .on('value', snapshot => {
            let mainInfo = [];
            let info = [];

            for (var key in snapshot.val()) {
                info.push(snapshot.val()[key])
            }
            for (var forEachNoti in info) {
                var senederId = info[forEachNoti].senederId;
                var blogId = info[forEachNoti].blogId;


                var a = [];
                var b = null;
                firebase.database().ref('userInfo/' + senederId).on('value', snapshot => {
                    console.log(snapshot.val()); // returning data
                    a.push({
                        usersInfo:  snapshot.val()
                    })  
                });
                
                firebase.database().ref('blogs/').child(ownerId).child(blogId).on('value', snapshot => {
                    b = {
                        item: {
                            key: blogId,
                            ownerId: ownerId,
                            values : snapshot.val()
                        } 
                    }
                });

                mainInfo.push({
                    a,
                    blog: b
                })
            }
            dispatch({ type: FETCH_USER_NOTIFICATIONS, payload: mainInfo });
        });
       
    }
};
