import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Picker, AsyncStorage } from 'react-native';
import Header from '../../../components/Header';
import CustomButton from '../../../components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Bill from '../../../components/Bill';

class RequestPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: [],
            projects:[],
            User:[],
            item:[]
        };
        this.list = React.createRef();
    }

    componentDidMount() {
        this._retrieveData();
      }
      _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('User');
          const val = JSON.parse(value)
          if (val !== null) {
            this.setState({
              User: val,
             })
          }
          this._getProjects()
        } catch (error) {
          console.log('error getting data')
        }
      };

    _getProjects(){
        fetch("http://efundapp.herokuapp.com/api/project/",{
      method:"GET",
        headers: {
          'Accept': 'application/json',
         'Content-Type': 'application/json',
         'X-Auth-Token': this.state.User.token,
       },
      })
  .then(response => response.json())
  .then((responseJson)=> {
    this.setState({
     projects: responseJson.project,
    })
   })
  .catch(error=>console.log(error))
    }

    render() {
        console.log(this.state.projects[0])
        console.log(this.state.item)
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
                <Picker
                    selectedValue={this.state.project}
                    style={{height: 50, width: 300}}
                    onValueChange={(itemValue, itemIndex) => this.setState({item: itemValue})}
                >
                    <Picker.Item label={this.state.projects[0]} value={this.state.projects} />
                    <Picker.Item label={this.state.projects[1]} value={this.state.projects} />
                </Picker>
                
                    <FlatList
                        ref={this.list}
                        style={{ flexGrow: 0 }}
                        data={this.state.bills}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        onContentSizeChange={() => this.list.current.scrollToEnd({ 'animated': false })}
                        renderItem={({ item }) => <Bill item={item} /> }
                    />

                    <TouchableOpacity
                        style={{ alignSelf: 'center' }}
                        onPress={() => {
                            let b = this.state.bills;
                            b.push({ number: '01', item: 'Item', price: 'Price', qty: 'Qty', ctg: 'Ctg', pkr: 'Pkr' });
                            this.setState({ bills: b });
                        }}
                    >
                        <AntDesign name='pluscircle' size={20} color='#FF3301' />
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 15, marginBottom: 20, marginTop: 10 }}>
                    <CustomButton
                        text='Generate Bill'
                        routeName='GenerateBill'
                    />
                </View>
            </View>
        );
    }
}

export default RequestPayment;