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
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import {Feather} from '@expo/vector-icons';
import {setNavigator} from './src/navigationRef';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as PackageProvider} from './src/context/PackageContext';
import {Provider as UserProvider} from './src/context/UserContext';
import {Provider as EntryProvider} from './src/context/EntryContext';

const userListflow = createStackNavigator({
  UserList: UserListScreen,
  UserDetail: UserDetailScreen
});

userListflow.navigationOptions ={
  title: 'Alumnos',
  tabBarIcon: <Feather name="users" size={20}/>
};

const switchNavigator = createSwitchNavigator({
  ResolveAuth:ResolveAuthScreen,
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
    <EntryProvider>
      <UserProvider>
        <PackageProvider>
            <AuthProvider>
              <App ref = {(navigator)=>{setNavigator(navigator)}}/>
            </AuthProvider>
          </PackageProvider>
      </UserProvider>
    </EntryProvider>
  );
};