import React, {useState} from 'react';
import {withNavigation} from 'react-navigation';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon_FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Header = ({navigation}) => {
  const [NotifyHide, setnewsNotifyHide] = useState(false);
  const [selected, setselected] = useState(1);
  return (
    <View style={styles.headerContainerStyle}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <View style={{width: 22, height: 30, justifyContent: 'center'}}>
          <Image
            source={require('../images/Menu.png')}
            style={{height: 24, width: 24}}
          />
        </View>
      </TouchableOpacity>

      <Text style={styles.logoStyle}>E-Fund</Text>
      {/* <TouchableOpacity
              onPress={()=>{navigation.navigate("Notification"), setCount(false),alert(count)}
            }
            >
                <MaterialCommunityIcons name='bell' color='white' size={30} />
            </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => {
          setnewsNotifyHide(true);
          navigation.navigate("Notification")
        }}
        >
            <Text style={{color:"white", position:'absolute', alignSelf:'flex-end', marginTop:-10}}>1</Text>
     <MaterialCommunityIcons name='bell' color='white' size={30} style={{marginRight:2}}/>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainerStyle: {
    flexDirection: 'row',
    backgroundColor: '#FF3301',
    justifyContent: 'space-between',
    padding: 10,
    //marginTop: 24
  },
  logoStyle: {
    color: 'white',
    fontSize: 20,
    textAlignVertical: 'center',
  },
});

export default withNavigation(Header);
