import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  AsyncStorage,
  Modal,
  Dimensions,
  StyleSheet,
  ScrollView
} from 'react-native';
import Header from '../../components/Header';
import CustomButton from '../../components/CustomButton';
import {Button} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import { SERVER_URL } from '../../utils/config';
// import { ScrollView } from 'react-native-gesture-handler';

import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

const handleError = (error, isFatal) => {
  // fetch
  console.log(error, isFatal);
  // alert(error.name);
  alert('Something went wrong!');
};

setJSExceptionHandler((error, isFatal) => {
  console.log('caught global error');
  handleError(error, isFatal);
}, true);

const {width, height} = Dimensions.get('window');
const formdata = new FormData();
class ClaimPaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: this.props.navigation.state.params.ID,
      data_: this.props.navigation.state.params.data,
      Selected_Proj: this.props.navigation.state.params.data1,
      //data_ctg: this.props.navigation.state.params.data_ctg,
      chek: false,
      User: '',
      response: '',
      Username: '',
      visible: false,
      Loader: false,
      IsLoader:false,
      images:[],
      allNotification:[]
    };
  }
  //var array2=[{"details[item_name]":"Aaa","details[item_quantity]":"5","details[item_price]":"55","details[total_price]":"55"}]
  //var arr= [{"details[item_name]":"abc","details[item_quantity]":"6","details[item_price]":"211","details[total_price]":"168"}]
  // var username =
  // var projects =
  //
  // console.log("image"+this.state.image)
  // var that = this;
  // var token =
  // console.log(token)
  showLoader() {
    this.setState({Loader: true});
  }
  hideLoader() {
    this.setState({Loader: false});
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('User');
      const val = JSON.parse(value);
      if (val !== null) {
        this.setState({
          User: val,
        });
      }
    } catch (error) {
      console.log('error getting data');
    }
    console.log('userID:', this.state.ID);
    this.picker_1();
    this.get_notification_length();
  }
  //var arrey = JSON.stringify(this.state.data_);
  // for (var i = 1; i < arrey.length; i++) {
  //   formdata.append(arrey[i].item_name);
  //   formdata.append(arrey[i].item_quantity);
  //   formdata.append(arrey[i].item_price);
  //   formdata.append(arrey[i].total_price);
  //   formdata.append(arrey[i].category);
  // }
  // formdata.append('purchaser', JSON.stringify(this.state.User.name));
  // formdata.append('payment', '30000');
  // formdata.append('payment_status', '0');
  // formdata.append('project', JSON.stringify(this.state.Selected_Proj));
  // formdata.append('file', {
  //   uri: this.state.image,
  //   type: 'image/jpeg',
  //   name: 'image${moment()}',
  // });
  displayuri() {
    if (this.state.chek == false) {
      return {uri: null};
    } else {
      // return {uri: this.state.image};
       return this.state.images;
      
    }
  }
  notification_send(){
    console.log('send notificatoion');
    this.setState({IsLoader:true});
    console.log(this.state.data_);
    console.log(this.state.ID);
    console.log(this.state.Selected_Proj);
    console.log("tokens",this.state.User.token)
    fetch(`${SERVER_URL}/api/purchase/send-notification`, {
      method: 'Post', 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': this.state.User.token,
      },
      body: JSON.stringify({
        details: this.state.data_,
        request: this.state.ID,
        project: this.state.Selected_Proj,
        notification_status:'ClaimRequest',
      }),
    })
      .then(response => response.json())
      .then(json => {
        console.log('snd notification', json);
        this.setState({response: json.notificationID,visible: false,IsLoader:false});
        this.props.navigation.replace('ClaimDropDown');
        this.props.navigation.navigate('Home');
      })
      .catch(error => {
        handleError(error, false);
      });
  }
  submit() {
     this.showLoader(); // Once You Call the API Action loading will be true
    console.log('taa', this.state.ID);
    fetch(`${SERVER_URL}/api/purchase/claimimage/` + this.state.ID,
      {
        method: 'Post',
        headers: {
          //Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'X-Auth-Token': this.state.User.token,
        },
        body: formdata,
      },
    )
      .then(response => response.json())
      .then(json => {
        console.log('image new path', json);
        this.hideLoader();
        this.setState({visible: true});
      })
      .catch(error => {
        handleError(error, false);
      });
  }
  async picker_1() {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      console.log('res image ', res)
      let arr = [
        {
          image:''
        }
      ]
      for(let i=0; i< res.length ; i++){
        arr.push({image:res[i].uri})
      }
      let newArr = arr.shift();
      console.log('image arr', newArr)
      console.log('new image arr', arr)
      this.setState({
        // image: res.uri,
        images: arr,
        chek: true,
      });
    //   for (const key of Object.keys(this.state.images)) {
    //     formdata.append('file', this.state.images[key])
    // }
    this.state.images.forEach((item, i) => {
      formdata.append("file", {
        uri: item.image,
        type: "image/jpeg",
        name: item.filename || `image${i}`,
      });
    });
      // formdata.append('file', {
      //   uri: this.state.images[1].image,
      //   type: 'image/jpeg',
      //   name: 'image${moment()}',
      // });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }


  get_notification_length() {
    var arr = [];
    var arry = [];
    fetch(`${SERVER_URL}/api/notification`, {
      method: 'Get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token':this.state.User.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        this.setState({allNotification:json.notification})
      
      })
      .catch(error => {
        console.error(error);
      });
  }

  
  render() {
    
    return (
      <View style={{flex:1}}>
        <Header notificationLength={this.state.allNotification.length > 0 ? this.state.allNotification.length : 0} />
        {/* <Header  /> */}
        <View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {this.state.Loader === true && <ActivityIndicator color={'red'} />}
          </View>
         
          {/* <Button
            title="Pick Image"
            buttonStyle={{
              backgroundColor: '#FF3301',
              padding: 14,
              borderRadius: 10,
              marginVertical: 10,
              width: 140,
              alignSelf: 'center',
              marginTop: 1,
            }}
            onPress={() => this.picker_1()}
          /> */}
          <ScrollView style={{height: '90%', marginTop: -50}}>
           <View style={styles.container}>
           {this.state.images.length > 0 ? this.state.images.map((item, index) =>
         
           <Image
             style={styles.tinyLogo}
             source={{uri: item.image}}
           />
           ) : null} 
         
            </View>
            </ScrollView>
            

        </View>
        <View style={styles.bottom}>  
           <Button
            title="Submit Claim"
            style={styles.button}
            buttonStyle={{
              backgroundColor: '#FF3301',
              padding: 4,
              borderRadius: 10,
              width: 250,
              height: 50,
              alignSelf: 'center',
              marginTop: 100,
            }}
            onPress={() => this.submit()}
          />
          </View>

                <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.visible}>
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
            {this.state.IsLoader==true && <ActivityIndicator color={'red'} />}
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
                Claim Request sent for Approval
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
                onPress={() => {
                  this.notification_send();
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    // height:'80%',
    // paddingTop: 50,
    // margin: 10,
    alignContent:'center',
    alignItems:'center'
    
  },
  tinyLogo: {
    width: 350,
    height: 350,
    margin:5,
    
    
  },
  logo: {
    width: 66,
    height: 58,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15
  },
  button: {
    position: 'absolute',
    bottom:0
  }
});


export default ClaimPaymentScreen;
