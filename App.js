import React from 'react';
import {Button, View, Text} from 'react-native';
import useFileStorages from './hooks/useFileStorages';

const NewModuleButton = () => {
  const {emitStore, store, clearStore} = useFileStorages();

  const onPress1 = async () => {
    try {
      const data = {
        menu: {
          id: 1,
          value: 'value1',
        },
      };
      await emitStore(data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const onPress2 = async () => {
    try {
      const data = {
        menu: {
          id: 2,
          value: 'value2',
        },
      };
      await emitStore(data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <View>
      <Button
        title="Update 1"
        color="#841584"
        onPress={onPress1}
        style={{marginTop: 20}}
      />
      <Button
        title="Update 2"
        color="#841584"
        onPress={onPress2}
        style={{marginTop: 20}}
      />
      <Button
        title="Clear"
        color="#841584"
        onPress={async () => {
          await clearStore();
        }}
        style={{marginTop: 20}}
      />
      <View style={{width: '100%', height: 100, alignSelf: 'center'}}>
        <Text>{JSON.stringify(store)}</Text>
      </View>
    </View>
  );
};

export default NewModuleButton;
