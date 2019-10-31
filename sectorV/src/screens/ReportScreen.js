import React, {useContext} from 'react';
import {View,StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {NavigationEvents} from 'react-navigation';
import CardData from '../components/CardData';
// import {Context as AuthContext} from '../context/AuthContext';
import {SafeAreaView} from 'react-navigation';
import {Feather} from '@expo/vector-icons';
import { Context as UserContext } from "../context/UserContext";
import { Context as EntryContext } from "../context/EntryContext";

const ReportScreen = ()=>{
    const {state:entryState,fetchAllEntries} = useContext(EntryContext);
    const {state:userState, fetchUsers}=useContext(UserContext);
    return(
        <SafeAreaView forceInset={{top:'always'}}>
            <NavigationEvents onWillFocus={()=>{
                fetchAllEntries();
                fetchUsers();
            }}/>
            <Spacer>
                <Text h3>Inicio</Text>
            </Spacer>
            <Spacer>
                <CardData
                    number={userState.length}
                    text="alumnos registrados"
                />
            </Spacer>
            <Spacer>
                <CardData
                    number={entryState.length}
                    text="visitas en el mes"
                />
            </Spacer>
            

        </SafeAreaView>
    );
};
ReportScreen.navigationOptions ={
    title: 'Inicio',
    tabBarIcon: <Feather name="file-text" size={20}/>
};
const styles = StyleSheet.create({});
export default ReportScreen;