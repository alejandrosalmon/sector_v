import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Google from 'expo-google-app-auth';
import {navigate} from '../navigationRef';

const googleIcon = {
  uri:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png',
};
const GoogleSignInButton = ({action,text}) =>{
    return(
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.touchable}
                onPress={async ()=>{
                    try {
                        const {idToken,accessToken,type} = await Google.logInAsync({
                            behavior:'web',
                            androidClientId: '750419774789-okk82pd6ejdoqihsln2o792qb4mrpb9g.apps.googleusercontent.com',
                            iosClientId: '750419774789-ca66i9k7ntfc963sgqrgvi31k3n8qs3s.apps.googleusercontent.com',
                            scopes: ['profile', 'email'],
                        });
                        if (type === 'success') {
                            await action({idToken,accessToken});
                        } else {
                            navigate('Signin');
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }}
            >
                <View style={styles.content}>
                    <Image source={googleIcon} style={styles.icon} />
                    <Text style={styles.text}>{text}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

}
export default GoogleSignInButton;

const styles = StyleSheet.create({
  touchable: {
      shadowColor: 'black',
      shadowOffset: { height: 1, width: 1 },
      shadowOpacity: 1,
      shadowRadius: 1.5,
      elevation: 2,
      backgroundColor: 'white',
      borderRadius: 4,
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent:'center'
    
  },
  container:{paddingHorizontal:16},
  icon: { width: 24, aspectRatio: 1 },
  text: { color: 'gray', marginLeft: 12, fontSize: 16, fontWeight: '600' },
});