import React, { Component } from "react";
import {
  Image,
  ActivityIndicator,
  View,
  FlatList, Picker,
  AsyncStorage,
  StatusBar, 
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Style1 from "../styles/MainScreenStyle";
console.disableYellowBox = true
import ShareMenu from 'react-native-share-menu';

import Urdu from "../Lists/MainScreen/LocationC.json";
import English from "../Lists/MainScreen/LocationE.json";
import RenderCards from "../component/CardView";
import { BarIndicator } from "react-native-indicators";
import { widthPercentageToDP, heightPercentageToDP } from "../component/MakeMeResponsive";
import { RFPercentage } from "react-native-responsive-fontsize";
export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    const { screenProps } = this.props;
    this.state = {
      userID: screenProps.userID,
      username: screenProps.username,
      cat_name: '', M1TurnMeOn: false,
      chanel: screenProps.chanel,
      Notify: false,
      isLoading: true,
      thisEnd: 5,
      isRefreshing: false,
      Language: this.props.screenProps.Language,
      data: [],
      Category: [],
      PostLenght: 0,
      pushingMore: false
    };
    this._reachedEnd = this._reachedEnd.bind(this);
    this._refreshdata = this._refreshdata.bind(this);
  }
  navigateToScreen = (route, num, neww, url) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: { neww: neww, url: url }
    });
    this.changer(num);
    this.props.navigation.dispatch(navigateAction);
  };
  async componentWillMount() {
    let a = 0;
    var that = this;
    let thisdata = []
    await fetch("http://testing.techmelo.com/happycow/rest_happycow/post/read_category.php")
      .then(response => response.json())
      .then(json => {
        json.records.map(dataItem => {
          if (dataItem.cat_name != null) {
            thisdata.push({
              cat_id: dataItem.cat_id,
              cat_name: dataItem.cat_name,
            });
          }
        });
      })
    this.setState({ Category: thisdata })

    ShareMenu.getSharedText((text) => {

      let ary = text.split('/')
      ary.forEach(element => {
        let newname = element.split('.')
        if (element == "images") {
          this.props.navigation.navigate("UploadPost", { url: text, neww: element })
        }
        if (element == "video") {
          this.props.navigation.navigate("UploadPost", { url: text, neww: element })
        }
        else {
          newname.forEach(element => {
            if (element == "whatsapp") {
              this.props.navigation.navigate("UploadPost", { url: text, neww: "images" })
            }
            if (element == "facebook") {
              this.props.navigation.navigate("UploadPost", { url: text, neww: "images" })
            }
          });
        }
      });
    })
    let name = this.state.username
    await AsyncStorage.setItem('username', name)
    let value = await AsyncStorage.getItem('notify')
    if (value == null) {
      await AsyncStorage.setItem('notify', 'false')
    }
    this.setState({ isLoading: true });
    fetch(
      "http://testing.techmelo.com/happycow/rest_happycow/post/read.php?user_id=" +
      this.state.userID +
      "&rec_from=0 & rec_to=5&cat_name="
    )
      .then(response => response.json())
      .then(json => {
        //  alert(JSON.stringify(json))
        let thisdata = [];
        json.records.map(dataItem => {
          str = dataItem.post_thumbnail.replace(/^"(.*)"$/, '$1');
          let ary = str.split('.')
          let thumbnail
          if (ary[ary.length - 1] == "mp4") {
            thumbnail = ary[ary.length - 2] + ".jpg"
          }
          let thisUserAgree = "B";
          if (dataItem.user_liked === "1") {
            thisUserAgree = "P";
          } else if (dataItem.user_disliked === "1") {
            thisUserAgree = "N";
          }
          const Cata = "" + dataItem.cat_name;
          thisdata.push({
            Key: dataItem.post_id,
            site: dataItem.post_url,
            image:
              "http://testing.techmelo.com/happycow/rest_happycow/objects/upload/images/" +
              str,
            NewThumbnail: "http://testing.techmelo.com/happycow/rest_happycow/objects/upload/images/" + thumbnail,
            Extension: ary[ary.length - 1],
            Heading: dataItem.post_title,
            NewsPreview: dataItem.post_summary,
            PostTime: dataItem.post_valid_datetime_to.split(" ")[0],
            City: dataItem.location_name,
            Source: dataItem.post_source_name,
            Cat: Cata,
            Saved: dataItem.user_bookmarked === "1" ? true : false,
            Agree: thisUserAgree,
            LikeC: parseInt(dataItem.post_like_count),
            ULikeC: parseInt(dataItem.post_dislike_count),
            userID: this.state.userID,
            username: this.state.username
          });
        });
        return thisdata;
      })
      .then(thisdata => {
        this.setState({ data: thisdata })
      })
      .then(() => {
        this.setState({ isLoading: false });

      })
      .catch(e => {
        //reject('ERROR GETTING DATA FROM FACEBOOK')
        alert(e);
      });
  }
  componentDidMount() {

  }
  _reachedEnd = () => {
    this.setState({ pushingMore: true });
    fetch(
      "http://testing.techmelo.com/happycow/rest_happycow/post/read.php?user_id=" +
      this.state.userID +
      "&rec_from=" +
      this.state.thisEnd +
      "&rec_to=5&cat_name=" + this.state.cat_name
    )
      .then(response => response.json())
      .then(json => {
        let thisdata = [];
        //alert("" + json.length);
        const thisEndz = this.state.thisEnd + 5;
        this.setState({ thisEnd: thisEndz });
        "records" in json
          ? json.records.map(dataItem => {
            str = dataItem.post_thumbnail.replace(/^"(.*)"$/, '$1');
            let ary = str.split('.')
            let thumbnail
            if (ary[ary.length - 1] == "mp4") {
              thumbnail = ary[ary.length - 2] + ".jpg"
            }
            let thisUserAgree = "B";
            if (dataItem.user_liked === "1") {
              thisUserAgree = "P";
            } else if (dataItem.user_disliked === "1") {
              thisUserAgree = "N";
            }
            const Cata = "" + dataItem.cat_name;
            thisdata.push({
              Key: dataItem.post_id,
              site: dataItem.post_url,
              image: "http://testing.techmelo.com/happycow/rest_happycow/objects/upload/images/" + str,
              NewThumbnail: "http://testing.techmelo.com/happycow/rest_happycow/objects/upload/images/" + thumbnail,
              Extension: ary[ary.length - 1],
              Heading: dataItem.post_title,
              NewsPreview: dataItem.post_summary,
              PostTime: dataItem.post_valid_datetime_to.split(" ")[0],
              City: dataItem.location_name,
              Source: dataItem.post_source_name,
              Cat: Cata,
              Saved: dataItem.user_bookmarked === "1" ? true : false,
              Agree: thisUserAgree,
              LikeC: parseInt(dataItem.post_like_count),
              ULikeC: parseInt(dataItem.post_dislike_count),
              userID: this.state.userID,
              username: this.state.username
            });
          })
          : (thisdata = false);
        return thisdata;
      })
      .then(thisdata => {
        !thisdata
          ? this.setState({
            pushingMore: false
          })
          : this.setState({
            pushingMore: false,
            data: [...this.state.data, ...thisdata]
          });
      })
      .catch(e => {
        //reject('ERROR GETTING DATA FROM FACEBOOK')
        alert(e);
      });
  };
  toggleButtonDrawer = () => {
    this.props.navigation.openDrawer();
  }
  fetchDataforSelectedCategory(name) {
    this.setState({ refreshing: true, isLoading: true, cat_name: name }, () => {
      fetch(
        "http://testing.techmelo.com/happycow/rest_happycow/post/post_by_cat.php?user_id=" + this.state.userID + "&rec_from=0&rec_to=5&cat_name=" + name
      )
        .then(response => response.json())
        .then(json => {

          let thisdata = [];
          this.setState({ PostLenght: json.length });
          if (json.records) {
            json.records.map(dataItem => {
              str = dataItem.post_thumbnail.replace(/^"(.*)"$/, '$1');
              let ary = str.split('.')
              let thumbnail
              if (ary[ary.length - 1] == "mp4") {
                thumbnail = ary[ary.length - 2] + ".jpg"
              }
              let thisUserAgree = "B"; //let thisUserSave = false
              if (dataItem.user_liked === "1") {
                thisUserAgree = "P";
              } else if (dataItem.user_disliked === "1") {
                thisUserAgree = "N";
              }
              const Cata = "" + dataItem.cat_name;
              thisdata.push({
                Key: dataItem.post_id,
                site: dataItem.post_url,
                image: "http://testing.techmelo.com/happycow/rest_happycow/objects/upload/images/" + str,
                Heading: dataItem.post_title,
                NewThumbnail: "http://testing.techmelo.com/happycow/rest_happycow/objects/upload/images/" + thumbnail,
                Extension: ary[ary.length - 1],
                NewsPreview: dataItem.post_summary,
                PostTime: dataItem.post_valid_datetime_to.split(" ")[0],
                City: dataItem.location_name,
                Source: dataItem.post_source_name,
                Cat: Cata,
                Saved: dataItem.user_bookmarked === "1" ? true : false,
                Agree: thisUserAgree,
                LikeC: parseInt(dataItem.post_like_count),
                ULikeC: parseInt(dataItem.post_dislike_count),
                userID: this.state.userID,
                username: this.state.username
              });
            });
          }

          return thisdata.reverse();
        })
        .then(thisdata => this.setState({ data: thisdata }))
        .then(() => {
          this.setState({ isLoading: false, thisEnd: 5 });
        })
        .catch(e => {
          //reject('ERROR GETTING DATA FROM FACEBOOK')
          alert(e);
        });
    });
  }
  renderFooter = () => {
    if (!this.state.pushingMore) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  _refreshdata = () => {
    this.setState({ refreshing: true, isLoading: true, cat_name: '' }, () => {
      fetch(
        "http://testing.techmelo.com/happycow/rest_happycow/post/read.php?user_id=" +
        this.state.userID +
        "&rec_from=0&rec_to=5"
      )
        .then(response => response.json())
        .then(json => {
          let thisdata = [];
          this.setState({ PostLenght: json.length });
          json.records.map(dataItem => {
            str = dataItem.post_thumbnail.replace(/^"(.*)"$/, '$1');
            let ary = str.split('.')
            let thumbnail
            if (ary[ary.length - 1] == "mp4") {
              thumbnail = ary[ary.length - 2] + ".jpg"
            }
            let thisUserAgree = "B"; //let thisUserSave = false
            if (dataItem.user_liked === "1") {
              thisUserAgree = "P";
            } else if (dataItem.user_disliked === "1") {
              thisUserAgree = "N";
            }
            const Cata = "" + dataItem.cat_name;
            thisdata.push({
              Key: dataItem.post_id,
              site: dataItem.post_url,
              image: "http://testing.techmelo.com/happycow/rest_happycow/objects/upload/images/" + str,
              Heading: dataItem.post_title,
              NewThumbnail: "http://testing.techmelo.com/happycow/rest_happycow/objects/upload/images/" + thumbnail,
              Extension: ary[ary.length - 1],

              NewsPreview: dataItem.post_summary,
              PostTime: dataItem.post_valid_datetime_to.split(" ")[0],
              City: dataItem.location_name,
              Source: dataItem.post_source_name,
              Cat: Cata,
              Saved: dataItem.user_bookmarked === "1" ? true : false,
              Agree: thisUserAgree,
              LikeC: parseInt(dataItem.post_like_count),
              ULikeC: parseInt(dataItem.post_dislike_count),
              userID: this.state.userID,
              username: this.state.username
            });
          });
          return thisdata;
        })
        .then(thisdata => this.setState({ data: thisdata }))
        .then(() => {
          this.setState({ isLoading: false, thisEnd: 5 });
        })
        .catch(e => {
          //reject('ERROR GETTING DATA FROM FACEBOOK')
          alert(e);
        });
    });
  };
  _keyExtractor = (item, index) => index;
  _renderItem = ({ item, index }) => (<View>

    <RenderCards Language={this.state.Language} refer={this.flatListRef} item={item} index={index} />
  </View>
  );
  render() {
    const PickerItems = this.state.Category.map((element, index) => (
      <Picker.Item
        key={"pick" + element.cat_name}
        label={"" + element.cat_name}
        value={element.cat_name}
      />
    ));
    const { data, isRefreshing } = this.state;
    return this.state.isLoading ? (
      <View style={Style1.loader}><StatusBar hidden={true}></StatusBar>
        <BarIndicator
          color="#6EB5ED"
          count={5}
          size={widthPercentageToDP("20%")}
        />

      </View>
    ) : (
        <View style={Style1.container}><StatusBar hidden={true}></StatusBar>
          {this.state.data.length != 0 && (
            <View>
              <ImageBackground source={require("../assets/img/titlebar3.png")}
                style={{
                  alignSelf: "center", height: heightPercentageToDP(32), justifyContent: 'center',
                  width: widthPercentageToDP(100),
                }}>
                <View style={{ width: widthPercentageToDP(100), marginBottom: heightPercentageToDP(2), flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => {
                    this.toggleButtonDrawer()
                  }}>
                    <Image
                      style={{
                        height: heightPercentageToDP(3), alignSelf: 'center', marginLeft: widthPercentageToDP(9), marginTop: heightPercentageToDP(0.8),
                        width: widthPercentageToDP(8)
                      }} source={require("../assets/img/comb1.png")} />
                  </TouchableOpacity>
                  <Image
                    style={{
                      height: heightPercentageToDP(4.5), marginLeft: widthPercentageToDP(6),
                      width: widthPercentageToDP(9)
                    }} source={require('../assets/img/logo.png')} />
                  <Text style={{ fontSize: RFPercentage(3), marginLeft: widthPercentageToDP(3), fontWeight: 'bold' }}>Meer EnterPrises</Text>
                </View>
                <Text style={{ textAlign: 'center', textAlign: 'center', marginTop: heightPercentageToDP(11), fontStyle: 'italic', fontSize: RFPercentage(2.3) }}>{this.state.Language ? Urdu.Filter : English.Filter}</Text>
                <Picker
                  selectedValue={this.state.selectedValue}
                  prompt="مصنف کا انتخاب کریں"
                  style={{
                    width: heightPercentageToDP(35),
                    alignSelf: 'center', zIndex: 5,
                    marginTop: heightPercentageToDP(2),
                    borderWidth: widthPercentageToDP(1),
                    flexDirection: "row-reverse",
                    color: "#000",
                    fontFamily: "Jameel Noori Nastaleeq",
                    fontSize: widthPercentageToDP(5)
                  }}
                  mode={"dropdown"}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ selectedValue: itemValue })
                    this.fetchDataforSelectedCategory(itemValue);
                  }}
                >
                  {PickerItems}
                </Picker>
              </ImageBackground>
              <Image style={{
                position: 'absolute', zIndex: 5,
                alignSelf: "center", height: heightPercentageToDP(4.05), marginTop: heightPercentageToDP(25),
                width: heightPercentageToDP(35),
              }} source={require("../assets/img/dropdown.png")}></Image >

              <View style={Style1.ScrollMe}>
                {/* <View style={{ alignSelf: "center", height: heightPercentageToDP(6), borderRadius: widthPercentageToDP(2), width: widthPercentageToDP(92.5), backgroundColor: '#6EB5ED' }}> */}
                <FlatList
                  ref={ref => {
                    this.flatListRef = ref;
                  }}
                  removeClippedSubviews={true}
                  data={data}
                  initialNumToRender={4}
                  keyExtractor={this._keyExtractor}
                  renderItem={(this._renderItem = this._renderItem.bind(this))}
                  onEndReached={this._reachedEnd}
                  refreshing={isRefreshing}
                  onEndReachedThreshold={0.5}
                  onRefresh={this._refreshdata}
                  ListFooterComponent={this.renderFooter}
                />
              </View></View>
          )}
          <StatusBar barStyle="light-content" backgroundColor="#1a7bcd" />
        </View>
      );
  }
}
