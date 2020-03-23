import React from 'react';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import { createDrawerNavigator } from "react-navigation-drawer";
import DashboardScreen from "../screens/MainFlow/DashboardScreen";
import ProjectList from "../screens/MainFlow/RequestPaymentFlow/ProjectList";
import RequestPaymentScreen from '../screens/MainFlow/RequestPaymentFlow/RequestPaymentScreen';
import GenerateBillScreen from '../screens/MainFlow/RequestPaymentFlow/GenerateBillScreen';
import ClaimPaymentScreen from '../screens/MainFlow/ClaimPaymentScreen';
import GeneratePayOrderScreen from '../screens/MainFlow/GeneratePayOrderScreen';
import ReportsScreen from '../screens/MainFlow/ReportsScreen';
import WalletScreen from '../screens/MainFlow/WalletScreen';
import NotificationScreen from '../screens/MainFlow/NotificationScreen';
import SettingsScreen from '../screens/MainFlow/SettingsScreen';
import ClaimDropDown from "../screens/MainFlow/ClaimDropDown";
import MenuDrawer from "../components/MenuDrawer";

const AppNavigator = createSwitchNavigator({
    loginFlow: createStackNavigator({
        Login: LoginScreen
    },
    {
        initialRouteName: 'Login',
        defaultNavigationOptions: {
            headerShown: false
        }
    }),
    mainFlow: createDrawerNavigator({
        Home: DashboardScreen,
        requestPaymentFlow: createStackNavigator({
            Projects: ProjectList,
            RequestPayment: RequestPaymentScreen,
            GenerateBill: GenerateBillScreen
        },
        {
            initialRouteName: 'RequestPayment',
            defaultNavigationOptions: {
                headerShown: false
            }
        }),
        claim: createStackNavigator({
            ClaimDropDown: ClaimDropDown,
            ClaimPayment: ClaimPaymentScreen,
        },
        {
            initialRouteName: 'ClaimDropDown',
            defaultNavigationOptions: {
                headerShown: false
            }
        }),
        GeneratePayOrder: GeneratePayOrderScreen,
        Reports: ReportsScreen,
        Wallet: WalletScreen,
        Notifications: NotificationScreen,
        Settings: SettingsScreen
    },
    {
        initialRouteName: 'Home',
        contentComponent: () => <MenuDrawer />
    })
});

export default createAppContainer(AppNavigator);