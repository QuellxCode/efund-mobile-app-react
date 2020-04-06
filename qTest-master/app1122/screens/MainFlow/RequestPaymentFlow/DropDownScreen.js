import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, Modal, Picker } from 'react-native';
import Header from '../../../components/Header';
import { Button } from 'react-native-elements';
import MainFlowStyles from '../../../Styles/MainFlowStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');
import CustomButton from '../../../components/CustomButton';


export default class DropDownScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project_name: '',
            project_id: '',
            Category: [],
            selectedValue:""
        }
    }
    state = { user: '' }
    updateUser = (user) => {
        this.setState({ user: user })
    }
          componentDidMount() {
            let a = 0;
            var that = this;
            let thisdata = []
            fetch('http://efundapp.herokuapp.com/api/project/', {
              method: 'Get',
              headers: {
                Accept: 'application/json',
                'Content-Type':'application/json',
                'x-auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTRiY2ZkODA3YTNjNzJjZDBhYTZkYjMiLCJyb2xlcyI6IlN1cGVydmlzb3IiLCJpYXQiOjE1ODQxNTMxNDd9.Fl1kmsa4wsXik-QsEuRDCJe9l2G_o9FpauJOV-CdhyY"
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
                    console.log(this.state.Category)  
                  });
                })
                 
              .catch(error => {
                console.error(error);
              });
          }
    render() {
        const PickerItems = this.state.Category.map((element, index) => (
            <Picker.Item
              key={"pick" + element.project_name}
              label={"" + element.project_name}
              value={element.project_id}
            />
          ));
        return (
            <View style={{ flex: 1 }}>
                <Header />
                {/* <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}> */}
                    <View style={[MainFlowStyles.cardStyle, { paddingTop: 10, paddingBottom: 10, flex: 1 }]}>
                        <Text style={MainFlowStyles.headerTextStyle}>Select Project</Text>
                        <View style={{margin:10,borderWidth:1,borderRadius:5}}>
                            
                        <Picker
                  
                  selectedValue={this.state.selectedValue}
                  prompt="Select Project"
                  style={{
                    width: 250,
                    height:60,
                    alignSelf: 'flex-end', zIndex: 5,
                    marginTop:1,
                    borderWidth: 1,
                    //flexDirection: "row-reverse",
                   // color: "#000",
                    fontSize: 12
                  }}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ selectedValue: itemValue })
                  }}
                >
                  {PickerItems}
                </Picker>
                        </View>
        <View style={{ marginHorizontal: 15, marginBottom: 20, marginTop: 10 }}>
                    <CustomButton
                        text='GO TO NEXT'
                         routeName='RequestPayment'
                    />
                </View>
                    </View>
                </View>
            // </View>
        );
    }
}

