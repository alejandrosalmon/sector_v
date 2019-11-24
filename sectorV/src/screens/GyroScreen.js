import React, {useState} from 'react';
import {SafeAreaView} from 'react-navigation';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Text, Dimensions} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import Spacer from '../components/Spacer';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import { round, getAnglesFromGyro } from '../util/gyro'

const GyroScreen = () => {
    Accelerometer.setUpdateInterval(1000);

    const [{x, y, z}, setGyroData] = useState({x:0, y:0, z:0});

    Accelerometer.addListener(result => {
        setGyroData(result);
    });

    return (
        <SafeAreaView forceInset={{top:'always'}}>
            <Spacer>
                <Text h3>Gyro</Text>
            </Spacer>
            <Spacer>
                <Text style={styles.angle}>{getAnglesFromGyro(z).toFixed(1)}°</Text>
            </Spacer>
            <Spacer>
                <Text>Sujeta el celular con la parte de atrás hacia el muro y la parte superior hacia arriba.</Text>
            </Spacer>
        </SafeAreaView>
    );
}

GyroScreen.navigationOptions ={
    title: 'Gyro',
    tabBarIcon: <MaterialCommunityIcons name="rotate-3d" size={20}/>
};

GyroScreen.componentWillUnmount = () => {
    Gyroscope.removeAllListeners();
}

const styles = StyleSheet.create({
    angle: {
        fontSize: 100,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    instructions: {
        fontSize: 12,
        textAlign: 'center',
    }
});

export default GyroScreen;