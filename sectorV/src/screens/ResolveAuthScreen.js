import React, {useEffect, useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext';
import {ActivityIndicator,View,StyleSheet} from 'react-native';

const ResolveAuthScreen = ()=>{
    const {tryLocalSignin} = useContext(AuthContext);
    useEffect(()=>{
        tryLocalSignin();
    },[]);
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default ResolveAuthScreen;