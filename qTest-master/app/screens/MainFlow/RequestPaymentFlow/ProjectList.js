import React, {Component} from 'react'
import { View, Text, ScrollView, FlatList, AsyncStorage } from 'react-native';
import Header from '../../../components/Header';
import MainFlowStyles from '../../../Styles/MainFlowStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDeisgn from 'react-native-vector-icons/AntDesign';
import { Input, Button } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import Projects from '../../../components/Projects';

class ProjectList extends Component{
    constructor(){
        super();
        this.state={
            User: [],
            projects: [],
            data:[]
        }
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
             console.log(this.state.User, "hello")
          }
          this._getProjects()
        } catch (error) {
          console.log('error getting data')
        }
      };

    _getProjects(){
        fetch("http://efund.alliedco.pk:5000/api/project/",{
      method:"GET",
        headers: {
          'Accept': 'application/json',
         'Content-Type': 'application/json',
         'X-Auth-Token': this.state.User.token,
       },
      })
  .then(response => response.json())
  .then((responseJson)=> {
    var tmp = this.state.projects;
    tmp.push(responseJson)
    this.setState({
     projects: tmp,
    })
    console.log(this.state.projects[0].project[0])
    this._setBeta()
   })
  .catch(error=>console.log(error))
    }

    _setBeta(){
      let b = this.state.data;
      b.push({ project: this.state.projects[0].project[0]._id, payment: this.state.projects[0].project[0].project});
      this.setState({ data: b });
      console.log(this.state.data)
    }

     render(){
         
         return(
            <View style={{ flex: 1 }}>
            <Header />
                <View style={MainFlowStyles.containerStyle}>
                    <Text style={MainFlowStyles.headerTextStyle}>Project List</Text>
                    <FlatList
                        ref={this.list}
                        style={{ flexGrow: 0 }}
                        data={this.state.data}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        //onContentSizeChange={() => this.list.current.scrollToEnd({ 'animated': false })}
                       renderItem={({ item }) => <Projects item={item}/>}
                    />
                </View>
            </View>
         )
     }
}
export default ProjectList;