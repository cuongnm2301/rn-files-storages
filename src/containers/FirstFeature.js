import React, { useEffect } from 'react';
import { Text, Button, View } from 'react-native';
import { useState } from 'react';
import styles from './styles';
import SecondFeature from './SecondFeature';
import { createStore, DynamicModuleLoader } from 'redux-dynamic-modules';
import { getFirstModule } from '../modules/FirstModule';
import { useDispatch, useSelector } from 'react-redux';

const store = createStore(
    {
        initialState: {
            value: 0,
        },
        enhancers: [],
        extensions: [],
    },
    getFirstModule()
);

export default function FirstFeature(props) {
    const [showSecondFeature, setShowSecondFeature] = useState(false);
    const firstStore = useSelector(state => state.first);
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    function showSecond() {
        console.log('Showing second feature');
        setShowSecondFeature(true);
    }

    function hideSecond() {
        console.log('Dismissing second feature');
        setShowSecondFeature(false);
    }

    function increase() {
        dispatch({ type: 'increment' });
    }

    function decrease() {
        dispatch({ type: 'decrement' });
    }

    useEffect(() => {
        console.log('First feature value changed', state?.first?.value);
    }, [state]);
    return (
        <DynamicModuleLoader modules={[getFirstModule()]}>
            <View style={styles.featureContainer}>
                <Text style={styles.text}>First Feature</Text>
                <Button title={'Start second feature'} onPress={showSecond} />
                <Button title={'Increase +'} onPress={increase} />
                <Button title={'Decrease -'} onPress={decrease} />
                <Text style={styles.text}>
                    {Number.isInteger(firstStore?.value) ? firstStore.value : 'Loading'}
                </Text>
                {showSecondFeature && <SecondFeature onBackPress={hideSecond} />}
            </View>
        </DynamicModuleLoader>
    );
}
