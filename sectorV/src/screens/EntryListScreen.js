import React,{useContext} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import { Context as EntryContext } from "../context/EntryContext";
import {ListItem,Text} from 'react-native-elements';
import {Feather} from '@expo/vector-icons';
import {SafeAreaView} from 'react-navigation';
import Spacer from '../components/Spacer';
const moment=require('moment');

const EntryListScreen = ({navigation})=>{
    const {state, fetchEntries}=useContext(EntryContext);
    return <SafeAreaView forceInset={{top:'always'}}>
        <NavigationEvents onWillFocus={fetchEntries}/>
        <Spacer>
            <Text h3>Historial de entradas</Text>
        </Spacer>
        <FlatList
            data ={state}
            keyExtractor={item=>item._id}
            renderItem = {({item})=>{
                return <Spacer><ListItem
                                title = {moment(item.time, "YYYY-MM-DDTHH:mm:ss.sssZ").format("dddd, MMMM Do YYYY, h:mm:ss a")}
                                bottomDivider
                            /></Spacer>
            }}
        />
    </SafeAreaView>
};
EntryListScreen.navigationOptions ={
    title: 'Historial',
    tabBarIcon: <Feather name="list" size={20}/>
};
const styles = StyleSheet.create({});
export default EntryListScreen;