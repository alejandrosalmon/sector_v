import React,{useContext} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import { Context as EntryContext } from "../context/EntryContext";
import {ListItem,Text} from 'react-native-elements';
import {Feather} from '@expo/vector-icons';
import {SafeAreaView} from 'react-navigation';

const EntryListScreen = ({navigation})=>{
    const {state, fetchEntries}=useContext(EntryContext);
    return <SafeAreaView forceInset={{top:'always'}}>
        <NavigationEvents onWillFocus={fetchEntries}/>
        <Text h3>Historial de entradas</Text>
        <FlatList
            data ={state}
            keyExtractor={item=>item._id}
            renderItem = {({item})=>{
                return <ListItem
                        title = {item.time}
                    />
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