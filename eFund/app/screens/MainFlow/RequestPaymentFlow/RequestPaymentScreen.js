import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Picker, AsyncStorage } from 'react-native';
import Header from '../../../components/Header';
import CustomButton from '../../../components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Bill from '../../../components/Bill';
import RNPickerSelect from 'react-native-picker-select';
import ModalDropdown from 'react-native-modal-dropdown';

class RequestPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: [],
            projects:[],
            User:[],
            item:[],
            listq: '',
            selectedProject: '',
            show: false
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

      set(){
        this.setState({show: true})
        // this.getAmount();
    }

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
              projects: responseJson.project
           })
           this.set();
          })
         .catch(error=>console.log(error))
           }

    _sendBill(){
      
    }

    loadProjects() {
      return this.state.projects.map(project => (
         <Picker.Item label={project.project} value={project._id} />
      ))
    }

    onValueChange (value: string) {
      this.setState({
          selectedProject : value
      });
      console.log(this.state.selectedProject)
  }  

    render() {
        if(this.state.show === false){
          return(
            <View/>
          )
        }
        else{
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
                <Picker
                    selectedValue={this.state.projects}
                    onValueChange={this.onValueChange.bind(this)}>
                    <Picker.Item label='Select a bank' value='' />
                    {this.loadProjects()}
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
        );}
    }
}

export default RequestPayment;