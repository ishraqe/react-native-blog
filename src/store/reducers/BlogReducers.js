import {
    POST_STORY,
    POST_STORY_FAIL,
    POST_STORY_SUCCESS,
    ALL_BLOG_FETCH_SUCCESS,
    ALL_BLOG_FETCH_FAIL
} from "../actions/types";

const INITIAL_STATE = {
    post: null,
    allBlog: null
};


export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case POST_STORY:
            console.log(actions);
            return state;
        case POST_STORY_SUCCESS:
            console.log(actions);
            return { ...state, post: actions.payload, ...INITIAL_STATE };
        case POST_STORY_FAIL:
            console.log(actions);
            return state;
        case ALL_BLOG_FETCH_SUCCESS: 
            console.log(actions);
            return { ...state, allBlog: actions.payload}
        default:
            return state;
    }
}