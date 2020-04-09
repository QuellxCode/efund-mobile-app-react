import React, {Component} from 'react';
import {View, Text, Image, AsyncStorage, Modal, Dimensions} from 'react-native';
import Header from '../../components/Header';
import CustomButton from '../../components/CustomButton';
import {Button} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';

const {width, height} = Dimensions.get('window');
const formdata = new FormData();
class ClaimPaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_: this.props.navigation.state.params.data1,
      Selected_Proj: this.props.navigation.state.params.data2,
      data_ctg: this.props.navigation.state.params.data3,
      chek: false,
      User: '',
      response_: '',
      Username: '',
      visible: false,
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

  async componentDidMount() {
    this.retrieveData();
    this.picker_1()
  }
  retrieveData = async () => {
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
  };
  api_claim() {
      console.log("api call")
      console.log("arr",this.state.data_)
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
    fetch('http://efundapp.herokuapp.com/api/purchase/claimpayment', {
      method: 'Post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': this.state.User.token,
      },
         body:JSON.stringify({
                "details": this.state.data_,
                "project": this.state.Selected_Proj,
                "purchaser":this.state.User.name,
                 "payment":'30000',
                 "payment_status":'0',

            })
        })
      .then(response => response.json())
      .then(json => {
        console.log(JSON.stringify(json));
        //this.setState({visible: true});
        //'Content-Type': 'multipart/form-data',
      })
      .catch(error => {
        console.error(error);
      });
  }
  displayuri() {
    if (this.state.chek == false) {
      return {uri: null};
    } else {
      return {uri: this.state.image};
    }
  }
  async picker_1() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({
        image: res.uri,
        chek: true,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }
  render() {
    return (
      <View>
        <Header />
        <View style={{marginHorizontal: 15, marginBottom: 20, marginTop: 10}}>
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
          <Image
            style={{width: '100%', height: '67%'}}
            source={this.displayuri()}
          />
          <Button
            title="Submit Claim"
            buttonStyle={{
              backgroundColor: '#FF3301',
              padding: 4,
              borderRadius: 10,
              width: 250,
              height: 50,
              alignSelf: 'center',
              marginTop: 100,
            }}
            onPress={() => this.api_claim()}
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
                Claim Request Goes to Approved
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
                  this.send_notification();
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default ClaimPaymentScreen;
