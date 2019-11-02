//TODO: FIX fields. name, fecha etc...
import React,{useContext,useState} from 'react';
import {View,StyleSheet} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import NavLink from '../components/NavLink';
import {NavigationEvents} from 'react-navigation';
import {Text,Input, Button} from 'react-native-elements';
import Spacer from '../components/Spacer';

const SignupScreen = ({navigation})=>{
    const {state:{errorMessage},signup,clearErrorMessage} = useContext(AuthContext);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    return (
        <View style = {styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />
            <Spacer>
                <Text h3>Regístrate en Sector V</Text>
            </Spacer>
            {/* Falta validación regex de correo y un Input para confirmar contraseña. */}
            <Input 
                label = "Correo electrónico"
                value = {email}
                onChangeText = {setEmail}
                autoCapitalize="none"
                autoCorrect = {false}
            />
            <Spacer/>
            <Input 
                label="Contraseña"
                value = {password}
                onChangeText = {setPassword}
                autoCapitalize="none"
                autoCorrect = {false}
                secureTextEntry
            />
            <Spacer/>
            <Input 
                label="Nombre completo"
                value = {name}
                onChangeText = {setName}
                autoCorrect = {false}
            />
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text>:null}
            <Spacer>
                <Button title="Regístrate" onPress={()=>signup({email,password,name})}/>
            </Spacer>
            <NavLink
                routeName="Signin"
                text = "¿Ya tienes cuenta? Inicia sesión"
            />
            
        </View >
    );
};

SignupScreen.navigationOptions = () =>{
    return {
        header: null,
    };
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        marginBottom: 200
    },errorMessage:{
        fontSize:16,
        color: 'red',
        marginLeft:15,
        marginTop:15,
    }
});

export default SignupScreen;