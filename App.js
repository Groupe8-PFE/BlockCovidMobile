import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  var dataScanned;

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  _getId

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`le code qr ${type} a scanné ces données : ${data} !`);
    dataScanned=data;
  };
  
  if (hasPermission === null) {
    return <Text>L'application doit avoir accès à la camera</Text>;
  }
  if (hasPermission === false) {
    return <Text>vous n'avez pas d'accès à la caméra</Text>;
  }
  return (


    
    <View style={styles.container}>
      <Text style={styles.container}>Bienvenue sur{"\n"}BlockCovid !</Text>
      <CustomButton/>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Text style ={styles.container2}>{"\n"}Scanne les codes QR dans les établissements participants afin de lutter contre la propagation du virus. </Text>       
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

const _insertid = async () => {
  var userId = 1;
  try {
      await AsyncStorage.setItem('id', userId);
  } catch (error) {
      console.log("Erreur insertId");
  }
}

const _getId = async () => {
  try {
      const value = await AsyncStorage.getItem('id');
      if (value !== null) {
          console.log(value);
      }else{
      _insertid;
      }
  } catch (error) {
      console.log("Erreur getID");
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

