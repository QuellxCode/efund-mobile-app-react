import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import Header from '../../components/Header';
import MainFlowStyles from '../../Styles/MainFlowStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, Button } from 'react-native-elements';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: [],
            state: false,
            name: 'Abdul Aziz',
            editName: false,
            email: 'aziz@gmail.com',
            password: 'password',
            editPassword: false,
            phone: '+92-335-5199903',
            editPhone: false,
            originalProfile: []
        };
    }

    componentDidUpdate(){
        if(this.state.state === true){
            this._retrieveData();
          this.setState({state: false});
        }
      }

    componentDidMount() {
        this._retrieveData();
      }
      _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('User');
          const val = JSON.parse(value)
          if (val !== null) {
            this.setState({
              User: val,
              originalProfile: val,
              name: val.name,
              phone: val.phone
             })
             //console.log(this.state.User)
          }
        } catch (error) {
          console.log('error getting data')
        }
      };
      _getCash(){
        var New = this.state.User;
        fetch("http://efundapp.herokuapp.com/api/user/profile",{
      method:"PATCH",
        headers: {
          'Accept': 'application/json',
         'Content-Type': 'application/json',
         'X-Auth-Token': this.state.User.token,
       },
       body:JSON.stringify({
        "name": this.state.name,
        "phone": this.state.phone,
        "cnic": this.state.User.cnic,
        "email": this.state.User.email
      })
      })
      .then(response => response.json())
      .then(async (responseJson)=> {
        New.name = responseJson.name;
        New.phone = responseJson.phone;
        console.log('hello')
        console.log(New);
       await AsyncStorage.setItem('User', JSON.stringify(New));
        this.setState({
          state: true
         })
        })
       .catch(error=>console.log(error))
         }

    render() {
       // console.log(this.state);
        return (
            <View>
                <Header />
                <ScrollView style={{ marginBottom: 40 }}>
                    <View style={{ margin: 20, marginTop: 1 }}>
                        <Text style={MainFlowStyles.headerTextStyle}>Settings</Text>

                        <View style={[MainFlowStyles.cardStyle, { paddingHorizontal: 10, marginTop: -13 }]}>
                            <View style={{ width: 80, height: 80, borderRadius: 80 / 2, backgroundColor: '#FF3301', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 10 }}>
                                <Ionicons name='md-person' size={30} color='white' />
                            </View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginBottom: 2 }}>{this.state.User.name}</Text>
                                <Text style={{ alignSelf: 'center', marginBottom: 10 }}>{this.state.User.roles}</Text>

                            <Input
                                editable={this.state.editName}
                                placeholder='Name'
                                autoCapitalize='words'
                                autoCompleteType='name'
                                inputStyle={{ marginLeft: 14 }}
                                inputContainerStyle={{ borderBottomColor: '#FF3301' }}
                                containerStyle={{ marginBottom: 20 }}
                                leftIcon={ <Ionicons name='md-person' size={22} color='#FF3301' /> }
                                leftIconContainerStyle={{ marginLeft: 0 }}
                                rightIcon={
                                    <TouchableOpacity onPress={() =>  this.setState({ editName: true })}>
                                        <FontAwesome5 name='pen' size={18} color='#FF3301' />
                                    </TouchableOpacity>
                                }
                                value={this.state.name}
                                onChangeText={(value) => this.setState({ name: value })}
                            />

                            <Input
                                editable={this.state.editPassword}
                                placeholder='abc@gmail.com'
                                autoCapitalize='none'
                                autoCorrect={false}
                                autoCompleteType='email'
                                keyboardType='email-address'
                                inputStyle={{ marginLeft: 14 }}
                                inputContainerStyle={{ borderBottomColor: '#FF3301' }}
                                containerStyle={{ marginBottom: 20 }}
                                leftIcon={ <MaterialCommunityIcons name='email' size={22} color='#FF3301' /> }
                                leftIconContainerStyle={{ marginLeft: 0 }}
                                value={this.state.User.email}
                            />

                            <Input
                                editable={this.state.editPassword}
                                placeholder='421XX-XXXXXX-X'
                                autoCapitalize='none'
                                autoCorrect={false}
                                autoCompleteType='off'
                                keyboardType='default'
                                inputStyle={{ marginLeft: 14 }}
                                inputContainerStyle={{ borderBottomColor: '#FF3301' }}
                                containerStyle={{ marginBottom: 20 }}
                                leftIcon={ <MaterialCommunityIcons name='lock' size={22} color='#FF3301' /> }
                                leftIconContainerStyle={{ marginLeft: 0 }}
                                value={JSON.stringify(this.state.User.cnic)}
                            />

                            <Input
                                editable={this.state.editPhone}
                                placeholder='+92-3xx-xxxxxxx'
                                autoCapitalize='none'
                                autoCorrect={false}
                                autoCompleteType='tel'
                                keyboardType='number-pad'
                                inputStyle={{ marginLeft: 14 }}
                                inputContainerStyle={{ borderBottomColor: '#FF3301' }}
                                containerStyle={{ marginBottom: 20 }}
                                leftIcon={ <FontAwesome name='phone' size={22} color='#FF3301' /> }
                                leftIconContainerStyle={{ marginLeft: 0 }}
                                rightIcon={
                                    <TouchableOpacity onPress={() => this.setState({ editPhone: true })}>
                                        <FontAwesome5 name='pen' size={18} color='#FF3301' />
                                    </TouchableOpacity>
                                }
                                value={this.state.phone}
                                onChangeText={(value) => this.setState({ phone: value })}
                            />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginBottom: 10 }}>
                                <Button
                                    title='Cancel'
                                    buttonStyle={{ backgroundColor: 'white', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 10, borderColor: '#FF3301', borderWidth: 2 }}
                                    titleStyle={{ color: 'black' }}
                                    onPress={() => {
                                        this.setState({
                                            name: this.state.originalProfile.name,
                                            editName: false,
                                            email: this.state.originalProfile.email,
                                            password: this.state.originalProfile.password,
                                            editPassword: false,
                                            phone: this.state.originalProfile.phone,
                                            editPhone: false
                                        })
                                    }}
                                />
                                <Button
                                    title='Update'
                                    buttonStyle={{ backgroundColor: '#FF3301', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 10, borderColor: '#FF3301', borderWidth: 2 }}
                                    onPress={() => {
                                        let name = this.state.name;
                                        let email = this.state.email;
                                        let password = this.state.password;
                                        let phone = this.state.phone;
                                        this.setState({
                                            editName: false,
                                            editPassword: false,
                                            editPhone: false,
                                            originalProfile: { name, email, password, phone }
                                        })
                                        this._getCash();
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Settings;