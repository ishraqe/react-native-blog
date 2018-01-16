import {
    POST_STORY,
    POST_STORY_FAIL,
    POST_STORY_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
    imageUrl: '',
    description: ''
};


export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case POST_STORY:
            console.log(actions);
           break;
        case POST_STORY_SUCCESS:
            console.log(actions);
            break;
        case POST_STORY_FAIL:
            console.log(actions);
            break;
        default:
            return state;
    }
}