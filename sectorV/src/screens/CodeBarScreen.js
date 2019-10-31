import React, {useContext} from 'react';
import {View,StyleSheet,Button} from 'react-native';
// import {Button} from 'react-native-elements';
// import Spacer from '../components/Spacer';
// import {Context as AuthContext} from '../context/AuthContext';
import {SafeAreaView, NavigationEvents} from 'react-navigation';
import {Text, Image} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Ionicons} from '@expo/vector-icons';
import {Context as EntryContext} from '../context/EntryContext';
import {Context as ProfileContext} from '../context/ProfileContext';
import {Context as PackageContext} from '../context/PackageContext';

const CodeBarScreen = ()=>{
    const {state:userState, fetchProfiles}=useContext(ProfileContext);
    const {state:entryState, fetchEntriesMonth, registerEntry}=useContext(EntryContext);
    const {state:packageState, fetchPackage}=useContext(PackageContext);
    //const leftEntries = Object.keys(entry).length;
    return(
        <SafeAreaView forceInset={{top:'always'}}>
            <NavigationEvents onWillFocus={()=>{
                fetchProfiles();
                fetchPackage();
                fetchEntriesMonth();
            }}/>
            <Spacer>
                <Text h3>Inicio</Text>
            </Spacer>
            <Spacer>
                <Text style={styles.name}>{userState.name}</Text>
            </Spacer>
            <View style={styles.container}>
                <Image
                    source={{ uri: '../../assets/codebar.png' }}
                    style={styles.image}
                />
                <Text>{userState.credential_id}</Text>
            </View>
            <Spacer>
                <Text h4>Día de corte: {userState.due_date}</Text>
                <Text h4>Entradas Restantes: {packageState.entries_per_month - entryState.length}</Text>
            </Spacer>
            <Spacer>
                <Button
                    title = "Registrar entrada"
                    onPress = {()=>{
                        registerEntry();
                        fetchEntriesMonth();
                    }}
                />
            </Spacer>
        </SafeAreaView>
    );
};
CodeBarScreen.navigationOptions ={
    title: 'Inicio',
    tabBarIcon: <Ionicons name="ios-barcode" size={20}/>
};
const styles = StyleSheet.create({
    name: {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 36
    },
    image:{
        width: 350,
        height: 150
    },
    container:{
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default CodeBarScreen;