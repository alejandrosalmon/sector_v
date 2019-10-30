import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import CodeBarScreen from './src/screens/CodeBarScreen';
import PackageListScreen from './src/screens/PackageListScreen';
import EntryListScreen from './src/screens/EntryListScreen';
import ReportScreen from './src/screens/ReportScreen';
import UserListScreen from './src/screens/UserListScreen';
import UserDetailScreen from './src/screens/UserDetailScreen';
import {FontAwesome} from '@expo/vector-icons';
import {setNavigator} from './src/navigationRef';
import {Provider as AuthProvider} from './src/context/AuthContext';

const userListflow = createStackNavigator({
  UserList: UserListScreen,
  UserDetail: UserDetailScreen
});

userListflow.navigationOptions ={
  title: 'Users',
  tabBarIcon: <FontAwesome name="th-list" size={20}/>
};

const switchNavigator = createSwitchNavigator({
  loginFlow:createStackNavigator({
    Signin:SigninScreen,
    Signup:SignupScreen    
  }),
  adminFlow: createBottomTabNavigator({
    Report: ReportScreen,
    PackageList: PackageListScreen,
    userListflow,
    Account:AccountScreen
  }),
  userFlow: createBottomTabNavigator({
    CodeBar: CodeBarScreen,
    EntryList: EntryListScreen,
    Account:AccountScreen
  })
});

const App= createAppContainer(switchNavigator);

export default() =>{
  return (
    <AuthProvider>
      <App ref = {(navigator)=>{setNavigator(navigator)}}/>
    </AuthProvider> 
  );
};