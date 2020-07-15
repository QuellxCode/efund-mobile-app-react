
import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage,
  Modal,
  Dimensions

} from 'react-native';
import Header from '../../components/Header';
import {SERVER_URL} from '../../utils/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');

const AddNewPayee = props => {
  const [name, setName] = useState('');
  const [cnic, setCnic] = useState('');
  const [address, setAddress] = useState('');
  const [account, setAccount] = useState('');
  const [city, setCity] = useState('');
  const [user, setUser] = useState('')
  const[visible, setVisible] = useState(false)
  const[allNotification, setAllNotifocation] = useState('')

//   const item = props.navigation.getParam('detail')
//   const id = item._id
//   console.log('item====', id)

const getUser = async () =>{
    // try {
    //   const value = await AsyncStorage.getItem('User');
    //   const val = JSON.parse(value);
    //   if (val !== null) {
    //     setUser(val.token);
    //     console.log('token', val.token)
    //   }
    // } catch (error) {
    //   console.log('error getting data');
    // }

    try {
        const value = await AsyncStorage.getItem('User');
         const val = JSON.parse(value)
         if (val !== null) {
           setUser(val.token)
        }
      } catch (error) {
        console.log('error getting data')
      }
  }
  
  useEffect(()  =>   {
      getUser();
      get_notification_length();
    
  }) 
  
 const  goBack = ()=> {
    const { navigation } = props;
    navigation.goBack();
    navigation.state.params.onSelect(true);
  }

   const onSubmit = () =>{
    console.log('token',user)
    const body = {
      payee_name: name,
      payee_address:address,
      payee_cnic: cnic,
      payee_account: account,
      payee_city: city,
      
  
    }
    console.log('body',body)

    fetch(`${SERVER_URL}/api/payee/`,{
        method:"POST",
          headers: {
            'Accept': 'application/json',
           'Content-Type': 'application/json',
           'X-Auth-Token': user,
         },
         body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then((responseJson)=> {
            // goBack();
            // props.navigation.navigate('GeneratePayOrder')
            setVisible(true)
             })
         .catch(error=>console.log(error))
       
         

   }


   const onClickButton = () =>{
     goBack();
   }

   const get_notification_length = () =>  {
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
        setAllNotifocation(json.notification)
      
      })
      .catch(error => {
        console.error(error);
      });
  }


   
  return (
    <View style={{ flex: 1 }}>
    <Header notificationLength={allNotification.length} />
    <Text style={{ fontWeight: 'bold', fontSize: 30, alignSelf: 'center', color: '#FF3301' }}>Add Payee</Text>

    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      
      <View style={styles.inputParent}>
        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
          placeholder="Enter Name"
        />
      </View>
      <View style={styles.inputParent}>
        <TextInput
          style={styles.input}
          onChangeText={text => setCnic(text)}
          value={cnic}
          placeholder="Payee CNIC"
        />
      </View>
      <View style={styles.inputParent}>
        <TextInput
          placeholder="Payee Account"
          style={styles.input}
          onChangeText={text => setAccount(text)}
          value={account}
        />
      </View>
      <View style={styles.inputParent}>
        <TextInput
          placeholder="Payee Address"
          style={styles.input}
          onChangeText={text => setAddress(text)}
          value={address}
        />
      </View>
      <View style={styles.inputParent}>
        <TextInput
          placeholder="Enter City"
          style={styles.input}
          onChangeText={text => setCity(text)}
          value={city}
        />
      </View>
      <View style={styles.alignBtn}>
        <TouchableOpacity style={styles.btn}  onPress={() => onSubmit()}>
          <Text style={styles.loginText}>Add</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>

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
                      <FontAwesome name="user" color="#FF3301" size={50} />
                    </View>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#FF3301',
                        paddingBottom: 40,
                      }}>
                      Payee added successfully!
                    </Text>
                    <TouchableOpacity onPress={() => onClickButton()} style={{
                       padding: 14,
                       borderRadius: 0,
                       borderBottomLeftRadius: 10,
                       borderBottomRightRadius: 10,
                       backgroundColor: '#FF3301'
                    }}>
                      <Text style={{textAlign: 'center', color:'white'}}>OK</Text>
                    </TouchableOpacity>
                    {/* <Button
                      title="OK"
                      buttonStyle={{
                        backgroundColor: 'red',
                        padding: 14,
                        borderRadius: 0,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                      onPress={() => onClickButton()}
                    /> */}
                  </View>
                </View>
              </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  input: {
    width: '100%',
    height: 44,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  inputParent: {
    width: '95%',
    margin: 10,
  },
  alignBtn: {
    flexDirection: 'row',
    // alignContent: 'center',
    // alignItems:'center',
    alignSelf: 'center',
  },
  btn: {
    width: '80%',
    backgroundColor: '#FF3301',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});

export default AddNewPayee;
