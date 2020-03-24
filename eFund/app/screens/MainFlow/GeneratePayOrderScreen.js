import React, { Component } from 'react';
import { View, Text, ScrollView, AsyncStorage, ToastAndroid, Picker, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import MainFlowStyles from '../../Styles/MainFlowStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDeisgn from 'react-native-vector-icons/AntDesign';
import { Input, Button } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-datepicker';
import CustomModal from '../../components/CustomModal';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

class GeneratePayOrderScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            amount:0,
            date: new Date(),
            description:'',
            User:[],
            banks: [],
            selectedBank: '',
            show: false,
            cash: 0,
            state: false,
            accounts: [],
            id:'',
            account_no: '',
            resf:false,
            isVisible:false
        };
    }

    componentDidUpdate(){
        if(this.state.state === true){
            this._sendFunds();
        this.setState({state: false});
        }
        if(this.state.resf === true){
      this.setState({
        show: true,
        resf: false
      });
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
             })
            this._getBanks();
          }
        } catch (error) {
          console.log('error getting data')
        }
      };  

      loadBanks() {
        return this.state.banks.map(bank => (
           <Picker.Item label={bank.name} value={bank._id} />
        ))
      }

      _sendFunds(){
        fetch("http://efundapp.herokuapp.com/api/wallet/sendfund",{
      method:"POST",
        headers: {
          'Accept': 'application/json',
         'Content-Type': 'application/json',
         'X-Auth-Token': this.state.User.token,
       },
       body:JSON.stringify({
        "amount":this.state.amount,
        "name":this.state.name,
        "date":this.state.date,
        "account_no":this.state.account_no,
        "description":this.state.description
      })
      })
  .then(response => response.json())
  .then((responseJson)=> {
    console.log(responseJson)
    var msg = responseJson.message
    if(msg == "Funds added successfully"){
      ToastAndroid.show('Pay Order Generated Successfully And Sent To Accountant', ToastAndroid.SHORT);
      this.setState({
        resf: true,
        show:false,
        isVisible:true
      })
    }
    else{
      ToastAndroid.show('Unsuccessfull!', ToastAndroid.SHORT);
      this.setState({
        
      })
    }
    })
  .catch(error=>ToastAndroid.show('Unsuccessfull!', ToastAndroid.SHORT,))
  }

  set(){
    this.setState({show: true})
    //this.getAmount();
}

      _getBanks(){
        fetch("http://efundapp.herokuapp.com/api/banks/",{
      method:"GET",
        headers: {
          'Accept': 'application/json',
         'Content-Type': 'application/json',
         'X-Auth-Token': this.state.User.token,
       },
      })
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
            banks: responseJson.bank
         })
         this.set();
        })
       .catch(error=>console.log(error))
         }

        getAmount(){
          console.log("hello tak cash")
          fetch("http://efundapp.herokuapp.com/api/bankAccount/account/"+this.state.selectedBank,{
            method:"GET",
              headers: {
                'Accept': 'application/json',
               'Content-Type': 'application/json',
               'X-Auth-Token': this.state.User.token,
             },
            })
            .then(response => response.json())
            .then((responseJson)=> {
              this.setState({
                  cash: responseJson.account.amount,
                  account_no: responseJson.account.account_no
               })
               console.log(this.state.cash)
               //console.log(responseJson)
              })
             .catch(error=>console.log(error))
        }

        onValueChange (value: string) {
            this.setState({
                selectedBank : value
            });
            console.log(this.state.selectedBank)
            this.getAmount();
        }      

    render() {
        if(this.state.show === false){
            return(
                <View/>
            )
        }
        else{
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <ScrollView>
                <CustomModal isVisible={this.state.isVisible}>
                <View style={{ flex: 1 }}>
                <View style={{marginVertical:70}}/>
                  <View style={styles.modalMainContainer}> 
                    <Text>Pay Order Generated Successfully And Sent To Accountant</Text>
                    <Button
                      title="OK"
                      onPress={() => {
                        this.setState({ isVisible: false });
                      }}
                      titleStyle={styles.buttonTitleStyle}
                      buttonStyle={[
                        styles.buttonStyle,
                        { borderRadius: responsiveWidth(10) },
                      ]}
                      containerStyle={styles.modalButtonContainer}
                    />
                  </View>
                </View>
              </CustomModal>
                    <View style={MainFlowStyles.containerStyle}>
                        {/* <Text style={MainFlowStyles.headerTextStyle}>Pay Orders</Text> */}
                        <View style={[MainFlowStyles.cardStyle]}>
                            <Text style={MainFlowStyles.cardHeadingStyle}>Pay Order</Text>
                            <View style={{ borderBottomColor: '#FF3301', borderBottomWidth: 1, marginBottom: 30 }} />

                            <View style={{ marginHorizontal: 10 }}>
                                <Input
                                    placeholder='Name'
                                    autoCapitalize='words'
                                    autoCompleteType='name'
                                    inputStyle={{ marginLeft: 14 }}
                                    inputContainerStyle={{ borderBottomColor: '#FF3301' }}
                                    containerStyle={{ marginBottom: 20 }}
                                    leftIcon={ <Ionicons name='md-person' size={22} color='#FF3301' /> }
                                    leftIconContainerStyle={{ marginLeft: 0 }}
                                    onChangeText={(value) => this.setState({ name: value })}
                                />

                                <Input
                                    placeholder='Amount'
                                    autoCapitalize='none'
                                    autoCompleteType='off'
                                    keyboardType='number-pad'
                                    inputStyle={{ marginLeft: 12 }}
                                    inputContainerStyle={{ borderBottomColor: '#FF3301' }}
                                    containerStyle={{ marginBottom: 20 }}
                                    leftIcon={
                                        <View style={{ width: 18, height: 18, borderRadius: 18 / 2, backgroundColor: '#FF3301', alignItems: 'center', justifyContent: 'center' }}>
                                            <FontAwesome name='dollar' size={10} color='white' />
                                        </View>
                                    }
                                    leftIconContainerStyle={{ marginLeft: 0 }}
                                    onChangeText={(value) => this.setState({ amount: value })}
                                />

                                {/* <Input
                                    placeholder='YYYY/MM/DD'
                                    autoCapitalize='none'
                                    autoCompleteType='off'
                                    keyboardType='number-pad'
                                    inputStyle={{ marginLeft: 10 }}
                                    inputContainerStyle={{ borderBottomColor: '#FF3301' }}
                                    containerStyle={{ marginBottom: 20 }}
                                    leftIcon={ <AntDeisgn name='calendar' size={20} color='#FF3301' /> }
                                    leftIconContainerStyle={{ marginLeft: 0 }}
                                    onChangeText={(value) => this.setState({ date: value })}
                                /> */}

                                <DatePicker
                                        style={{width: 280}}
                                        date={this.state.date}
                                        mode="date"
                                        placeholder="select date"
                                        format="YYYY-MM-DD"
                                        // minDate="01-01-2016"
                                        // maxDate="01-01-2019"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            dateIcon: {
                                            position: 'absolute',
                                            left: 5,
                                            top: 4,
                                            marginLeft: 0
                                            },
                                            dateInput: {
                                            marginLeft: 46,
                                            borderColor: '#FF3301'
                                            }
                                        }}
                                        onDateChange={(date) => {this.setState({date: date})}}
                                />


                                <Picker
                                    selectedValue={this.state.selectedBank}
                                    // onValueChange={(itemValue, itemIndex) => 
                                    //     this.setState({selectedBank: itemValue})}>
                                    onValueChange={this.onValueChange.bind(this)}>
                                        <Picker.Item label='Select a bank' value='' />
                                    {this.loadBanks()}
                                </Picker>

                                <Text style={{ fontSize: 14, marginBottom: 10, marginLeft: 8 }}>Amount in Bank: {this.state.cash}</Text>
                                    
                                <Text style={{ fontSize: 18, marginBottom: 10, marginLeft: 8 }}>Description:</Text>
                                <Input
                                    placeholder='Please add the name fo the relevant company from which you want to purchase cement.'
                                    autoCapitalize='none'
                                    autoCompleteType='off'
                                    keyboardType='default'
                                    inputStyle={{ fontSize: 14, paddingBottom: 50, textAlignVertical: 'top' }}
                                    inputContainerStyle={{ borderColor: '#FF3301', borderWidth: 1, borderRadius: 0 }}
                                    multiline
                                    onChangeText={(value) => this.setState({ description: value })}
                                />

                                <Button
                                    title='Generate'
                                    buttonStyle={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 10, marginVertical: 10, width: 140, alignSelf: 'center' }}
                                    onPress={() => this.setState({ state: true })}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
        }
    }
}

