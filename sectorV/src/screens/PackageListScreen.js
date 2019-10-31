import React,{useContext} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import { Context as PackageContext } from "../context/PackageContext";
import {ListItem,Text} from 'react-native-elements';
import {Feather} from '@expo/vector-icons';
import {SafeAreaView} from 'react-navigation';

const PackageListScreen = ({navigation})=>{
    const {state, fetchPackages}=useContext(PackageContext);
    return <SafeAreaView forceInset={{top:'always'}}>
        <NavigationEvents onWillFocus={fetchPackages}/>
        <Text h3>Paquetes</Text>
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
    title: 'Paquetes',
    tabBarIcon:<Feather name="package" size={20}/>
};
const styles = StyleSheet.create({});
export default PackageListScreen;