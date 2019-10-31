import React from 'react';
import {View,StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';

const Spacer = ({number, text}) =>{
    return <View style={styles.card}>
        <Text style={styles.number}>{number}</Text>
        <View style={{margin:8}}/>
        <Text style={styles.text}>{text}</Text>
    </View>
};

const styles = StyleSheet.create({
    card:{
        borderWidth:2,
        borderColor:'#d9d9d9',
        alignItems: 'center',
        paddingHorizontal:16,
        paddingVertical:48
    },
    number:{
        fontSize:48
    },
    text:{
        fontSize:28,
        color:'#212121'
    }
});

export default Spacer;