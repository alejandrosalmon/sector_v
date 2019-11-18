import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
                onPress={action}
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