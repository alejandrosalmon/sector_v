import React, {useContext} from 'react';
import {View, StyleSheet, Button, Image} from 'react-native';
import {Text} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {SafeAreaView} from 'react-navigation';
import {Feather} from '@expo/vector-icons';
import { Context as ProfileContext } from "../context/ProfileContext";
import {NavigationEvents} from 'react-navigation';
const moment=require('moment');

moment.updateLocale('es', {
    months : 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort : 'ene._feb._mar_abr._may_jun_jul._ago_sep._oct._nov._dec.'.split('_'),
    monthsParseExact : true,
    weekdays : 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
    weekdaysParseExact : true,
});

const AccountScreen = ()=>{
    const {signout} = useContext(AuthContext);
    const {state, fetchProfiles}=useContext(ProfileContext);
    return(
        <SafeAreaView forceInset={{top:'always'}} style={styles.infoContainer}>
            <NavigationEvents onWillFocus={fetchProfiles}/>
            <Text h3> {state.name} </Text>
            <Text h4> {state.email} </Text>
            <Text h4> {state.role == '0'?'Admin':"Alumno"}</Text>
            <Spacer/>
            <Text h4> Fecha de Registro </Text>
            <Text style={{fontSize: 18}}>{moment(state.registration_time, "YYYY-MM-DDTHH:mm:ss.sssZ").format("dddd, MMMM Do YYYY, h:mm:ss a")} </Text>

            <Spacer/>
            <Button
                title="Cerrar sesión"
                onPress={signout}
            />
        </SafeAreaView>
    
    );
};
AccountScreen.navigationOptions ={
    title: 'Cuenta',
    tabBarIcon: <Feather name="settings" size={20}/>
};

export default AccountScreen;
const styles = StyleSheet.create({
infoContainer:{
    alignItems: "center",
    justifyContent: "center",
    flex: 1
},
});

