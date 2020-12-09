import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, __spread } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { AsyncStorage } from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
import axios from 'axios'

  var idUser;
  var auth=false;
 const _retrieveData = async () => {
  console.log("Enter retrieveData");
  try {
    console.log("enter try")
      const value = await AsyncStorage.getItem('test12');
      if (value !== null) {
          auth=true;
          console.log(value+" : VALUE");
          console.log("if value !=== null");
      }else{
      console.log("if value is null");
      _storeData();
      }
  } catch (error) {
      console.log(error+" erreur message");
  }
}

const _storeData = async () => {
  console.log("enter storeDAta");
  const request = axios.post('https://blockcovid-api.herokuapp.com/api/citoyens','')
  .then(res=> res.data);
  //idUser = request.then(response=>response.data);
  console.log(+ " ::id user");
  try {
    console.log(AsyncStorage.getAllKeys());
      await AsyncStorage.setItem('test12', '22');
      console.log(idUser);
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
 
const LandingScreen = () => {
  
  const navigation=useNavigation();
  _retrieveData();
    return (
        <View style={styles.container}>
        <Text style={styles.container}>Bienvenue sur{"\n"}BlockCovid !</Text>
        <CustomButton onPress={() => {
          navigation.navigate("Home" );
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