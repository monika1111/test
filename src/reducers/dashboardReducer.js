import { TOPIC_UPDATE, SAVE_CATEGORIES, SAVED_TOPIC, CHANGE_SAVE_TOPIC_STATUS } from './../actions/actionTypes'

const initialState = {
    categoryId: '',
    address: '',
    lat: '',
    lng: '',
    title: '',
    description: '',
    amount: '',
    file: '',
    lat: '',
    lng: '',
    categories: [],
    saveTopicStatus: null,
    imagePreviews: {}
};

const dashboardReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOPIC_UPDATE: {
            return {
                ...state,
                ...action.payload
            }
        }
        case SAVE_CATEGORIES: {
            return {
                ...state,
                categories: action.payload
            }
        }
        case SAVED_TOPIC: {
            return {
                ...state,
                categoryId: '',
                address: '',
                lat: '',
                lng: '',
                title: '',
                description: '',
                amount: '',
                file: '',
                saveTopicStatus: true,
                imagePreviews: {}
            }
        }
        case CHANGE_SAVE_TOPIC_STATUS: {
           return { 
               ...state,
               saveTopicStatus: false
           }
        }
        default:
            return state;
    }
};

export default dashboardReducer

