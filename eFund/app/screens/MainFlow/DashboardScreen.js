import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import Header from '../../components/Header';
import Timeline from '../../components/Timeline';
import TwoColumnCard from '../../components/TwoColumnCard';
import ColumnCard from '../../components/ColumnCard';
import MainFlowStyles from '../../Styles/MainFlowStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';

class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {id: 1, name: 'Purchaser', select: true},
                {id: 2, name: 'Manager', select: false},
                {id: 3, name: 'Director', select: false},
                {id: 4, name: 'Accountant', select: false}
            ],
            User: [],
        };
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
       } catch (error) {
         console.log('error getting data')
       }
     };

    render() {
        console.log(this.state.User.roles)
        if(this.state.User.roles == "Purchaser" || this.state.User.roles == "Supervisor"){
        return (
            <View>
                <Header />
                <ScrollView
                    style={{ paddingBottom: 30, marginBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={styles.welcomeTextStyle}>Welcome!</Text>
                        <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate("Notifications")}
                        >
                            <Text style={{fontSize:20,color:"blue"}}>
                                Notifications
                            </Text>
                        </TouchableOpacity>
                        {/* TIMELINE */}
                        <View style={[MainFlowStyles.cardStyle, { paddingBottom: 10, marginBottom: 20 }]}>
                            <View style={styles.currentStatusContainer}>
                                <Text style={styles.currentStatusTextStyle}>Current Status</Text>
                            </View>
                            <View style={{ padding: 10, alignItems: 'center' }}>
                                <Timeline data={this.state.data} />
                            </View>
                        </View>

                        {/* Cards */}
                        <TwoColumnCard />
                    </View>
                </ScrollView>
            </View>
        );
        }
        if(this.state.User.roles == "Director"){
            return (
                <View>
                    <Header />
                    <ScrollView
                        style={{ paddingBottom: 30, marginBottom: 40 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ marginHorizontal: 20 }}>
                            <Text style={styles.welcomeTextStyle}>Welcome!</Text>
    
                            {/* Cards */}
                            <ColumnCard />
                        </View>
                    </ScrollView>
                </View>
            );
        }
        return(
            <View>
                    <Header />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    welcomeTextStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 10
    },
    currentStatusContainer: {
        borderBottomColor: '#FF3301',
        borderBottomWidth: 1,
        padding: 10
    },
    currentStatusTextStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10
    }
});

export default DashboardScreen;