import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
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

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            
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

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
                <CustomModal isVisible={this.state.isVisible}>
                <View style={{ flex: 1 }}>
                  <View style={styles.modalMainContainer}>
                    <View style={styles.modalImageContainer}>
                    <Input
                        label='Add Cash'
                        placeholder='Enter Cash'
                    />
                    </View>
                    <View style={styles.modalTextContainer}>
                      <Text style={styles.modalTextStyle}>
                        {'Your order is received! '}
                      </Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        this.setState({ isVisible: false });
                        // this.props.navigation.navigate('TrackOrder');
                      }}>
                      <Text style={styles.modalDecTextStyle}>
                        You can track the delivery in the{' '}
                        <Text style={{ color: '#393b82' }}>"Track Order"</Text>{' '}
                        section
                      </Text>
                    </TouchableOpacity>
                    <Button
                      title="Continue Eating"
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
                    <View style={[MainFlowStyles.cardStyle, { paddingBottom: 10, marginBottom: 10 }]}>
                        <View style={{ backgroundColor: '#FF3301', borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 40, borderBottomColor: 'black', borderBottomWidth: 2 }}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', color: 'white' }}>Wallet</Text>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', color: 'white' }}>Rs. 20,000</Text>
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
    height: responsiveHeight(20),
    width: responsiveWidth(85),
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: responsiveWidth(3),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: responsiveWidth(4),
  },
  modalImageContainer: {
    height: responsiveHeight(10),
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImageStyle: {
    height: '90%',
    width: '90%',
    resizeMode: 'contain',
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