export default GeneratePayOrderScreen;

const blueBG = '#393b82';
const red = '#eb3f3f';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  headerContainer: {
    height: responsiveHeight(10),
    width: responsiveWidth(100),
    backgroundColor: '#f6f6f6',
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    // alignSelf:'flex-end'
  },
  headerleftContainer: {
    height: '100%',
    width: '80%',
    // backgroundColor: 'green',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  headerImageStyle: {
    marginTop: responsiveHeight(0.7),
    height: '80%',
    width: '20%',
    resizeMode: 'contain',
  },
  titleContainer: {
    height: responsiveHeight(10),
    width: responsiveWidth(90),
    // backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTextStyle: {
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
    color: blueBG,
  },
  inputContainer: {
    height: responsiveHeight(9),
    width: responsiveWidth(90),
    alignSelf: 'center',
    // backgroundColor: 'green',
    justifyContent: 'center',
  },
  buttonContainer: {
    height: responsiveHeight(8),
    width: responsiveWidth(80),
    alignSelf: 'center',
    // backgroundColor:red,
    //  backgroundColor: 'red',
    padding: 0,
  },
  buttonStyle: {
    height: '100%',
    width: '100%',
    // backgroundColor: '#303f88',
    backgroundColor: red,
    borderRadius: responsiveWidth(2),
  },
  buttonTitleStyle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '900',
    color: 'white',
  },
  modalMainContainer: {
    height: responsiveHeight(40),
    width: responsiveWidth(85),
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: responsiveWidth(3),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: responsiveWidth(4),
  },
  modalTextContainer: {
    height: responsiveHeight(10),
    width: '90%',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  modalTextStyle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#e12c2c',
    textAlign: 'center',
  },
  modalDecTextStyle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButtonContainer: {
    height: responsiveHeight(8),
    width: responsiveWidth(70),
    alignSelf: 'center',
    borderRadius: responsiveWidth(10),
    // backgroundColor:red,
    //  backgroundColor: 'red',
    padding: 0,
  },
});
