import createDataContext from "./createDataContext";
import expressAPI from '../api/expressAPI';

const entryReducer=(state,action)=>{
    switch(action.type){
        case 'fetch_entries':
            return action.payload;
        default: return state;
    }
};

const fetchEntries = dispatch =>async() =>{
    const response = await expressAPI.get('/entries');
    dispatch({type: 'fetch_entries',payload: response.data});
};

export const {Provider,Context}=createDataContext(
    entryReducer,
    {fetchEntries},
    []
);