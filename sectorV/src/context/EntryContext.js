import createDataContext from "./createDataContext";
import expressAPI from '../api/expressAPI';


const moment=require('moment');

moment.updateLocale('es', {
    months : 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort : 'ene._feb._mar_abr._may_jun_jul._ago_sep._oct._nov._dec.'.split('_'),
    monthsParseExact : true,
    weekdays : 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
    weekdaysParseExact : true,
});

const entryReducer=(state,action)=>{
    switch(action.type){
        case 'fetch_entries':
            return {...state, entryList: action.payload};
        case 'fetch_entries_month':
            return {...state, entries:action.payload};
        case 'register_entry':
            return state;
        case 'fetch_all_entries':
            return action.payload;
        default:
            return state;
    }
};

const fetchEntries = dispatch =>async() =>{
    const {data} = await expressAPI.get('/entries');
    data.forEach(function(part,index,arr){
        arr[index].time = moment(arr[index].time, "YYYY-MM-DDTHH:mm:ss.sssZ").format("dddd, MMMM Do YYYY, h:mm:ss a");
    });
    dispatch({type: 'fetch_entries',payload: data});
};


const fetchEntriesMonth = dispatch => async() =>{
    const response = await expressAPI.get('/entries_this_month');
    dispatch({type: 'fetch_entries_month', payload:response.data.length});
}

const registerEntry = dispatch => async() =>{
    const response = expressAPI.post('/entries');
    dispatch({type: 'register_entry'});
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
