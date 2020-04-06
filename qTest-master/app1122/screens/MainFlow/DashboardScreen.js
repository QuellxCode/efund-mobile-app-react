import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import Timeline from '../../components/Timeline';
import TwoColumnCard from '../../components/TwoColumnCard';
import MainFlowStyles from '../../Styles/MainFlowStyles';

class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {id: 1, name: 'Purchaser', select: true},
                {id: 2, name: 'Manager', select: false},
                {id: 3, name: 'Director', select: false},
                {id: 4, name: 'Accountant', select: false}
            ]
        };
    }

    render() {
        return (
            <View>
                <Header />
                <ScrollView
                    style={{ paddingBottom: 30, marginBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={styles.welcomeTextStyle}>Welcome!</Text>
                        
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