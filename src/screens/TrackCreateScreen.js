import React, {useContext, useCallback} from 'react';
import Map from '../components/Map';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {SafeAreaView, withNavigationFocus} from 'react-navigation';
import Spacer from '../components/Spacer';
import useLocation from '../hooks/useLocation';
// import '../_mockLocation';
import {Context as LocationContext} from '../context/LocationContext';
import TrackForm from '../components/TrackForm';
import {FontAwesome} from '@expo/vector-icons';

const TrackCreateScreen = ({isFocused}) => {

    const {state: {recording}, addLocation} = useContext(LocationContext);

    const callback = useCallback((location) => {
        addLocation(location, recording);
    }, [recording]);

    const [err] = useLocation(isFocused || recording, callback);
    // console.log(isFocused);
    return (
        <SafeAreaView forceInset={{top: 'always'}}>
            <Spacer>
                <Text h2>Create a Track</Text>
            </Spacer>
            <Map/>
            {err ? <Text>Please enable location services.</Text> : null}
            <TrackForm/>
        </SafeAreaView>
    );
};

TrackCreateScreen.navigationOptions = {
    title: 'Add Track',
    tabBarIcon: <FontAwesome name="plus" size={20}/>
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);