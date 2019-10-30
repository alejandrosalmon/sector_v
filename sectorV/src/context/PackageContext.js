import createDataContext from "./createDataContext";
import expressAPI from '../api/expressAPI';

const packageReducer=(state,action)=>{
    switch(action.type){
        case 'fetch_packages':
            return action.payload;
        default: return state;
    }
};

const fetchPackages = dispatch =>async() =>{
    const response = await expressAPI.get('/packages');
    dispatch({type: 'fetch_packages',payload: response.data});
};

export const {Provider,Context}=createDataContext(
    packageReducer,
    {fetchPackages},
    []
);