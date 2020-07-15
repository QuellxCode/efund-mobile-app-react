import React, {Component, useState,useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  AsyncStorage,
  ToastAndroid,
  Picker,
  StyleSheet,
  Modal,
  Dimensions,
  ActivityIndicator,
  label
} from 'react-native';
import Header from '../../components/Header';
import MainFlowStyles from '../../Styles/MainFlowStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDeisgn from 'react-native-vector-icons/AntDesign';
import {Input, Button} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-datepicker';
import CustomModal from '../../components/CustomModal';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {SERVER_URL} from '../../utils/config';
// import RNPickerSelect from 'react-native-picker-select';
// import Moment from 'react-moment';
import Moment from 'moment';

const {width, height} = Dimensions.get('window');

const DirectorNotification = props => {
 
  
   const [show, setShow] = useState(false)
   const [visible, setVisible] = useState(false)
   const [visibleB, setVisibleB] = useState(false)
   const [user, setUser] = useState('')
   const [message, setMessage] = useState('')
   const [allData, setAllDate] = useState(props.navigation.state.params.allData !== undefined ? props.navigation.state.params.allData : '' )
  const [date, setDate] = useState(allData.message[0].issue_date)
   // console.log('alldata', allData)
  const [allNotification,setAllNotifcation] = useState('');
   useEffect(() =>{
    if(date !== ''){
      const newdate = Moment(date).format('DD-MM-YYYY')     
      setDate(newdate)
      console.log('date', date)
       
    }
   },[])
   
  const screenHeight = Math.round(Dimensions.get('window').height) / 2;
  // const value =  AsyncStorage.getItem('User');
  // const val = JSON.parse(value);
  // console.log('val', val)
const getUser = async () =>{
  try {
    const value = await AsyncStorage.getItem('User');
    const val = JSON.parse(value);
    if (val !== null) {
      setUser(val.token);
      console.log('token', val.token)
    }
  } catch (error) {
    console.log('error getting data');
  }
}

useEffect(()  =>   {
    getUser();
    console.log('date', date)
    get_notification_length();
}) 

// for director accept notification
  const director_accept = () => {
     console.log('dddd', allData);
    fetch(`${SERVER_URL}/api/purchase/director-accept`, {
      method: 'Post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': user,
      },
      body: JSON.stringify({
        details: allData.message,
        project: allData.project,
        purchaserName: allData.purchaserName,
        purchaserID: allData.purchaserID,
        request:allData.request,
        notification_status: 1,
        type :allData.type ,
        request_type: 'rq_print_check'
      }),
    })
      .then(response => response.json())
      .then(json => {
        // this.setState({Isvisible: true});
        setVisible(true);
   
      })
      .catch(error => {
        console.error(error);
      });
  }


  // for director accept notification
  const director_reject = () => {
    console.log('dddd', allData);
   fetch(`${SERVER_URL}/api/purchase/director-reject`, {
     method: 'Post',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
       'X-Auth-Token': user,
     },
     body: JSON.stringify({
       details: allData.message,
       project: allData.project,
       purchaserName: allData.purchaserName,
       purchaserID: allData.purchaserID,
       request:allData.request,
       notification_status: 0,
       type :allData.type, 
       message: message
     }),
   })
     .then(response => response.json())
     .then(json => {
       // this.setState({Isvisible: true});
      setVisibleB(false);
      // props.navigation.replace('DirectorNotification');
    props.navigation.navigate('Home');
    
  
     })
     .catch(error => {
       console.error(error);
     });
 }



  
  const onClickButton  = () => {
    setVisible(false);
    // props.navigation.replace('DirectorNotification');
    props.navigation.navigate('Home');
    
  }

  const onClickButtonReject  = () => {
    setVisibleB(true);  
  }


  const  get_notification_length =() => {
    var arr = [];
    var arry = [];
    fetch(`${SERVER_URL}/api/notification`, {
      method: 'Get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token':user,
      },
    })
      .then(response => response.json())
      .then(json => {
        setAllNotifcation(json.notification)
      
      })
      .catch(error => {
        console.error(error);
      });
  }

    if (show === true) {
      return (
        <ActivityIndicator
          color="red"
          style={{paddingVertical: screenHeight}}
        />
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <Header  notificationLength={allNotification.length}/>
          <ScrollView>
          <Modal
                animationType="fade"
                transparent={true}
                visible={visibleB}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      paddingTop: 10,
                      borderRadius: 20,
                      width: width * 0.8,
                    }}>
                    <View style={{alignSelf: 'center', padding: 20}}>
                      <FontAwesome name="send" color="#FF3301" size={50} />
                    </View>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#FF3301',
                        paddingBottom: 40,
                      }}>
                      Request Rejected
                    </Text>
                    <Input
                      placeholder="Enter Your Reason for Rejection."
                      autoCapitalize="none"
                      autoCompleteType="off"
                      keyboardType="default"
                      // inputStyle={{ fontSize: 14, paddingBottom: 50, textAlignVertical: 'top' }}
                      // inputContainerStyle={{ borderColor: '#FF3301', borderWidth: 1, borderRadius: 0 }}
                      multiline
                      onChangeText={value =>
                        setMessage(value)
                      }
                    />
                    <Button
                      title="OK"
                      buttonStyle={{
                        backgroundColor: '#FF3301',
                        padding: 14,
                        borderRadius: 0,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                       onPress={() => director_reject()}
                    />
                  </View>
                </View>
              </Modal>
          <Modal
                animationType="fade"
                transparent={true}
                visible={visible}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      paddingTop: 10,
                      borderRadius: 20,
                      width: width * 0.8,
                    }}>
                    <View style={{alignSelf: 'center', padding: 20}}>
                      <FontAwesome name="send" color="#FF3301" size={50} />
                    </View>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#FF3301',
                        paddingBottom: 40,
                      }}>
                      Request Sent To Accountant
                    </Text>
                    <Button
                      title="OK"
                      buttonStyle={{
                        backgroundColor: '#FF3301',
                        padding: 14,
                        borderRadius: 0,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                      onPress={() => onClickButton()}
                    />
                  </View>
                </View>
              </Modal>

            <View style={MainFlowStyles.containerStyle}>
              <View style={[MainFlowStyles.cardStyle]}>
                <Text style={MainFlowStyles.cardHeadingStyle}>Project Name</Text>
                <View
                  style={{
                    borderBottomColor: '#FF3301',
                    borderBottomWidth: 1,
                    marginBottom: 30,
                  }}
                />

                <View style={{marginHorizontal: 10}}>
                  <Input
                    placeholder="Bank Name"
                    inputStyle={{marginLeft: 12}}
                    inputContainerStyle={{borderBottomColor: '#FF3301'}}
                    containerStyle={{marginBottom: 20}}
                    leftIcon={
                      <View
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 18 / 2,
                          backgroundColor: '#FF3301',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <FontAwesome name="bank" size={10} color="white" />
                      </View>
                    }
                    leftIconContainerStyle={{marginLeft: 0}}
                    value={allData.message[0].bankAccount}
                    disabled
                  />
                  <Input
                    placeholder="Payee Name"
                    autoCapitalize="none"
                    autoCompleteType="off"
                    keyboardType="number-pad"
                    inputStyle={{marginLeft: 12}}
                    inputContainerStyle={{borderBottomColor: '#FF3301'}}
                    containerStyle={{marginBottom: 20}}
                    leftIcon={
                      <View
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 18 / 2,
                          backgroundColor: '#FF3301',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <FontAwesome name="user" size={10} color="white" />
                      </View>
                    }
                    leftIconContainerStyle={{marginLeft: 0}}
                    value={allData.message[0].payee}
                    disabled
                  />
                   <Input
                    placeholder="Check no"
                    autoCapitalize="none"
                    autoCompleteType="off"
                    keyboardType="number-pad"
                    inputStyle={{marginLeft: 12}}
                    inputContainerStyle={{borderBottomColor: '#FF3301'}}
                    containerStyle={{marginBottom: 20}}
                    leftIcon={
                      <View
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 18 / 2,
                          backgroundColor: '#FF3301',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <FontAwesome name="money" size={10} color="white" />
                      </View>
                    }
                    leftIconContainerStyle={{marginLeft: 0}}
                    value={allData.message[0].checkno}
                    disabled
                  />
                  <Input
                    placeholder="Amount"
                    autoCapitalize="none"
                    autoCompleteType="off"
                    keyboardType="number-pad"
                    inputStyle={{marginLeft: 12}}
                    inputContainerStyle={{borderBottomColor: '#FF3301'}}
                    containerStyle={{marginBottom: 20}}
                    leftIcon={
                      <View
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 18 / 2,
                          backgroundColor: '#FF3301',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <FontAwesome name="dollar" size={10} color="white" />
                      </View>
                    }
                    leftIconContainerStyle={{marginLeft: 0}}
                    value={allData.message[0].amount.toString()}
                    disabled
                  />
                  
                  <Input
                    placeholder="Issued Date"
                    autoCapitalize="none"
                    autoCompleteType="off"
                    keyboardType="number-pad"
                    inputStyle={{marginLeft: 12}}
                    inputContainerStyle={{borderBottomColor: '#FF3301'}}
                    containerStyle={{marginBottom: 20}}
                    leftIcon={
                      <View
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 18 / 2,
                          backgroundColor: '#FF3301',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        
                        <FontAwesome name="calendar" size={10} color="white" />
                      </View>
                    }
                  
                    leftIconContainerStyle={{marginLeft: 0}}
                   name="date"
                    value={
                      date   
                                      }
                    
                    
                    disabled
                  />
                   <View  style={styles.btn}>
                 
                  <Button
                    title="Approved"
                    buttonStyle={{
                      backgroundColor: '#FF3301',
                      padding: 14,
                      borderRadius: 10,
                      marginVertical: 10,
                      width: 100,
                      // alignSelf: 'left',
                    }}
                   onPress={() => director_accept()}
                    //  onPress={() => this.setState({state: true})}
                  />
                   <Button
                    title="Rejected"
                    buttonStyle={{
                      backgroundColor: '#FF3301',
                      padding: 14,
                      borderRadius: 10,
                      marginVertical: 10,
                      width: 100,
                      marginLeft:50
                      // alignSelf: 'right',
                    }}
                     onPress={() => onClickButtonReject()}
                  />
                  </View>
                  
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }


export default DirectorNotification;

const blueBG = '#393b82';
const red = '#eb3f3f';
const styles = StyleSheet.create({
  btn:{
    flexDirection: "row",
    width:'100%',
    justifyContent:'center',
    alignContent: "space-between",
  
  },
  btn2:{
    marginLeft:'20px'
  },
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
