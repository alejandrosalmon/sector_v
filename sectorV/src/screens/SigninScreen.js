import React, { useContext } from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {NavigationEvents} from 'react-navigation';
import {Context} from '../context/AuthContext';
import GoogleSigninButton from '../components/GoogleSignInButton';
import * as Google from 'expo-google-app-auth';

const SigninScreen = ({navigation})=>{
    const {state,signin,clearErrorMessage} = useContext(Context);

    async function  signInWithGoogleAsync () {
        try {
            const result = await Google.logInAsync({
                behavior:'web',
                androidClientId: '750419774789-okk82pd6ejdoqihsln2o792qb4mrpb9g.apps.googleusercontent.com',
                iosClientId: '750419774789-ca66i9k7ntfc963sgqrgvi31k3n8qs3s.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });
            if (result.type === 'success') {
                //navigation.navigate('');
                console.log(result.user);
                console.log(result.accessToken);
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    return(
        <View style = {styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />
            <AuthForm
                headerText="Inicia sesión en Sector V"
                errorMessage={state.errorMessage}
                onSubmit={signin}
                submitButtonText="Inicia sesión"
            />
            <GoogleSigninButton
                action = {()=>signInWithGoogleAsync()}
                text = "Inicia sesión con Google"
            />
            <NavLink
                routeName="Signup"
                text="¿No tienes cuenta? Regístrate"
            />
        </View>
    );
};

SigninScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        marginBottom: 200
    }
});

export default SigninScreen;