//TODO: FIX fields. name, fecha etc...
import React,{useContext} from 'react';
import {View,Text,StyleSheet} from 'react-native';
// import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
// import {NavigationEvents} from 'react-navigation';

const SignupScreen = ({navigation})=>{
    // const {state,signup,clearErrorMessage} = useContext(AuthContext);

    return (
        <View style = {styles.container}>
            {/* <NavigationEvents
                onWillBlur={clearErrorMessage}
            /> */}
            <AuthForm
                headerText="Regístrate en Sector V"
                errorMessage={null}
                submitButtonText="Regístrate"
                onSubmit = {null}
            />
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
    }
});

export default SignupScreen;