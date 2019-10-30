import React, {useContext} from 'react';
import {View,StyleSheet} from 'react-native';
// import {Button} from 'react-native-elements';
// import Spacer from '../components/Spacer';
// import {Context as AuthContext} from '../context/AuthContext';
import {SafeAreaView} from 'react-navigation';
import {Text} from 'react-native-elements';
import {Ionicons} from '@expo/vector-icons';

const CodeBarScreen = ()=>{
    // const {signout} = useContext(AuthContext);
    return(
        <SafeAreaView forceInset={{top:'always'}}>
            <Text h3>Inicio</Text>
        </SafeAreaView>
    );
};
CodeBarScreen.navigationOptions ={
    title: 'Inicio',
    tabBarIcon: <Ionicons name="ios-barcode" size={20}/>
};
const styles = StyleSheet.create({});
export default CodeBarScreen;