import * as types from './actionTypes';
import axios from 'axios'

export const updateTopicAction = (info) => {
    return {
        type: types.TOPIC_UPDATE,
        payload : info
    }
};

export const createdTopicActtion = () => {
    return {
        type: types.SAVED_TOPIC
    }
}

export const changeSaveTopicStatusAction = () => {
  return {
      type: types.CHANGE_SAVE_TOPIC_STATUS
  }
}

export const saveCategoriesAction = (info) => {
  return {
      type: types.SAVE_CATEGORIES,
      payload: info
  }
}

export const getCategoriesAction = () => dispatch => {
  let config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  axios
  .get("https://2gatherapi.abmdemo.me/api/topic/category", null, config)
  .then(res => {
    dispatch(saveCategoriesAction(res.data.data));
  })
  .catch(err => {
    
  });
}

export const saveTopic = (info) => dispatch => {
    const {categoryId, address, lat, lng, title, description, amount, file } = info.dashboard;
    const topicData = {categoryId, address, lat, lng, title, description, amount, file};
    let data = new FormData();

    Object.keys(topicData).forEach(function (key) {
      if(key==="file") {
        topicData.file.forEach(file=>{
          data.append('file',file);
        })
      } else {
        data.append(key, topicData[key]);
      }  
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${info.auth.token}`
      }
    };
  
    axios
      .post("https://2gatherapi.abmdemo.me/api/topic", data, config)
      .then(res => {
        dispatch( createdTopicActtion(res.data));
      })
      .catch(err => {
        
      });
}
