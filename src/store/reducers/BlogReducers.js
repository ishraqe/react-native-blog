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
    SINGLE_BLOG_FETCH_SUCCESS,
    NOTIFICATION_ADD,
    NOTIFICATION_ADD_SUCCESS,
    NOTIFICATION_ADD_FAIL,
    FETCH_USER_NOTIFICATIONS,
    BLOG_BY_USER_ID_FETCH_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
    post: null,
    allBlog: null,
    loading: false,
    likeActivity: null,
    comments: null,
    single_blog: null,
    notifications: null,
    usersBlog: null
};


export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case POST_STORY:
            console.log(actions);
            return { ...state, loading: true};
        case POST_STORY_SUCCESS:
            console.log(actions);
            return { ...state,loading: false, post: actions.payload};
        case BLOG_ACTIVITY_TABLE_CREATED: 
            console.log(actions);
            return {...state};
        case POST_STORY_FAIL:
            console.log(actions);
            return { ...state, loading: false};
        case ALL_BLOG_FETCH_SUCCESS: 
            console.log(actions);
            return { ...state, allBlog: actions.payload}
        case SINGLE_BLOG_FETCH_SUCCESS: 
            console.log(actions);
            return { ...state, single_blog: actions.payload }
        case POST_DELETE :    
            console.log(actions);
            return { ...state }
        case POST_DELETE_SUCCESS:
            console.log(actions);
            return { ...state }
        case POST_DELETE_ERROR:
            console.log(actions);
            return { ...state }
        case POST_LIKE: 
            console.log(actions);
            return { ...state } 
        case POST_LIKE_SUCCESS:
            console.log(actions);
            return { ...state }
        case POST_LIKE_FAIL:
            console.log(actions);
            return { ...state }
        case BLOG_ACTIVITY_FETCH : 
            console.log(actions);
            return { ...state, likeActivity: actions.payload}
        case POST_COMMENT: 
            console.log(actions);
            return { ...state }
        case POST_COMMENT_FAIL:
            console.log(actions);
            return { ...state }
        case POST_COMMENT_SUCCESS: 
            console.log(actions);
            return { ...state, comments: actions.payload }    
        case POST_COMMENT_DELETE:
            console.log(actions);
            return { ...state }
        case POST_COMMENT_DELETE_SUCCESS:
            console.log(actions);
            return { ...state }
        case POST_COMMENT_DELETE_FAIL:
            console.log(actions);
            return { ...state }
        case NOTIFICATION_ADD:
            console.log(actions);
            return { ...state }
        case NOTIFICATION_ADD_SUCCESS:
            console.log(actions);
            return { ...state }
        case NOTIFICATION_ADD_FAIL:
            console.log(actions);
            return { ...state }
        case FETCH_USER_NOTIFICATIONS: 
            console.log(actions);
            return { ...state, notifications: actions.payload }
        case BLOG_BY_USER_ID_FETCH_SUCCESS: 
            console.log(actions);
            return { ...state, usersBlog: actions.payload }
        default:
            return state;
    }
}