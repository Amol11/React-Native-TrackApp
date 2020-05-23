import React, {useContext} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {Context as TrackContext} from '../context/TrackContext';
import MapView, {Polyline} from 'react-native-maps';

const TrackDetailScreen = ({navigation}) => {
    const {state} = useContext(TrackContext);
    
    const _id = navigation.getParam('_id');

    const track = state.find(track => track._id === _id);

    if(!track){
        return <ActivityIndicator size="large" style={{marginTop: 150}}/>;
    }

    const initialCoords = track.locations[0].coords;
    // console.log(track.locations[0].coords);
    return (
        <>
            <Text style={{fontSize:48}}>{track.name}</Text>
            <MapView
                initialRegion={{
                    longitudeDelta: 0.01,
                    latitudeDelta: 0.01,
                    ...initialCoords
                }}
                style={styles.map}    
            >
                <Polyline coordinates={track.locations.map(loc => loc.coords)}/>
            </MapView>
        </>
    );
};

const styles = StyleSheet.create({
    map: {
        height: 400
    }
});

export default TrackDetailScreen;