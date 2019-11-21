import createDataContext from './createDataContext';
import expressAPI from '../api/expressAPI';
import {AsyncStorage} from 'react-native';
import {navigate} from '../navigationRef';

const authReducer = (state,action)=>{
    switch(action.type){
        case 'add_error':
            return {...state,errorMessage:action.payload};
        case 'signin':
            return { errorMessage: '', token: action.payload };
        case 'clear_error_message':
            return {...state,errorMessage:''};
        case 'signout':
            return {token:null, errorMessage:''};
        default: return state;
    }
};

const tryLocalSignin =dispatch=> async()=>{
    const token = await AsyncStorage.getItem('token');
    if(token){
        dispatch({type:'signin', payload:token});
        const roleJSON = await AsyncStorage.getItem('role');
        if(roleJSON){
            try {
                role = JSON.parse(roleJSON);
                if(role==0){
                    navigate('Report');
                }else if(role==1){
                    navigate('CodeBar');
                }
            } catch (e) {
                console.error('AsyncStorage#getItem error deserializing JSON for key: role' +  e.message);
            }   
        }else{
            navigate('Signin');
        }
    }else{
        navigate('Signin');
    }
};

const clearErrorMessage = dispatch => () =>{
    dispatch({type: 'clear_error_message'});
};

async function set_token_role_and_navigate(token,role,dispatch){
    await AsyncStorage.setItem('token',token);
    await AsyncStorage.setItem('role',JSON.stringify(role));
    dispatch({type:'signin',payload: token});
    const roleP = parseInt(role);
    if(roleP==0){
        navigate('Report');
    }else if(roleP==1){
        navigate('CodeBar');
    }
}

const signup = dispatch => async ({email,password,name})=>{ //TODO: FIX FIELDS
    try{
        const response = await expressAPI.post('/signup',{email,password,name});
        await set_token_role_and_navigate(response.data.token,response.data.role,dispatch);
    }catch(err){
        dispatch({type: 'add_error', payload:'Usuario o contraseña inválida.'});
    }
};

const signupWithGoogle = dispatch => async ({idToken,accessToken})=>{ //TODO: FIX FIELDS
    try{
        const response = await expressAPI.post('/signupWithGoogle',{idToken});
        await AsyncStorage.setItem('accessToken',accessToken);
        await set_token_role_and_navigate(response.data.token,response.data.role,dispatch);
    }catch(err){
        dispatch({type: 'add_error', payload:'Usuario o contraseña inválida.'});
    }
};

const signin = (dispatch)=>async ({email,password})=>{
    try{
        const response = await expressAPI.post('/signin',{email,password});
        await set_token_role_and_navigate(response.data.token,response.data.role,dispatch);
    }catch(err){
        console.log(err);
        dispatch({type: 'add_error', payload:'Usuario o contraseña inválida.'});
    }
};

const signinWithGoogle = dispatch => async ({idToken,accessToken})=>{ //TODO: FIX FIELDS
    try{
        const response = await expressAPI.post('/signinWithGoogle',{idToken});
        await AsyncStorage.setItem('accessToken',accessToken);
        await set_token_role_and_navigate(response.data.token,response.data.role,dispatch);
    }catch(err){
        dispatch({type: 'add_error', payload:'Usuario o contraseña inválida.'});
    }
};

const signout = (dispatch)=>async()=>{
    try{
        await AsyncStorage.removeItem('accessToken');
    }catch(err){
        console.log(err);
    }
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('role');
    dispatch({type: 'signout'})
    navigate('loginFlow');
};


export const {Provider,Context}=createDataContext(
    authReducer,
    {signout,clearErrorMessage,signin,signup,tryLocalSignin,signupWithGoogle,signinWithGoogle},
    {token:null,errorMessage:''}
);