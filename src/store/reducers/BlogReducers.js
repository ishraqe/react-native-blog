import {
    POST_STORY,
    POST_STORY_FAIL,
    POST_STORY_SUCCESS,
    ALL_BLOG_FETCH_SUCCESS,
    ALL_BLOG_FETCH_FAIL,
    POST_DELETE,
    POST_DELETE_SUCCESS,
    POST_DELETE_ERROR
} from "../actions/types";

const INITIAL_STATE = {
    post: null,
    allBlog: null,
    loading: false,
};


export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case POST_STORY:
            console.log(actions);
            return { ...state, loading: true};
        case POST_STORY_SUCCESS:
            console.log(actions);
            return { ...state,loading: false, post: actions.payload};
        case POST_STORY_FAIL:
            console.log(actions);
            return { ...state, loading: false};
        case ALL_BLOG_FETCH_SUCCESS: 
            console.log(actions);
            return { ...state, allBlog: actions.payload}
        case POST_DELETE :    
            console.log(actions);
            return { ...state }
        case POST_DELETE_SUCCESS:
            console.log(actions);
            return { ...state }
        case POST_DELETE_ERROR:
            console.log(actions);
            return { ...state }
        default:
            return state;
    }
}