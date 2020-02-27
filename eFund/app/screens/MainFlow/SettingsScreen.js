import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
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
            name: 'Abdul Aziz',
            editName: false,
            email: 'aziz@gmail.com',
            password: 'password',
            editPassword: false,
            phone: '+92-335-5199903',
            editPhone: false,
            originalProfile: { name: 'Abdul Aziz', email: 'aziz@gmail.com', password: 'password', phone: '+92-335-5199903' }
        };
    }

    render() {
        console.log(this.state);
        return (
            <View>
                <Header />
                <ScrollView style={{ marginBottom: 40 }}>
                    <View style={{ margin: 20 }}>
                        <Text style={MainFlowStyles.headerTextStyle}>Settings</Text>

                        <View style={[MainFlowStyles.cardStyle, { paddingHorizontal: 10 }]}>
                            <View style={{ width: 80, height: 80, borderRadius: 80 / 2, backgroundColor: '#FF3301', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 20 }}>
                                <Ionicons name='md-person' size={30} color='white' />
                            </View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginBottom: 2 }}>Abdul Aziz</Text>
                            <Text style={{ alignSelf: 'center', marginBottom: 20 }}>Purchaser</Text>

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
                                value={this.state.email}
                                onChangeText={(value) => this.setState({ email: value })}
                            />

                            <Input
                                editable={this.state.editPassword}
                                secureTextEntry={true}
                                placeholder='********'
                                autoCapitalize='none'
                                autoCorrect={false}
                                autoCompleteType='off'
                                keyboardType='default'
                                inputStyle={{ marginLeft: 14 }}
                                inputContainerStyle={{ borderBottomColor: '#FF3301' }}
                                containerStyle={{ marginBottom: 20 }}
                                leftIcon={ <MaterialCommunityIcons name='lock' size={22} color='#FF3301' /> }
                                leftIconContainerStyle={{ marginLeft: 0 }}
                                rightIcon={
                                    <TouchableOpacity onPress={() => this.setState({ editPassword: true })}>
                                        <FontAwesome5 name='pen' size={18} color='#FF3301' />
                                    </TouchableOpacity>
                                }
                                value={this.state.password}
                                onChangeText={(value) => this.setState({ password: value })}
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