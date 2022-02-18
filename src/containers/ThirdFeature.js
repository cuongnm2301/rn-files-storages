import React from 'react';
import { Text, Button, View } from 'react-native';
import styles from './styles';
import { createStore, DynamicModuleLoader } from 'redux-dynamic-modules';
import { getFirstModule } from '../modules/FirstModule';
import { useDispatch, useSelector } from 'react-redux';

export default function ThirdFeature({ onBackPress }) {
    const firstStore = useSelector(state => state.first);
    const dispatch = useDispatch();

    function increase() {
        dispatch({ type: 'increment' });
    }

    function decrease() {
        dispatch({ type: 'decrement' });
    }
    return (
        <DynamicModuleLoader modules={[getFirstModule()]}>
            <View style={styles.featureContainer}>
                <Text style={{ fontSize: 24 }}>First Feature</Text>
                <Button title={'Go back second feature'} onPress={onBackPress} />
                <Button title={'Increase +'} onPress={increase} />
                <Button title={'Decrease -'} onPress={decrease} />
                <Text style={styles.text}>{firstStore.value}</Text>
            </View>
        </DynamicModuleLoader>
    );
}
