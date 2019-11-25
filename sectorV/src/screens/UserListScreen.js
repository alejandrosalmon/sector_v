import React,{useContext, useState} from 'react';
import {Text,StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import { Context as UserContext } from "../context/UserContext";
import {ListItem, SearchBar} from 'react-native-elements';


const UserListScreen = ({navigation})=>{
    const [textS, setTextS] = useState('');
    const [data, setData] = useState([]);
    const {state, fetchUsers}=useContext(UserContext);

    function SearchFilterFunction(text) {
        console.log(text);
        const newData = state.filter(function(item) {
          const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setTextS(text);
        setData(newData);
    }

    return <>
        <NavigationEvents onWillFocus={()=>{
            fetchUsers();
            setData(state);
            }}/>
        <SearchBar
          round
          lightTheme
          searchIcon={{ size: 24 }}
          onChangeText={text => SearchFilterFunction(text)}
          onClear={text => SearchFilterFunction('')}
          placeholder="Buscar..."
          value={textS}
        />
        <FlatList
            data ={data}
            keyExtractor={item=>item._id}
            renderItem = {({item,index})=>{
                return <TouchableOpacity
                    onPress = {()=>navigation.navigate('UserDetail',{_id:item._id})}
                >
                    <ListItem
                        chevron

                        title = {`${(index+1)}. ${item.name}`}
                    />
                </TouchableOpacity>
            }}
        />
    </>
};
UserListScreen.navigationOptions ={
    title: 'Alumnos'
};
const styles = StyleSheet.create({});
export default UserListScreen;