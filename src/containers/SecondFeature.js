import React from 'react';
import { Text, Button, View } from 'react-native';
import { useState } from 'react';
import ThirdFeature from './ThirdFeature';
import styles from './styles';
import { useSelector } from 'react-redux';
import { createStore, DynamicModuleLoader } from 'redux-dynamic-modules';
import { getSecondModule } from '../modules/SecondModule';

const store = createStore(
    {
        initialState: {
            value: 0,
        },
        enhancers: [],
        extensions: [],
    },
    getSecondModule()
);
export default function SecondFeature({ onBackPress = () => {} }) {
    const [showThirdFeature, setShowThirdFeature] = useState(false);
    const state = useSelector(state => state);
    console.log('State in second feature', state);
    function showThird() {
        console.log('Showing third feature');
        setShowThirdFeature(true);
    }

    function hideThird() {
        console.log('Dismissing third feature');
        setShowThirdFeature(false);
    }
    return (
        <DynamicModuleLoader modules={[getSecondModule()]}>
            <View style={styles.featureContainer}>
                <Text style={{ fontSize: 24 }}>Second Feature</Text>
                <Button title={'Start third feature'} onPress={showThird} />
                <Button title={'Go back first feature'} onPress={onBackPress} />
                {showThirdFeature && <ThirdFeature onBackPress={hideThird} />}
            </View>
        </DynamicModuleLoader>
    );
}
