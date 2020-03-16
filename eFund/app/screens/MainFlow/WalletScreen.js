import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, StyleSheet, Image, TouchableOpacity, AsyncStorage, ToastAndroid, ScrollView, RefreshControl } from 'react-native';
import Header from '../../components/Header';
import MainFlowStyles from '../../Styles/MainFlowStyles';
import { Button, Input } from 'react-native-elements';
import CustomModal from '../../components/CustomModal';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from 'react-native-responsive-dimensions';

const {width, height} = Dimensions.get('window');
console.disableYellowBox = true;

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            User:[],
            amount:0,
            showAmount:0,
            state: false,
            refreshing: false,
            wallet: [
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '400.00' },
            ]
        };
    }

    _onRefresh = () => {
      this.setState({refreshing: true});
      this._getCash();
    }  

    componentDidUpdate(){
      if(this.state.state === true){
        this._getCash();
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
           })
           this._getCash();
        }
      } catch (error) {
        console.log('error getting data')
      }
    };

  _addCash(){
      fetch("http://efundapp.herokuapp.com/api/wallet/add-cash",{
    method:"POST",
      headers: {
        'Accept': 'application/json',
       'Content-Type': 'application/json',
       'X-Auth-Token': this.state.User.token,
     },
     body:JSON.stringify({
      "amount":this.state.amount,
    })
    })
.then(response => response.json())
.then((responseJson)=> {
  if(this.state.amount < 1){ToastAndroid.show("Please Enter Some Amount", ToastAndroid.SHORT);}
  else{
  if(responseJson.message === 'Funds added Successfully'){
    ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
    this.setState({
      isVisible: false,
      state: true
    })
  }
  else{
    ToastAndroid.show('Enter Correct Amount!', ToastAndroid.SHORT);
    this.setState({
      isVisible: false,
    })
  }}
  })
.catch(error=>ToastAndroid.show('Enter Correct Amount!', ToastAndroid.SHORT, this.setState({
  isVisible: false,
}))
)
}

_getCash(){
  fetch("http://efundapp.herokuapp.com/api/wallet/get-amount",{
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
    showAmount: responseJson.wallet.amount,
    refreshing: false,
    amount: 0
   })
   console.log(this.state.showAmount)
  })
 .catch(error=>console.log(error))
   }

    render() {
        return (
          <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
            <View style={{ flex: 1 }}>
                <Header />
                <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
                <CustomModal isVisible={this.state.isVisible}>
                <View style={{ flex: 1 }}>
                <View style={{marginVertical:70}}/>
                  <View style={styles.modalMainContainer}> 
                    <Input
                        label='Add Cash'
                        placeholder='Enter Cash'
                        onChangeText={amount => this.setState({amount})}
                        keyboardType='number-pad'
                    />
                    <Button
                      title="ADD"
                      onPress={() => {
                        this._addCash();
                      }}
                      titleStyle={styles.buttonTitleStyle}
                      buttonStyle={[
                        styles.buttonStyle,
                        { borderRadius: responsiveWidth(10) },
                      ]}
                      containerStyle={styles.modalButtonContainer}
                    />
                    <Button
                      title="Cancel"
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
                    <View style={[MainFlowStyles.cardStyle, { paddingBottom: 10, marginBottom: 8, marginTop: -25 }]}>
                        <View style={{ backgroundColor: '#FF3301', borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 40, borderBottomColor: 'black', borderBottomWidth: 2 }}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', color: 'white' }}>Wallet</Text>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', color: 'white' }}>RS {this.state.showAmount}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', paddingBottom: 10, marginTop: 20, borderBottomColor: '#FFC1B2', borderBottomWidth: 1 }}>
                            <View style={{ width: (width - 40) / 3 }}>
                                <Text style={{ fontSize: 18, marginLeft: 10 }}>Date</Text>
                            </View>
                            <View style={{ width: (width - 40) / 3 }}>
                                <Text style={{ fontSize: 18 }}>Transaction</Text>
                            </View>
                            <View style={{ width: (width - 40) / 3, alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 18, marginRight: 10 }}>Amount</Text>
                            </View>
                        </View>
                        
                        <FlatList
                            style={{ maxHeight: height * 0.4 }}
                            data={this.state.wallet}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ flexDirection: 'row', paddingBottom: 5, marginTop: 5, borderBottomColor: '#FFC1B2', borderBottomWidth: 1 }}>
                                        <View style={{ width: (width - 40) / 3, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 12, marginLeft: 10 }}>{item.date}</Text>
                                        </View>
                                        <View style={{ width: (width - 40) / 3, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 12 }}>{item.transaction}</Text>
                                        </View>
                                        <View style={{ width: (width - 40) / 3, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 12 }}>{item.amount}</Text>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View>
                
                    <Button
                    title="Add Cash"
                    buttonStyle={{backgroundColor: '#FF3301', padding: 14, borderRadius: 10}}
                    containerStyle={[{ marginHorizontal: 10 }]}
                    onPress={() => this.setState({ isVisible: true })}
                    />
                
                </View>
            </View>
            </ScrollView>
        );
    }
}

export default Wallet;

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
