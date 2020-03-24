import React, { Component } from 'react';
import { View, Text, ScrollView, AsyncStorage, ToastAndroid, Picker } from 'react-native';
import Header from '../../components/Header';
import MainFlowStyles from '../../Styles/MainFlowStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDeisgn from 'react-native-vector-icons/AntDesign';
import { Input, Button } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-datepicker';

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
            resf:false
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
      ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
      this.setState({
        resf: true,
        show:false
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