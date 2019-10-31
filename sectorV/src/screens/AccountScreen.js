import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {SafeAreaView} from 'react-navigation';
import {Feather} from '@expo/vector-icons';
import { Context as ProfileContext } from "../context/ProfileContext";
import {NavigationEvents} from 'react-navigation';

const AccountScreen = ()=>{
    const {signout} = useContext(AuthContext);
    const {state, fetchProfiles}=useContext(ProfileContext);
    return(
        <SafeAreaView forceInset={{top:'always'}}>
            <NavigationEvents onWillFocus={fetchProfiles}/>
            <Spacer>
                <Text h3>{state.name}</Text>
            </Spacer>
            
            <Spacer>
                <Text h4>{state.email}</Text>
            </Spacer>
            <Spacer>
                <Text h4>{state.registration_time}</Text>
                <Text style={styles.role}>Rol: {state.role == '0'?'Admin':"Alumno"}</Text>
            </Spacer>
            
        </SafeAreaView>
    );
};
AccountScreen.navigationOptions ={
    title: 'Cuenta',
    tabBarIcon: <Feather name="settings" size={20}/>
};

const styles = StyleSheet.create({
    role:{
        color:'blue'
    }
});
export default AccountScreen;