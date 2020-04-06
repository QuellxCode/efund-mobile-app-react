import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, Modal } from 'react-native';
import Header from '../../../components/Header';
import { Button } from 'react-native-elements';
import MainFlowStyles from '../../../Styles/MainFlowStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');

class GenerateBillScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : this.props.navigation.state.params.dataArray,
            visible: false,
            orders: [
                { id: 0, itemName: 'Item 01', price: '00.00', quantity: '1' },
                { id: 1, itemName: 'Item 02', price: '01.00', quantity: '0' },
            ]
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
                    <View style={[MainFlowStyles.cardStyle, { paddingTop: 10, paddingBottom: 10, flex: 1 }]}>
                        <Text style={MainFlowStyles.headerTextStyle}>Billing</Text>

                        <View style={{ flexDirection: 'row', paddingBottom: 20, marginTop: 20, borderBottomColor: '#FFC1B2', borderBottomWidth: 1 }}>
                            <View style={MainFlowStyles.billHeadingStyle}>
                                <Text>Item Name</Text>
                            </View>
                            <View style={MainFlowStyles.billHeadingStyle}>
                                <Text>Price</Text>
                            </View>
                            <View style={MainFlowStyles.billHeadingStyle}>
                                <Text>Quantity</Text>
                            </View>
                        </View>
                        
                        <FlatList
                            style={{ flexGrow: 0 }}
                            data={this.state.orders}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ flexDirection: 'row', paddingBottom: 20, marginTop: 20, borderBottomColor: '#FFC1B2', borderBottomWidth: 1 }}>
                                        <View style={MainFlowStyles.billHeadingStyle}>
                                            <Text>{item.itemName}</Text>
                                        </View>
                                        <View style={MainFlowStyles.billHeadingStyle}>
                                            <Text>{'Rs. ' + item.price}</Text>
                                        </View>
                                        <View style={MainFlowStyles.billHeadingStyle}>
                                            <Text>{item.quantity}</Text>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                        
                    </View>
                </View>
                <View style={{ marginHorizontal: 20, marginBottom: 20, marginTop: 10, elevation: 5 }}>
                    <Button
                        title='Forward Request'
                        buttonStyle={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 10 }}
                        containerStyle={{ marginHorizontal: 10 }}
                        onPress={() => this.setState({ visible: true })}
                    />
                </View>

                <Modal animationType='fade' transparent={true} visible={this.state.visible}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
                        <View style={{backgroundColor: 'white', paddingTop: 10, borderRadius: 20, width: width * 0.8}}>
                            <View style={{ alignSelf: 'center', padding: 20 }}>
                                <FontAwesome name='send' color='#FF3301' size={50} />
                            </View>
                            <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: '#FF3301', paddingBottom: 40 }}>Request sent for approval</Text>
                            <Button
                                title='OK'
                                buttonStyle={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }}
                                onPress={() => this.setState({ visible: false })}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

export default GenerateBillScreen;