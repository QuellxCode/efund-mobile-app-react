import React, {Component} from 'react';
import { ActivityIndicator,Dimensions } from 'react-native';


class Clearpayorder extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.navigation.replace('GeneratePayOrder')
        this.props.navigation.navigate('Home')
      }

    render(){
        const screenHeight = Math.round(Dimensions.get('window').height)/2;
        return(
          <ActivityIndicator color='red' style={{paddingVertical:screenHeight}}/>
        )
    }
}

export default Clearpayorder;