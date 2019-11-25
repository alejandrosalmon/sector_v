import React,{useContext, useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {NavigationEvents,SafeAreaView} from 'react-navigation';
import { Context as EntryContext } from "../context/EntryContext";
import {ListItem,Text, SearchBar} from 'react-native-elements';
import {Feather} from '@expo/vector-icons';
import Spacer from '../components/Spacer';


const EntryListScreen = ()=>{

    const [textL, setTextL] = useState('');
    const [data, setData] = useState([]);
    const {state, fetchEntries}=useContext(EntryContext);
    
    useEffect(() => {
        setData(state.entryList);
    }, [state.entryList]);

    function SearchFilterFunction(text) {
        console.log(text);
        const newData = state.entryList.filter(function(item) {
          const itemData = item.time ? item.time.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setTextL(text);
        setData(newData);
    }

    return <SafeAreaView forceInset={{top:'always'}}>
        <NavigationEvents onWillFocus={()=>{
            fetchEntries();
        }}/>
        
        <Spacer>
            <Text h3>Historial de entradas</Text>
        </Spacer>

        <SearchBar
          round
          lightTheme
          searchIcon={{ size: 24 }}
          onChangeText={text => SearchFilterFunction(text)}
          onClear={text => SearchFilterFunction('')}
          placeholder="Buscar..."
          value={textL}
        />

        <FlatList
            data ={data}
            keyExtractor={item=>item._id}
            renderItem = {({item})=>{
                return <ListItem
                        title = {item.time}
                        bottomDivider
                    />
            }}
        />
        <Spacer/>
    </SafeAreaView>
};
EntryListScreen.navigationOptions ={
    title: 'Historial',
    tabBarIcon: <Feather name="list" size={20}/>
};
const styles = StyleSheet.create({});
export default EntryListScreen;