import React, {useContext} from 'react';
import {View,Text,StyleSheet} from 'react-native';
// import {Button} from 'react-native-elements';
// import Spacer from '../components/Spacer';
// import {Context as AuthContext} from '../context/AuthContext';
// import {SafeAreaView} from 'react-navigation';

const EntryListScreen = ()=>{
    // const {signout} = useContext(AuthContext);
    return(
        <Text style={{fontSize:48}}>EntryListScreen</Text>
        // <SafeAreaView forceInset={{top:'always'}}>
        //     <Text style={{fontSize:48}}>Account screen</Text>
        //     <Spacer>
        //         <Button title="Sign out" onPress={signout}/>
        //     </Spacer>
        // </SafeAreaView>
    );
};

const styles = StyleSheet.create({});
export default EntryListScreen;