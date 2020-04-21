import React, { Component } from 'react';
import { View, Text, ImageBackground, ScrollView, ToastAndroid, KeyboardAvoidingView, StatusBar, AsyncStorage, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Input, CheckBox, Button } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../Styles/AuthStyles';
import CustomButton from '../../components/CustomButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            email: '',
            password: '',
            checked: false,
            viewS: true,
            spinner: true,
        };
    }

    componentDidMount(){
        this.checkStorge();
      }
    
      checkStorge = async () => {
          try {
            const value = await AsyncStorage.getItem('User');
            if (value !== null) {
              this.props.navigation.navigate("mainFlow")
              this.setState({spinner: false})
            }
          } catch (error) {
            console.log('error getting data')
          }
        };

    getdata(){
        fetch("http://efundapp.herokuapp.com/api/user/login",{
        method:"POST",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
           "email":this.state.email,
           "password":this.state.password
         })
        })
    .then(response => response.json())
    .then(async (responseJson)=> {
          await AsyncStorage.setItem('User', JSON.stringify(responseJson));
          this.setState({
            loading: false,
           })
           console.log(responseJson)
      if(responseJson.message == 'login successfull'){
        ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
        this.props.navigation.navigate("mainFlow")}
      else{
        ToastAndroid.show('Incorrect Credentials!', ToastAndroid.SHORT);
      }
      })
    .catch(error=>ToastAndroid.show('Incorrect Credentials!', ToastAndroid.SHORT)
    )
    }

    SecureView(){
      if(this.state.viewS == true){
        this.setState({viewS:false})
      }
      if(this.state.viewS == false){
        this.setState({viewS:true})
      }
    }

    render() {
      if(this.state.spinner == true){
        return(
          <ActivityIndicator/>
        )
      }
      else{
        return (
            // <StatusBar translucent backgroundColor='#FF3301' barStyle="light-content" />
            
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
                <View style={styles.formStyle, {marginTop: -10}}>
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
                        onChangeText={email => this.setState({email})}
                    />

                    <Input
                        secureTextEntry={this.state.viewS}
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
                        onChangeText={password => this.setState({password})}
                        rightIcon={
                          <TouchableOpacity onPress={() =>  this.SecureView()}>
                              <FontAwesome5 name='eye' size={18} color='#FF3301' />
                          </TouchableOpacity>
                      }
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

                    {/* <CustomButton
                        
                        text='Sign In'
                    /> */}
                    <Button
                    title="Sign In"
                    buttonStyle={{backgroundColor: '#FF3301', padding: 14, borderRadius: 10}}
                    containerStyle={[{ marginHorizontal: 10, marginTop:-10 }]}
                    onPress={() => this.getdata()}
                    />
                </View>
            </ScrollView>
        );
                  }
    }
}

export default LoginScreen;