// import React from 'react';
// import { View, Text, TextInput } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MainFlowStyles from '../Styles/MainFlowStyles';
// let number = 1

// const Bill = ({ item }) => {
//     return (
//         <View style={[MainFlowStyles.cardStyle, { padding: 10, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginHorizontal: 5 }]}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.number}</Text>
//             <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
//                 <TextInput style={{ fontSize: 16 }}
//                 placeholder='Item'
//                 onChangeText={Uname => this.setState({ Uname: Uname })}
//                 ></TextInput>
//                 <View style={{ marginBottom: 2 }} />
//             </View>
//             <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
//                 <TextInput style={{ fontSize: 16 }}
//                     placeholder='price'
//                 ></TextInput>
//                 <View style={{ marginBottom: 2 }} />
//             </View>
//             <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
//                 <TextInput style={{ fontSize: 16 }}
//                     placeholder='qty'
//                 ></TextInput>
//                 <View style={{ marginBottom: 2 }} />
//             </View>
//             <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
//                 <View style={{ flexDirection: 'row' }}>
//                     <TextInput style={{ fontSize: 16 }}
//                         placeholder='ctg'
//                     ></TextInput>
//                     <View style={{ justifyContent: 'flex-end', marginBottom: 2 }}>
//                         <FontAwesome name='chevron-down' size={10} color='#FF3301' />
//                     </View>
//                 </View>
//                 <View style={{ marginBottom: 2 }} />
//             </View>
//             <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
//                 <TextInput style={{ fontSize: 16 }}
//                     placeholder='Pkr'

//                 >{item.pkr}</TextInput>
//                 <View style={{ marginBottom: 2 }} />
//             </View>
//         </View>
//     );
// };

// export default Bill;