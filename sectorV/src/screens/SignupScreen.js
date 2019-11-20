//TODO: FIX fields. name, fecha etc...
import React,{useContext,useState} from 'react';
import {View,StyleSheet} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import NavLink from '../components/NavLink';
import {NavigationEvents} from 'react-navigation';
import {Text,Input, Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import GoogleSigninButton from '../components/GoogleSignInButton';
import * as Google from 'expo-google-app-auth';
import {AsyncStorage} from 'react-native';

const SignupScreen = ({navigation})=>{
    const {state:{errorMessage},signup,signupWithGoogle,clearErrorMessage} = useContext(AuthContext);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');

    async function  signInWithGoogleAsync () {
        try {
            const {idToken,accessToken,type} = await Google.logInAsync({
                behavior:'web',
                androidClientId: '750419774789-okk82pd6ejdoqihsln2o792qb4mrpb9g.apps.googleusercontent.com',
                iosClientId: '750419774789-ca66i9k7ntfc963sgqrgvi31k3n8qs3s.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });
            if (type === 'success') {
                signupWithGoogle({idToken,
                    accessToken}
                );
                
                if(errorMessage == ''){
                    const roleJSON = await AsyncStorage.getItem('role');
                    if(roleJSON){
                        try {
                            role = JSON.parse(roleJSON);
                            if(role==0){
                                navigate('Report');
                            }else if(role==1){
                                navigate('CodeBar');
                            }
                        } catch (e) {
                            console.error('AsyncStorage#getItem error deserializing JSON for key: role' +  e.message);
                        }   
                    }else{
                        navigate('Signin');
                    }
                    navigation.navigate('CodeBar');
                }
                //console.log(result.accessToken);
                return accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    return (
        <View style = {styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />
            <Spacer>
                <Text h3>Regístrate en Sector V</Text>
            </Spacer>
            <GoogleSigninButton
                action = {()=>signInWithGoogleAsync()}
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
        marginBottom: 75
    },errorMessage:{
        fontSize:16,
        color: 'red',
        marginLeft:15,
        marginTop:15,
    }
});

export default SignupScreen;