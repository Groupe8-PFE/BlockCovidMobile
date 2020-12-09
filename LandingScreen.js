import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, __spread } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { AsyncStorage } from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

 var idCitoyen=0;

 const _retrieveData = async () => {
  console.log("Enter retrieveData");
  try {
    console.log("enter try")
      const value = await AsyncStorage.getItem('Daza');
      if (value !== null) {
          
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
  const citoyen={device_id:Constants.installationId};
  const request = axios.post('https://blockcovid-api.herokuapp.com/api/citoyens',citoyen)
  .then(res=> res.data);
  try {
      await AsyncStorage.setItem('Daza', 'connected');
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

  console.log("Before axios Get");

  //22344914-21f7-4459-aa84-a848ae3ec321 ${Constants.installationId}

  //PAS TRES CLAIR ATTENTION A VERIFIER to get 
    axios.get(`https://blockcovid-api.herokuapp.com/api/citoyens/${Constants.installationId}`)
    .then((res) => {
      console.log("into axios");
      idCitoyen=res.data[0].id;
      console.log(idCitoyen+" : ID citoyen");
      

      console.log(idCitoyen +" IDCITOYEN AFTER GET YESs");
  
      console.log(idCitoyen+" AFTER AXIOS");
      _retrieveData();
    });
  

  
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
