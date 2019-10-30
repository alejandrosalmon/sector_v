import React, { useContext } from 'react';
import {View,Text,StyleSheet} from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
// import {NavigationEvents} from 'react-navigation';
// import {Context} from '../context/AuthContext';

const SigninScreen = ()=>{
    // const {state,signin,clearErrorMessage} = useContext(Context);
    return(
        <View style = {styles.container}>
            {/* <NavigationEvents
                onWillBlur={clearErrorMessage}
            /> */}
            <AuthForm
                headerText="Inicia sesión en Sector V"
                errorMessage={null}
                onSubmit={null}
                submitButtonText="Inicia sesión"
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