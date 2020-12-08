import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';

export default function App() {
  return (

  
    
    <View style={styles.container}>
      <Text style={styles.container}>Bienvenue sur{"\n"}BlockCovid !</Text>
      <CustomButton/>
      <Text style ={styles.container2}>{"\n"}Scanne les codes QR dans les établissements participants afin de lutter contre la propagation du virus.</Text>       
      <StatusBar style="auto" />
    </View> 
    
   
   
  
  );
  
 
      
  
}

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

  _insertID = async () => {
  try {
      await AsyncStorage.setItem('id',user_id);
  } catch (error) {
      // à voir
  }
}

  _getId = async () => {
  try {
      const value = await AsyncStorage.getItem('id');
      if (value !== null) {         
          console.log(value);
      }else{
        _insertID()
      }
  } catch (error) {
      // Error retrieving data
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

