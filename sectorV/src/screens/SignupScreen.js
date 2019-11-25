//TODO: FIX fields. name, fecha etc...
import React,{useContext,useState} from 'react';
import {View,StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import NavLink from '../components/NavLink';
import {NavigationEvents} from 'react-navigation';
import {Text,Input, Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import Constants from 'expo-constants';
import GoogleSigninButton from '../components/GoogleSignInButton';

const SignupScreen = ()=>{
    const {state:{errorMessage},signup,signupWithGoogle,clearErrorMessage} 
        = useContext(AuthContext);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [name,setName] = useState('');
    const [error,setError] = useState('');

    function fieldsOk(){
        var res = false;
        var re = /\S+@\S+\.\S+/;
        if(!re.test(email)){
            setError('Correo inválido.');
        }else if(password != confirmPassword){
            setError('Las contraseñas no coinciden.');
        }else if(password.length<8){
            setError('Contraseña muy corta.');
        }else if(name==''){
            setError('Falta nombre.');
        }else{
            res = true;
        }
        return res;
    }

    return (
        <SafeAreaView style = {styles.container}>
            <ScrollView>
                <NavigationEvents
                    onWillBlur={clearErrorMessage}
                />
                <Spacer>
                    <Text h3>Regístrate en Sector V</Text>
                </Spacer>
                <GoogleSigninButton
                    action = {signupWithGoogle}
                    text = "Regístrate con Google"
                />
                <Spacer>
                    <Text h4>O regístrate con tu correo electrónico</Text>
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
                    label="Confirma contraseña"
                    value = {confirmPassword}
                    onChangeText = {setConfirmPassword}
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
                {error ? <Text style={styles.errorMessage}>{error}</Text>:null}
                <Spacer>
                    <Button title="Regístrate" onPress={()=>{
                        if(fieldsOk()){
                            signup({email,password,name});
                        }
                    }}/>
                </Spacer>
                <NavLink
                    routeName="Signin"
                    text = "¿Ya tienes cuenta? Inicia sesión"
                />
            </ScrollView>
        </SafeAreaView >
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
        marginTop: Constants.statusBarHeight
    },errorMessage:{
        fontSize:16,
        color: 'red',
        marginLeft:15,
        marginTop:15,
    }
});

export default SignupScreen;