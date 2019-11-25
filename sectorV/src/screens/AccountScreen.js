import React, {useContext} from 'react';
import {View, StyleSheet, Button, Image} from 'react-native';
import {Text} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {SafeAreaView} from 'react-navigation';
import {Feather} from '@expo/vector-icons';
import { Context as ProfileContext } from "../context/ProfileContext";
import {NavigationEvents} from 'react-navigation';
import {ScrollView} from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';

const AccountScreen = ()=>{
    const {signout} = useContext(AuthContext);
    const {state, fetchProfiles}=useContext(ProfileContext);
    return(
        <View style={styles.infoContainer}>
                <Text h3> {state.name} </Text>
                <Text h4> {state.email} </Text>
                <Text h4> {state.role == '0'?'Admin':"Alumno"}</Text>
                <Text h4> Fecha de Registro </Text>
                <Text style={{fontSize: 18}}> {state.registration_time} </Text>

                <Button
                    title="Cerrar sesión"
                    onPress={signout}
                />
        </View>
    
    );
};
AccountScreen.navigationOptions ={
    title: 'Cuenta',
    tabBarIcon: <Feather name="settings" size={20}/>
};

export default AccountScreen;
const styles = StyleSheet.create({
infoContainer:{
    alignItems: "center",
    justifyContent: "center",
    flex: 1
},
});

