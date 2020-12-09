import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Constants from 'expo-constants';

let idCitoyen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//method to get the user ID
const getId =() => {
  axios.get(`https://blockcovid-api.herokuapp.com/api/citoyens/22344914-21f7-4459-aa84-a848ae3ec321`).then((res) => {
  
      console.log(res.data);
      idCitoyen=res.data[0].id;
    
      console.log(idCitoyen+"ID");
      
    });
}

//handle the BarCode Screen
const HomeScreen = () => {
  //check if permission are granted
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  //const to use navigation.navigate
  const navigation=useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  //method to handleBarCodeSanner after scan
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    //getId();
    const datas=JSON.parse(data);
    const id=datas.id;
    const role=datas.role;
    console.log("id = "+id+" / role = "+role);
    console.log(Constants.installationId + " installationID");
    if(role==="medecin"){
      const QrMedecin = {
        medecin_id:id,
        device_id:Constants.installationId
      };
      axios.post('https://blockcovid-api.herokuapp.com/api/scan_medecins',QrMedecin).then(res=> res.data);
      
    }else{
      console.log("pas médecin");
    }
  
  };

  //asking for permition
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      {scanned && <Button title={'Tap to return to landing screen'} onPress={() => {navigation.navigate("Landing" );}} />}
    </View>
  );
};

export default HomeScreen;