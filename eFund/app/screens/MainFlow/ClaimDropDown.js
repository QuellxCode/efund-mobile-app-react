import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, TextInput, ScrollView,TouchableOpacity, Modal, KeyboardAvoidingView, Picker } from 'react-native';
import Header from '../../components/Header';
import { Button } from 'react-native-elements';
import MainFlowStyles from '../../Styles/MainFlowStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');
import CustomButton from '../../components/CustomButton';
var n=1;
export default class ClaimDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_name: '',
      project_id: '',
      Category: [],
      selectedValue: "",
      selectedProject: "",
      User: [],
      bills: [],
      qty: '',
      price: '',
      pkr: '',
      title: '',
      cat: '',
      orderss: [],
      response_: '',

    }
    this.list = React.createRef();
  }
  componentDidMount() {
    this.retrieveData();
    this.Api_call()
  }
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('User');
      const val = JSON.parse(value)
      if (val !== null) {
        this.setState({
          User: val,
        })
        //  console.log(this.state.User)
        this.getProjects();
      }
    } catch (error) {
      console.log('error getting data')
    }
  };
  Api_call() {
    let a = 0;
    var that = this;
    let thisdata = []
    fetch('http://efundapp.herokuapp.com/api/project/', {
      method: 'Get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTRiY2ZkODA3YTNjNzJjZDBhYTZkYjMiLCJyb2xlcyI6IlN1cGVydmlzb3IiLCJpYXQiOjE1ODQxNTMxNDd9.Fl1kmsa4wsXik-QsEuRDCJe9l2G_o9FpauJOV-CdhyY"
      },
    })
      .then(response => response.json())
      .then(json => {
        json.project.map(dataItem => {
          if (dataItem.project != null) {
            thisdata.push({
              project_name: dataItem.project,
              project_id: dataItem._id,
            });
          }
          this.setState({ Category: thisdata })
          //console.log(this.state.Category)  
        });
      })

      .catch(error => {
        console.error(error);
      });
  }
  render_1 = () =>
    (<KeyboardAvoidingView >
      <View style={[MainFlowStyles.cardStyle, { padding: 10, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginHorizontal: 5 }]}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}></Text>
        <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
          <TextInput style={{ fontSize: 16 }}
            placeholder='Item'
            onChangeText={(title) => this.setState({ title })}
            ref={ref => this.ref = ref}
          ></TextInput>
          <View style={{ marginBottom: 2 }} />
        </View>
        <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
          <TextInput style={{ fontSize: 16 }}
            placeholder='price'
            keyboardType={'numeric'}
            onChangeText={(price) => this.setState({ price })}
            ref={ref => this.ref = ref}

          ></TextInput>
          <View style={{ marginBottom: 2 }} />
        </View>
        <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
          <TextInput style={{ fontSize: 16 }}
            placeholder='qty'
            keyboardType={'numeric'}
            onChangeText={(qty) => this.setState({ qty })}
            ref={ref => this.ref = ref}

          ></TextInput>
          <View style={{ marginBottom: 2 }} />
        </View>
        <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
          <TextInput style={{ fontSize: 16 }}
            placeholder='Pkr'
            keyboardType={'numeric'}
            onChangeText={(pkr) => this.setState({ pkr })}
            ref={ref => this.ref = ref}
          ></TextInput>
          <View style={{ marginBottom: 2 }} />
        </View>
      </View>
    </KeyboardAvoidingView>
    )
  render() {
    const PickerItems = this.state.Category.map((element, index) => (
      <Picker.Item
        key={"pick" + element.project_name}
        label={"" + "    " + element.project_name}
        value={element.project_id}
        prompt='Options'
      />
    ));
    return (
      <ScrollView>
      <View style={{ flex: 1 }}>
        <Header />
        <Picker
          selectedValue={this.state.selectedValue}
          prompt="Select Project"
          style={{
            width: 250,
            height: 60,
            alignSelf: 'flex-end', zIndex: 5,
            marginTop: 1,
            borderWidth: 1,
            //flexDirection: "row-reverse",
            // color: "#000",
            fontSize: 12
          }}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ selectedValue: itemValue, })
            this.setState({ selectedProject: itemValue, })
            console.log("selected:value of project" +this.state.selectedValue)
          }}
        >
          <Picker.Item label='Select a Project' value='' />
          {PickerItems}
        </Picker>
        <View style={[MainFlowStyles.cardStyle, { padding: 10, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginHorizontal: 5 }]}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}></Text>
          <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
            <TextInput style={{ fontSize: 16 }}
              placeholder='Item'
              onChangeText={(title) => this.setState({ title })}
              ref={ref => this.ref = ref}
            ></TextInput>
            <View style={{ marginBottom: 2 }} />
          </View>
          <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
            <TextInput style={{ fontSize: 16 }}
              placeholder='price'
              keyboardType={'numeric'}
              onChangeText={(price) => this.setState({ price })}
              ref={ref => this.ref = ref}

            ></TextInput>
            <View style={{ marginBottom: 2 }} />
          </View>
          <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
            <TextInput style={{ fontSize: 16 }}
              placeholder='qty'
              keyboardType={'numeric'}
              onChangeText={(qty) => this.setState({ qty })}
              ref={ref => this.ref = ref}

            ></TextInput>
            <View style={{ marginBottom: 2 }} />
          </View>
          <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
            <TextInput style={{ fontSize: 16 }}
              placeholder='Pkr'
              keyboardType={'numeric'}
              onChangeText={(pkr) => this.setState({ pkr })}
              ref={ref => this.ref = ref}
            ></TextInput>
            <View style={{ marginBottom: 2 }} />
          </View>
        </View>
        <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
          <FlatList
            ref={this.list}
            style={{ flexGrow: 0 }}
            data={this.state.bills}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => this.list.current.scrollToEnd({ 'animated': false })}
            renderItem={this.render_1}
          />
          <TouchableOpacity
            style={{ alignSelf: 'center' }}
            onPress={() => {

              var aa = this.state.title;
              var ab = this.state.qty;
              var ac = this.state.price;
              var ae = this.state.pkr;
              var project = this.state.selectedValue;
              let b = this.state.bills;
              b.push({"details[item_name]":aa,"details[item_quantity]":ab,"details[item_price]":ac,"details[total_price]":ae});
              n = n + 1;
              this.setState({ bills: b })
              //console.log(this.state.bills)

            }
            }
          >
            <AntDesign name='pluscircle' size={20} color='#FF3301' />
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 15, marginBottom: 20, marginTop: 10 }}>
          <CustomButton
            text='Claim'
            routeName='ClaimPayment'
            data={this.state.bills}
            data1={this.state.selectedValue}
          />
        </View>
      </View>
      </ScrollView>
    );
  }
}