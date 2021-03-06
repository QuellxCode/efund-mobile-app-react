import React from 'react';
import { createSwitchNavigator, createAppContainer, NavigationActions } from "react-navigation";
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
import Notification from "../screens/MainFlow/Notification";
import NotificationNew from "../screens/MainFlow/NotificationsNew";
import NotificationDeta from "../screens/MainFlow/NotificationDetail";
import EditRejected from "../screens/MainFlow/EditRejected";
import EditableForm from "../screens/MainFlow/Editableform";
import EditRequestPaymentScreen from '../screens/MainFlow/RequestPaymentFlow/EditRequestPaymentScreen';
import EditPage from '../screens/MainFlow/RequestPaymentFlow/EditPage';
import Clearpayorder from '../screens/MainFlow/Clearpayorder';
import DirectorNotification from '../screens/MainFlow/DirectorNotification';
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
            GenerateBill: GenerateBillScreen,
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
        notify: createStackNavigator({
            Notification: NotificationNew,
            NotificationDeta: NotificationDeta,
            DirectorNotification: DirectorNotification,
            // EditableForm: EditableForm,
            EditRequestPaymentScreen:EditRequestPaymentScreen,
            EditPage: EditPage,
            
            
        },
        {
            initialRouteName: 'Notification',
            defaultNavigationOptions: {
                headerShown: false
            }
        }),
        generate: createStackNavigator({
            GeneratePayOrder: GeneratePayOrderScreen,
            Clearpayorder: Clearpayorder,
        },
        {
            initialRouteName: 'GeneratePayOrder',
            defaultNavigationOptions: {
                headerShown: false
            }
        }),
        Reports: ReportsScreen,
        Wallet: WalletScreen,
        Settings: SettingsScreen
    },
    {
        initialRouteName: 'Home',
        contentComponent: () => <MenuDrawer />
    })
});

export default createAppContainer(AppNavigator);