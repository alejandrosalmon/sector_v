import axios from 'axios';
import {AsyncStorage} from 'react-native';

const instance =axios.create({
    baseURL: 'https://secure-beach-02190.herokuapp.com/' //change
});

instance.interceptors.request.use(
    async (config)=>{
        try{
            const token = await AsyncStorage.getItem('token');
            if (token){
                config.headers.Authorization = `Bearer ${token}`;
            }
        }catch(err){
            console.log(err);
        }
        return config;
    },
    (err)=>{
        return Promise.reject(err);
    }
);

export default instance;