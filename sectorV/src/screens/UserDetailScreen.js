import React,{useContext} from 'react';
import {View,StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as UserContext} from "../context/UserContext";

const UserDetailScreen = ({navigation})=>{
    const {state} = useContext(UserContext);
    const _id = navigation.getParam('_id');
    const User = state.find(u => u._id===_id);

    return (
        <>
            <Spacer>
                <Text h3>{User.name}</Text>
            </Spacer>
            <Spacer>
                <Text style={styles.text}>{User.email}</Text>
            </Spacer>
            <Spacer>
                <Text style={styles.text}>Día de corte: {User.due_date}</Text>
            </Spacer>
            <Spacer>
                <Text style={styles.text}>Paquete contratado: {User.package? User.package.name:'ninguno'}</Text>
            </Spacer>
            
        </>
        
    );
};

UserDetailScreen.navigationOptions ={
    title: 'Alumno'
};
const styles = StyleSheet.create({
    text:{
        fontSize:24
    }
});
export default UserDetailScreen;