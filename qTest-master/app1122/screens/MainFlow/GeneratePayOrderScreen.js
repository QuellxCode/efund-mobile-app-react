import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Header from '../../components/Header';
import MainFlowStyles from '../../Styles/MainFlowStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDeisgn from 'react-native-vector-icons/AntDesign';
import { Input, Button } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';

class GeneratePayOrderScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <ScrollView>
                    <View style={MainFlowStyles.containerStyle}>
                        <Text style={MainFlowStyles.headerTextStyle}>Pay Orders</Text>

                        <View style={[MainFlowStyles.cardStyle]}>
                            <Text style={MainFlowStyles.cardHeadingStyle}>Pay Order</Text>
                            <View style={{ borderBottomColor: '#FF3301', borderBottomWidth: 1, marginBottom: 30 }} />

                            <View style={{ marginHorizontal: 10 }}>
                                <Input
                                    placeholder='Name'
                                    autoCapitalize='words'
                                    autoCompleteType='name'
                                    inputStyle={{ marginLeft: 14 }}
                                    inputContainerStyle={{ borderBottomColor: '#FF3301' }}
                                    containerStyle={{ marginBottom: 20 }}
                                    leftIcon={ <Ionicons name='md-person' size={22} color='#FF3301' /> }
                                    leftIconContainerStyle={{ marginLeft: 0 }}
                                />

                                <Input
                                    placeholder='Amount'
                                    autoCapitalize='none'
                                    autoCompleteType='off'
                                    keyboardType='number-pad'
                                    inputStyle={{ marginLeft: 12 }}
                                    inputContainerStyle={{ borderBottomColor: '#FF3301' }}
                                    containerStyle={{ marginBottom: 20 }}
                                    leftIcon={
                                        <View style={{ width: 18, height: 18, borderRadius: 18 / 2, backgroundColor: '#FF3301', alignItems: 'center', justifyContent: 'center' }}>
                                            <FontAwesome name='dollar' size={10} color='white' />
                                        </View>
                                    }
                                    leftIconContainerStyle={{ marginLeft: 0 }}
                                />

                                <Input
                                    placeholder='Date'
                                    autoCapitalize='none'
                                    autoCompleteType='off'
                                    keyboardType='number-pad'
                                    inputStyle={{ marginLeft: 10 }}
                                    inputContainerStyle={{ borderBottomColor: '#FF3301' }}
                                    containerStyle={{ marginBottom: 20 }}
                                    leftIcon={ <AntDeisgn name='calendar' size={20} color='#FF3301' /> }
                                    leftIconContainerStyle={{ marginLeft: 0 }}
                                />

                                <Text style={{ fontSize: 18, marginBottom: 20, marginLeft: 8 }}>Description:</Text>
                                <Input
                                    placeholder='Please add the name fo the relevant company from which you want to purchase cement.'
                                    autoCapitalize='none'
                                    autoCompleteType='off'
                                    keyboardType='default'
                                    inputStyle={{ fontSize: 14, paddingBottom: 50, textAlignVertical: 'top' }}
                                    inputContainerStyle={{ borderColor: '#FF3301', borderWidth: 1, borderRadius: 10 }}
                                    multiline
                                />

                                <Button
                                    title='Generate'
                                    buttonStyle={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 10, marginVertical: 20, width: 140, alignSelf: 'center' }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <Entypo name='plus' color='#FF3301' size={40} />
                </View>
            </View>
        );
    }
}

export default GeneratePayOrderScreen;