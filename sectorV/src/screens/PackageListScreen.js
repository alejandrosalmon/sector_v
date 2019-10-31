import React,{useContext} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import { Context as PackageContext } from "../context/PackageContext";
import {ListItem,Text} from 'react-native-elements';
import {Feather} from '@expo/vector-icons';
import {SafeAreaView} from 'react-navigation';
import Spacer from '../components/Spacer';

const PackageListScreen = ({navigation})=>{
    const {state, fetchPackages}=useContext(PackageContext);
    return <SafeAreaView forceInset={{top:'always'}}>
        <NavigationEvents onWillFocus={fetchPackages}/>
        <Text h3 style={{marginLeft:16, marginTop:16}}>Paquetes</Text>
        <Spacer>
            <FlatList
                data ={state}
                keyExtractor={item=>item._id}
                renderItem = {({item})=>{
                    return <ListItem
                            title = {item.name}
                            subtitle = {`$${item.price}, ${item.entries_per_month} visitas al mes`}
                            bottomDivider
                        />
                }}
            />
        </Spacer>
        
    </SafeAreaView>
};
PackageListScreen.navigationOptions ={
    title: 'Paquetes',
    tabBarIcon:<Feather name="package" size={20}/>
};
const styles = StyleSheet.create({});
export default PackageListScreen;