import React,{useContext} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { Context as UserContext} from "../context/UserContext";

const UserDetailScreen = ({navigation})=>{
    const {state} = useContext(UserContext);
    const _id = navigation.getParam('_id');

    const User = state.find(u => u._id===_id);

    return (
        <>
            <Text style={{fontSize:48}}>{User.name}</Text>
            
        </>
        
    );
};
const styles = StyleSheet.create({
    map:{
        height:300
    }
});
export default UserDetailScreen;