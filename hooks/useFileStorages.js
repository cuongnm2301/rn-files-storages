import {useEffect, useState} from 'react';
import {NativeModules, NativeEventEmitter, Platform} from 'react-native';
import RNFS from 'react-native-fs';

const {FileObserverModule} = NativeModules;

const useFileStorages = () => {
  const [store, setStore] = useState({});
  const STORE_PATH = RNFS.TemporaryDirectoryPath + 'store.json';
  useEffect(() => {
    RNFS.exists(STORE_PATH).then(result => {
      if (result) {
        const storeParse = parseData(STORE_PATH);
        setStore(storeParse);
      }
    });
  }, [STORE_PATH]);

  useEffect(() => {
    FileObserverModule.initWatchFile(STORE_PATH, 'STORE_CHANGE');
    const eventEmitter = new NativeEventEmitter(FileObserverModule);
    const sub = eventEmitter.addListener('STORE_CHANGE', async data => {
      console.log('data: ', data);
      try {
        setStore(JSON.parse(data));
       
      } catch (error) {
        setStore({});
      }
    });
    return () => {
      sub?.remove();
    };
  }, [STORE_PATH]);

  const parseData = async(STORE_PATH) =>{
    try {
      const read = await RNFS.readFile(STORE_PATH);
      const storeParse = JSON.parse(read);
      return storeParse;
    } catch (ex) {
      return {};
    }
  }
  
  const emitStore = async value => {
    if (typeof value !== 'object') {
      throw new Error('Must be emit object');
    }
    const exists = await RNFS.exists(STORE_PATH);
    if (exists) {
      const storeParse = parseData(STORE_PATH);
      if(storeParse){
        await RNFS.writeFile(
          STORE_PATH,
          JSON.stringify({...storeParse, ...value}),
        );
      }
      
    } else {
      await RNFS.writeFile(STORE_PATH, JSON.stringify({...value}));
    }
  };

  const clearStore = async () => {
    await FileObserverModule.clearFileToEmptyObject(STORE_PATH);
    setStore({});
  };

  return {store, emitStore, clearStore};
};

export default useFileStorages;
