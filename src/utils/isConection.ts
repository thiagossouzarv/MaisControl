import NetInfo from '@react-native-community/netinfo';

export default async function checkInternetConnection() {
  const netInfo = await NetInfo?.fetch();
  return netInfo.isConnected;
}

/*checkInternetConnection().then(isConnected => {
  if (isConnected) {
    console.log('O dispositivo está conectado à internet.');
  } else {
    console.log('O dispositivo não está conectado à internet.');
  }
});*/