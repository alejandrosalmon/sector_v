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
    Signup:SignupScreen,
    Signin:SigninScreen
  }),
  adminFlow: createBottomTabNavigator({
    Report: ReportScreen,
    PackageList: PackageListScreen,
    userListflow,
    Account:AccountScreen
  }),
  userFlow: createBottomTabNavigator({
    EntryList: EntryListScreen,
    CodeBar: CodeBarScreen,
    Account:AccountScreen
  })
});

const App= createAppContainer(switchNavigator);

export default() =>{
  return (
      <App/> 
    // <App ref = {(navigator)=>{setNavigator(navigator)}}/>
  );
};