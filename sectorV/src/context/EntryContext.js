import createDataContext from "./createDataContext";
import expressAPI from '../api/expressAPI';

const entryReducer=(state,action)=>{
    switch(action.type){
        case 'fetch_entries':
            return action.payload;
        case 'fetch_entries_month':
            return action.payload;
        case 'register_entry':
            return action.payload;
        case 'fetch_all_entries':
            return action.payload;
        default: return state;
    }
};

const fetchEntries = dispatch =>async() =>{
    const response = await expressAPI.get('/entries');
    dispatch({type: 'fetch_entries',payload: response.data});
};

const fetchEntriesMonth = dispatch => async() =>{
    const response = await expressAPI.get('/entries_this_month');
    dispatch({type: 'fetch_entries_month', payload:response.data});
}

const registerEntry = dispatch => async() =>{
    const response = await expressAPI.post('/entries');
    dispatch({type: 'register_entry', payload:response.data});
}

const fetchAllEntries = dispatch =>async() =>{
    const response = await expressAPI.get('/all_entries');
    dispatch({type: 'fetch_all_entries',payload: response.data});
};

export const {Provider,Context}=createDataContext(
    entryReducer,
    {fetchEntries,fetchAllEntries, fetchEntriesMonth, registerEntry},
    []
);