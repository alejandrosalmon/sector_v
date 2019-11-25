import React, {useContext, useState, useEffect} from 'react';
import {ActivityIndicator,View,StyleSheet,Button} from 'react-native';
import {SafeAreaView, NavigationEvents} from 'react-navigation';
import {Text, Image} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Ionicons} from '@expo/vector-icons';
import {Context as EntryContext} from '../context/EntryContext';
import {Context as ProfileContext} from '../context/ProfileContext';
import {Context as PackageContext} from '../context/PackageContext';
import { navigate } from '../navigationRef';
import {Notifications} from 'expo';
import registerForPushNotificationsAsync from '../registerForPushNotificationsAsync';

const CodeBarScreen = ()=>{
    const {state:userState, fetchProfiles}=useContext(ProfileContext);
    var {state: entryState, fetchEntriesMonth, registerEntry}=useContext(EntryContext);
    const {state:packageState, fetchPackage}=useContext(PackageContext);
    const [notification,setNotification] = useState({});
    const [loading, setLoading] = useState(true);

    function _handleNotification (notification) {
        setNotification({notification});
    };

    useEffect(() => {
        setLoading(false);
    }, [entryState]);

    return(
        <SafeAreaView forceInset={{top:'always'}}>

            <NavigationEvents onWillFocus={async ()=>{
                try{
                    await fetchProfiles();
                    await fetchPackage();
                    await fetchEntriesMonth();
                    await registerForPushNotificationsAsync();
                    _notificationSubscription = Notifications.addListener(_handleNotification);
                }catch(err){
                    console.log(err);
                }
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

                {
                    (packageState.entries_per_month && !loading && entryState.entries>0) && 
                    <Text h4>Día de corte: {userState.due_date}{"\n"}Entradas Restantes: {packageState.entries_per_month - entryState.entries <= 0 ? 0 : packageState.entries_per_month - entryState.entries.entries}</Text>
                }
                {
                    (!packageState.entries_per_month && !loading) && 
                    <Text h4>Sin paquetes registrados</Text>
                }
                {
                    loading &&
                    <ActivityIndicator size="large" color="#0000ff" />
                }

                {
                    notification
                    ?<Text>{notification.data}</Text>
                    :null
                }
            </Spacer>
            <Spacer>

                {
                    // in case a user registers an entry, then it blocks the button until it complete the registry.
                    loading &&
                    <Button
                        title = "Cargando..."
                        disabled
                    />
                }
                {
                    !loading &&
                    <Button
                        title = "Registrar entrada"
                        onPress = {() => {
                            setLoading(true);
                            registerEntry();
                            fetchEntriesMonth();
                        }}
                    />
                }

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
