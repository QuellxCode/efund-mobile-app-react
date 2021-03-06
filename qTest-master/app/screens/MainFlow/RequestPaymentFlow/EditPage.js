
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
} from 'react-native';
import Header from '../../../components/Header';
import {SERVER_URL} from '../../../utils/config';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

const handleError = (error, isFatal) => {
  // fetch
  console.log(error, isFatal);
  // alert(error.name);
  // alert('Something went wrong!');
};

setJSExceptionHandler((error, isFatal) => {
  console.log('caught global error');
  handleError(error, isFatal);
}, true);



const EditPage = props => {
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [all, setAll] = useState('');
  const [user, setUser] = useState('');
  let localNotify = null;

  const [allBillInfo, setAllBillInfo] = useState();

  const item = props.navigation.getParam('detail')
  const id = item._id
  console.log('item====', id)
  const getUser = async () =>{
   
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
  

  useEffect(() =>{ 
  getUser();
  get_notification()
  }, [])

 const  get_notification =() => {
    var arr = [];
    var arry = [];
    fetch(`${SERVER_URL}/api/notification`, {
      method: 'Get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': user,
      },
    })
      .then(response => response.json())
      .then(json => {
        setAll(json.notification)
      
      })
      .catch(error => {
        handleError(error, false);
      });
  }

  return (
    <View style={{ flex: 1 }}>
    {/* <Header  /> */}
   
    <Header notificationLength={ all.length > 0 ?  all.length : 0} />
    <Text style={{ fontWeight: 'bold', fontSize: 30, alignSelf: 'center', color: '#FF3301' }}>Edit Request</Text>

    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      
      <View style={styles.inputParent}>
        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
          placeholder="Enter Item"
        />
      </View>
      <View style={styles.inputParent}>
        <TextInput
          style={styles.input}
          onChangeText={text => setPrice(text)}
          value={price}
          placeholder="Enter Price"
        />
      </View>
      <View style={styles.inputParent}>
        <TextInput
          placeholder="Enter Qty"
          style={styles.input}
          onChangeText={text => setQty(text)}
          value={qty}
        />
      </View>
      <View style={styles.alignBtn}>
        <TouchableOpacity style={styles.btn}  onPress={() => props.navigation.navigate('EditRequestPaymentScreen', {id: id,item: name, qty: qty, price: price})}>
          <Text style={styles.loginText}>Update</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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

export default EditPage;
