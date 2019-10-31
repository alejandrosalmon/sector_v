import createDataContext from "./createDataContext";
import expressAPI from '../api/expressAPI';

const profileReducer=(state,action)=>{
    switch(action.type){
        case 'fetch_profiles':
            return action.payload;
        default: return state;
    }
};

const fetchProfiles = dispatch =>async() =>{
    const response = await expressAPI.get('/profile');
    console.log("data: "+response.data);
    dispatch({type: 'fetch_profiles',payload: response.data});
};

export const {Provider,Context}=createDataContext(
    profileReducer,
    {fetchProfiles},
    []
);