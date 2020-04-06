import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet ,Dimensions,TouchableOpacity} from 'react-native';
const{width, height} = Dimensions.get('window');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { initnotify, getToken,notify } from 'expo-push-notification-helper';

const data = [
  {
    time: "6",
    image: "Welding",
    id: 1
  },
  {
    time: "6",
    image: "Welding",
    id: 1
  }
]
export default class NotificationScreen extends React.Component {
  constructor(props) {
    super(props);};
//   componentDidMount(){
//   initnotify().then( async(data)=>{
//     if(data){
//       //var token=await getToken()
//       var token="ExponentPushToken[ArEqEWHoDfqlDQjJAultJp]"
//          // console.log(token);
//           notify(token,"NEW Message", "agr msg aya tu btana", "default")

//       }else{
//         alert('please grant this app notification permission in settings.')
//       }
 
//   })

// }
  render() {
    return (
      <View style={{ flex: 1 }}>
         <View style={styles.headerContainerStyle}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <View style={{ width: 22, height: 30, justifyContent: 'center' }}>
                    {/* <Image
                        source={require('../images/Menu.png')}
                        style={{ height: 24, width: 24 }}
                    /> */}
                </View>
            </TouchableOpacity>

            <Text style={styles.logoStyle}>I-Carry</Text>

            <TouchableOpacity>
                <MaterialCommunityIcons name='bell' color='white' size={30} />
            </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
          <View style={styles.cardStyle }>
            <FlatList
              data={data}
              renderItem={
                (item) => 
                <Text>{item.type}</Text>
              }
              keyExtractor={(item, index) => item.id.toString()}
            />
          </View>
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  cardStyle: {
    paddingTop: 10,
     paddingBottom: 10,
      flex: 1,
      borderWidth: 1,
      borderColor: '#DDD',
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 5
  },
  cardTextStyle: {
      color: '#FF3301',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center'
  },
  containerStyle: {
      flex: 1,
      marginHorizontal: 20,
      marginTop: 10,
      marginBottom: 20
  },
  headerTextStyle: {
      fontSize: 30,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginBottom: 20
  },
  cardHeadingStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginVertical: 10
  },
  tabStyles: {
      width: (width - 20) / 3
  },
  tabTextContainerStyle: {
      paddingBottom: 10, 
      borderBottomWidth: 3
  },
  tabTextStyle: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  billHeadingStyle: {
      width: (width - 40) / 3,
      alignItems: 'center',
      justifyContent: 'center'
  },
  headerContainerStyle: {
    flexDirection: 'row',
    backgroundColor: 'green',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 24
},
logoStyle: {
    color: 'white',
    fontSize: 20,
    textAlignVertical: 'center'
}
});
