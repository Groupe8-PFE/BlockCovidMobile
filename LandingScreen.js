import React, {useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, __spread} from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { AsyncStorage } from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

var idCitoyen=0;


const registerForPushNotificationsAsync = async () => {
  console.log("test token")
 if (Constants.isDevice) {
   const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
   let finalStatus = existingStatus;
   if (existingStatus !== 'granted') {
     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
     finalStatus = status;
   }
   if (finalStatus !== 'granted') {
     alert('Failed to get push token for push notification!');
     return;
   }
   const token = (await Notifications.getExpoPushTokenAsync()).data;
   console.log(token)
   await AsyncStorage.setItem('tokenDevice', JSON.stringify(token));
 } else {
   alert('Must use physical device for Push Notifications');
 }

 if (Platform.OS === 'android') {
   Notifications.setNotificationChannelAsync('default', {
     name: 'default',
     importance: Notifications.AndroidImportance.MAX,
     vibrationPattern: [0, 250, 250, 250],
     lightColor: '#FF231F7C',
   });
 }
}


 const _retrieveData = async () => {
  try {
      const value = await AsyncStorage.getItem('smartphone');
      if(value===null) {
        _storeData();
      }
      else {
        console.log("value =",value)
      }
  } catch (error) {
      console.log(error+" erreur message");
  }
}

const _storeData = async () => {
  const new_token = await AsyncStorage.getItem('tokenDevice');
  console.log(new_token)
  const citoyen = {
    device_id : Constants.installationId,
    token_device : new_token
  }
  const request = axios.post('https://blockcovid-api.herokuapp.com/api/citoyens',citoyen)
  .then(res=> res.data);
  try {
      await AsyncStorage.setItem('smartphone', 'Connected');
  } catch (error) {
    console.log(error+" erreur message");
  }
}

 
const styles = StyleSheet.create({
    container: {
      flex: 6,
      textAlign: 'center',
      backgroundColor: '#fff',
      alignItems: 'center',
      marginHorizontal : 20,
      justifyContent: 'center',
      textAlignVertical :'center',
      fontSize : 40
    },
    container2: {
      flex: 1,
      textAlign: 'center',
      backgroundColor: '#fff',
      alignItems: 'center',
      marginHorizontal : 20,
      justifyContent: 'center',
    },
    button: {
      backgroundColor: '#7fffd4',
      paddingHorizontal : 85,
      paddingVertical : 25,
      borderRadius : 45
      
    },
    buttonText: {
      color: "red",
      fontSize : 40
    }
});

 //LandinScreen ==> ecran d'accueil démarage ordi
const LandingScreen = () => {
  //const to use navigation.navigate
  const navigation=useNavigation();
  _retrieveData();
  /*
  useEffect(() => {
    axios.get(`https://blockcovid-api.herokuapp.com/api/citoyens/${Constants.installationId}`)
    .then((res) => {
      idCitoyen=res.data.id;
     
    });
  });
  */
  //PAS TRES CLAIR ATTENTION A VERIFIER to get 
    return (
        <View style={styles.container}>
        <Text style={styles.container}>Bienvenue sur{"\n"}BlockCovid !</Text>
        <CustomButton onPress={() => {
          navigation.navigate("Home");
        }}
        />
        <Text style ={styles.container2}>{"\n"}Scanne les codes QR dans les établissements participants afin de lutter contre la propagation du virus. </Text>       
        <StatusBar style="auto" />
      </View> 
    );
};


const CustomButton = props => {
  return (

    <TouchableOpacity onPress={props.onPress}>
    <View style={{...styles.button, ...props.style}}>
    <Text styles={{...styles.buttonText,...props.textStyling}}> SCAN
      {props.children} 
    </Text>
    </View>
    </TouchableOpacity>

 

  );
};

 
export default LandingScreen;
