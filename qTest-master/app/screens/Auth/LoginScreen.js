import React, { Component } from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../Styles/AuthStyles';
import CustomButton from '../../components/CustomButton';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
    }

    render() {
        return (
            <ScrollView>
                <View style={{ marginBottom: 20 }}>
                    <ImageBackground
                        source={require('../../images/SigninTop.jpg')}
                        style={styles.imageBackgroundStyle}
                        resizeMode='cover'
                    >
                        <Text style={styles.logoTextStyle}>E-Fund</Text>
                    </ImageBackground>
                </View>
                <View style={styles.formStyle}>
                    <Text style={styles.headerStyle}>Sign In</Text>
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
                    />

                    <Input
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
                    />

                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <CheckBox
                            title='Remember Me'
                            textStyle={styles.checkBoxTextStyle}
                            containerStyle={styles.checkBoxContainerStyle}
                            checked={this.state.checked}
                            checkedColor='#FF3301'
                            onPress={() => this.setState({ checked: !this.state.checked })}
                        />
                        <Text style={styles.fpStyle}>Forgot password?</Text>
                    </View>

                    <CustomButton
                        routeName='mainFlow'
                        text='Sign In'
                    />
                </View>
            </ScrollView>
        );
    }
}

export default LoginScreen;