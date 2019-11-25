import React,{useContext, useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {NavigationEvents, ScrollView} from 'react-navigation';
import { Context as EntryContext } from "../context/EntryContext";
import {ListItem,Text, SearchBar} from 'react-native-elements';
import {Feather} from '@expo/vector-icons';
import {SafeAreaView} from 'react-navigation';
import Spacer from '../components/Spacer';
const moment=require('moment');

moment.locale('es', {
    months : 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact : true,
    weekdays : 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
    weekdaysParseExact : true,
});


const EntryListScreen = ({navigation})=>{

    const [textL, setTextL] = useState('');
    const [data, setData] = useState([]);
    const {state, fetchEntries}=useContext(EntryContext);
    
    function SearchFilterFunction(text) {
        console.log(text);
        const newData = state.filter(function(item) {
          const itemData = item.time ? item.time.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setTextL(text);
        setData(newData);
    }

    return <ScrollView forceInset={{top:'always'}}>
        
        <NavigationEvents onWillFocus={fetchEntries}/>
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
            data ={state}
            keyExtractor={item=>item._id}
            renderItem = {({item})=>{
                return <Spacer><ListItem
                                title = {moment(item.time, "YYYY-MM-DDTHH:mm:ss.sssZ").format("dddd, MMMM Do YYYY, h:mm:ss a")}
                                bottomDivider
                            /></Spacer>
            }}


        />
       
    
    </ScrollView>
};
EntryListScreen.navigationOptions ={
    title: 'Historial',
    tabBarIcon: <Feather name="list" size={20}/>
};
const styles = StyleSheet.create({});
export default EntryListScreen;