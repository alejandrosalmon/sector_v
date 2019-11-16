import React,{useContext, useState} from 'react';
import {Text,StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import { Context as UserContext } from "../context/UserContext";
import {ListItem, SearchBar} from 'react-native-elements';


const UserListScreen = ({navigation})=>{
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const {state, fetchUsers}=useContext(UserContext);

    

    return <>
        <NavigationEvents onWillFocus={()=>{
            fetchUsers();
            setData(state);
            }}/>
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