import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, TextInput, ScrollView, TouchableOpacity, Modal, KeyboardAvoidingView, Picker, AsyncStorage } from 'react-native';
import Header from '../../components/Header';
import { Button } from 'react-native-elements';
import MainFlowStyles from '../../Styles/MainFlowStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');
import CustomButton from '../../components/CustomButton';
var n = 1;
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
      ctg: '',
      orderss: [],
      response_: '',
      data: '',

    }
    this.list = React.createRef();
  }
  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('User');
      const val = JSON.parse(value)
      if (val !== null) {
        this.setState({
          User: val,
        })
        console.log(this.state.User)
      }
    } catch (error) {
      console.log('error getting data')
    }
    var thisdata = []
    fetch('http://efundapp.herokuapp.com/api/project', {
      method: 'Get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': this.state.User.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ data: json.project })
        var v = this.state.data.length
        for (let i = 0; i < v; i++) {
          console.log('v:' + json.project[i].project_name)
          thisdata.push({
            project_name: json.project[i].project_name,
            project_id: json.project[i]._id,
          });
        }
        this.setState({ Category: thisdata })
        //console.log("aaa" + JSON.stringify(this.state.Category));
      })

      .catch(error => {
        console.error(error);
      });

  }
  render_1 = ({item}) =>
    (<KeyboardAvoidingView >
      <View style={[MainFlowStyles.cardStyle, { padding: 10, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginHorizontal: 3 }]}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.number}</Text>
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
          <View style={{ flexDirection: 'row' }}>
            <Picker
              selectedValue={this.state.ctg}
              prompt="Select Category"
              mode="dropdown"
              style={{ height: 20, width: 30 }}
              onValueChange={(itemValue, itemIndex) =>{
                console.log("itemvali"+itemValue)
                this.setState({ ctg: itemValue })
              }}
            >
              <Picker.Item label="Fouji cement" value="Fouji cement" />
              <Picker.Item label="Bestway cemment" value="Bestway cemment" />
              <Picker.Item label="Kohat cement" value="Kohat cement" />
            </Picker>
            <View style={{ justifyContent: 'flex-end', marginBottom: 2 }}>
            </View>
          </View>
          <View style={{ marginBottom: 2 }} />
        </View>
        <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 16 }}>
            {
              this.state.price * this.state.qty
            }
          </Text>
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
        <View style={{ flex: 1 }}>
          <Header />
          <ScrollView>
          <Text style={{ fontWeight: 'bold', fontSize: 30,alignSelf:'center',color:'#FF3301'}}>Select Project</Text>
          <View style={{borderColor:'#FF3301',borderWidth:1, width: 300,height: 50,borderRadius:30,justifyContent:'center',alignSelf:'center',marginTop:10}}>
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
              color:'#FF3301',
              fontSize: 12
            }}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ selectedValue: itemValue, })
              this.setState({ selectedProject: itemValue, })
              console.log("selected:value of project" + this.state.selectedValue)
            }}
          >
            {PickerItems}
          </Picker>
          </View>
          <View style={[MainFlowStyles.cardStyle, { padding: 10, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginHorizontal: 20,marginTop:10 }]}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>1</Text>
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
              <View style={{ flexDirection: 'row' }}>
                
              <Picker
              selectedValue={this.state.ctg}
              prompt="Select Category"
              mode="dropdown"
              style={{ height: 20, width: 20 }}
              onValueChange={(itemValue, itemIndex) =>{
                this.setState({ ctg: itemValue })
              console.log("itemvali"+itemValue)
              }}
            >
              <Picker.Item label="Fouji cement" value="Fouji cement" />
              <Picker.Item label="Bestway cemment" value="Bestway cemment" />
              <Picker.Item label="Kohat cement" value="Kohat cement" />
            </Picker>
                <View style={{ justifyContent: 'flex-end', marginBottom: 2 }}>
                </View>
              </View>
              <View style={{ marginBottom: 2 }} />
            </View>

            <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
              <Text style={{ fontSize: 16 }}
              >
                {
                  this.state.price * this.state.qty
                }
              </Text>
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
                var result = ac * ab
                var cat=this.state.ctg
                n = n + 1;
                b.push({number:n, "details[item_name]": aa, "details[item_quantity]": ab, "details[item_price]": ac, "details[total_price]": result,"details[category]":cat });
                this.setState({ bills: b })
                //console.log(this.state.bills)

              }
              }
            >
              <AntDesign name='pluscircle' size={20} color='#FF3301' />
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: 15, marginBottom: 20, marginTop: 250 }}>
            <CustomButton
              text='Claim'
              routeName='ClaimPayment'
              data={this.state.bills}
              data1={this.state.selectedValue}
              data_ctg={this.state.ctg}
            />
          </View>
          </ScrollView>

        </View>
    );
  }
}