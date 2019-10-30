import React,{useContext} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import { Context as PackageContext } from "../context/PackageContext";
import {ListItem} from 'react-native-elements';
import {Feather} from '@expo/vector-icons';
import {SafeAreaView} from 'react-navigation';

const PackageListScreen = ({navigation})=>{
    const {state, fetchPackages}=useContext(PackageContext);
    console.log(state);
    return <SafeAreaView forceInset={{top:'always'}}>
        <NavigationEvents onWillFocus={fetchPackages}/>
        <FlatList
            data ={state}
            keyExtractor={item=>item._id}
            renderItem = {({item})=>{
                return <ListItem
                        title = {item.name}
                    />
            }}
        />
    </SafeAreaView>
};
PackageListScreen.navigationOptions ={
    title: 'Packages',
    tabBarIcon:<Feather name="package" size={20}/>
};
const styles = StyleSheet.create({});
export default PackageListScreen;