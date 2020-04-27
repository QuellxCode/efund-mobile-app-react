import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Constants,
  FlatList,
  Text,
  TouchableO,
  TextInput,
  KeyboardAvoidingView,
  Picker,
  AsyncStorage,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Header from '../../components/Header';
import CustomButton from '../../components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Bill from '../../components/Bill';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MainFlowStyles from '../../Styles/MainFlowStyles';
class EditRejected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params.data,
      bills: [],
      qty: 0,
      price: 0,
      pkr: 0,
      title: '',
      cat: '',
      requetData: [],
    };
    this.list = React.createRef();
  }
  async componentDidMount() {
    console.log('datas id', this.state.data);
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
    fetch(
      'http://efund.alliedco.pk:5000/api/purchase/get-purchase/' +
        this.state.data.request,
      {
        method: 'Get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Auth-Token': this.state.User.token,
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        console.log('response:' + JSON.stringify(json));
        this.setState({requetData: json.purchase.details});
      })
      .catch(error => {
        console.error(error);
      });
  }
  activate_() {
    if (this.state.bills != []) {
      this.state.disabledB = false;
    }
  }

  onValueChange(value) {
    this.setState({
      selVal: value,
    });
    this.state.selProj = value;
    console.log(this.state.selProj);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Header />
        <View style={{flex: 1, marginHorizontal: 20, marginTop: 30}}>
          <View
            style={[
              MainFlowStyles.cardStyle,
              {paddingTop: 10, paddingBottom: 10, flex: 1},
            ]}>
            <Text style={MainFlowStyles.headerTextStyle}>Edit Request</Text>

            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 20,
                marginTop: 20,
                borderBottomColor: '#FFC1B2',
                borderBottomWidth: 1,
              }}>
              <View style={MainFlowStyles.billHeadingStyle}>
                <Text>Item </Text>
              </View>
              <View style={MainFlowStyles.billHeadingStyle}>
                <Text>Quantity</Text>
              </View>
              <View style={MainFlowStyles.billHeadingStyle}>
                <Text>Rate</Text>
              </View>
              <View style={MainFlowStyles.billHeadingStyle}>
                <Text>Category</Text>
              </View>
            </View>
            <FlatList
              style={{flexGrow: 0}}
              data={this.state.requetData}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <KeyboardAvoidingView>
                  <View
                    style={{
                      flexDirection: 'row',
                      //paddingBottom: 20,
                      marginTop: 10,
                      borderBottomColor: '#FFC1B2',
                      borderBottomWidth: 1,
                    }}>
                    <View style={MainFlowStyles.billHeadingStyle}>
                      <TextInput
                        placeholder={item.item}
                        onChangeText={this._handleMultiInput('myName')}
                      />
                      <View
                        style={{
                          borderBottomColor: '#FFCBBE',
                          borderBottomWidth: 1,
                        }}>
                        <TextInput
                          style={{fontSize: 16}}
                          placeholder={item.item}
                          onChangeText={title => this.setState({title})}
                          ref={ref => (this.ref = ref)}
                          value={this.state.title}
                        />
                        <View style={{marginBottom: 2}} />
                      </View>
                    </View>
                    <View style={MainFlowStyles.billHeadingStyle}>
                      <View
                        style={{
                          borderBottomColor: '#FFCBBE',
                          borderBottomWidth: 1,
                        }}>
                        <TextInput
                          style={{fontSize: 16}}
                          placeholder={'' + item.qty}
                          onChangeText={qty => this.setState({qty})}
                          ref={ref => (this.ref = ref)}
                          value={this.state.qty}
                        />
                        <View style={{marginBottom: 2}} />
                      </View>
                    </View>
                    <View style={MainFlowStyles.billHeadingStyle}>
                      <View
                        style={{
                          borderBottomColor: '#FFCBBE',
                          borderBottomWidth: 1,
                        }}>
                        <TextInput
                          style={{fontSize: 16}}
                          placeholder={'' + item.price}
                          onChangeText={price => this.setState({price})}
                          ref={ref => (this.ref = ref)}
                          value={this.state.price}
                        />
                        <View style={{marginBottom: 2}} />
                      </View>
                    </View>
                    <View style={MainFlowStyles.billHeadingStyle}>
                      <View
                        style={{
                          borderBottomColor: '#FFCBBE',
                          borderBottomWidth: 1,
                        }}>
                        <TextInput
                          style={{fontSize: 16}}
                          placeholder={item.category}
                          onChangeText={ctg => this.setState({cat})}
                          ref={ref => (this.ref = ref)}
                          value={this.state.cat}
                        />
                        <View style={{marginBottom: 2}} />
                      </View>
                    </View>
                  </View>
                       </KeyboardAvoidingView>

                );
              }}
            />
          </View>
          <View style={{marginHorizontal: 15, marginBottom: 20, marginTop: 10}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#FF3301',
                padding: 14,
                borderRadius: 10,
              }}
              onPress={() => {
                this.props.navigation.navigate('GenerateBill', {
                  bill: this.state.bills,
                  project: this.state.selProj,
                  total: this.state.total,
                  purchase: this.state.purchaseID,
                });
                this.setState({bill: ''});
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#FFF',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                Generate Bill
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    );
  }
}
export default EditRejected;
