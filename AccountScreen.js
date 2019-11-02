import React, {useContext} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {Text, Image} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {SafeAreaView} from 'react-navigation';
import {Feather} from '@expo/vector-icons';
import { Context as ProfileContext } from "../context/ProfileContext";
import {NavigationEvents} from 'react-navigation';
import {ScrollView} from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';

const AccountScreen = ()=>{
    const {signout} = useContext(AuthContext);
    const {state, fetchProfiles}=useContext(ProfileContext);
    return(
        <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleBar}>
                <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
                <Ionicons name="md-more" size={24} color="#52575D"></Ionicons>
            </View>

            <View style={{alignSelf:"center"}}>
                <View style={styles.profileImage}>
                    <Image source={require('../../assets/profile-pic.jpg')} style={styles.image} resizeMode="center"></Image>
                </View>
                <View style={styles.dm}>
                    <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                </View>
                <View style={styles.active}></View>
                <View style={styles.add}> 
                    <Ionicons name= "ios-add" size={48} color="#DFD8C8" style={{marginTop: 6, marginLeft: 2}}></Ionicons>
                </View>
            </View>


            <View style={styles.infoContainer}>
                <Text style = {[styles.text, {fontWeight: "200", fontSize: 36}]}> {state.name} </Text>
                <Text style = {[styles.text, {color: "#AEB5BC", fontSize: 26}]}> {state.email} </Text>
                <Text style = {[styles.text, {color:"#AEB5BC", fontSize: 20}]}> Rol: {state.role == '0'?'Admin':"Alumno"}</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                    <Text style={[styles.text, {fontSize: 24}]}> 15 </Text>
                    <Text style={[styles.text, styles.subText]}> Entradas </Text>
                </View>

                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 2, borderRightWidth: 2}]}>
                    <Text style={[styles.text, {fontSize: 18}]}> Noviembre 1, 2019 </Text>
                    <Text style={[styles.text, styles.subText]}> Fecha de Registro </Text>
                </View>

            </View>

            <View style={{ marginTop: 32}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require('../../assets/bottom-acc.jpg')} style={styles.image} resizeMode="center"></Image>
                    </View>
                </ScrollView>           
            </View>
         </ScrollView>
        </SafeAreaView>
    );
};
AccountScreen.navigationOptions ={
    title: 'Cuenta',
    tabBarIcon: <Feather name="settings" size={20}/>
};

const styles = StyleSheet.create({
    role:{
        color:'blue'
    },

    container:{
        flex: 1,
        backgroundColor: "#fff"
    },
    
    text: {
       // fontFamily: "HelveticaNeue",
        color: "#52575D"
    },

    subText:{
        fontSize :12,
        color:"#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },

    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: "#FF8000"
    },

    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },

    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderColor: "#FF8000",
        overflow: "hidden"
    },

    dm: {
        backgroundColor: "#41444B",
        position:"absolute",
        top: 20,
        width: 40,
        height:40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },

    active:{
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },

    add: {

        backgroundColor: "#41444B",
        position:"absolute",
        bottom:0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },

    infoContainer:{
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },

    statsContainer:{
        flexDirection: "row",
        alignSelf: "center",
        marginTop:32
    },

    statsBox:{
        alignItems: "center",
        flex: 1
    },

    mediaImageContainer:{
        width: 100,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal:10
    }

});
export default AccountScreen;