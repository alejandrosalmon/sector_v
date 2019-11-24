import createDataContext from './createDataContext';
import expressAPI from '../api/expressAPI';
import {AsyncStorage} from 'react-native';
import {navigate} from '../navigationRef';

const gyroReducer = (state = {
    gyroData: [],
}, action) => {
    switch(action.type){
        case 'get_values':
            return {...state};
        default 
    }
}