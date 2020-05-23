import * as Location from 'expo-location';

const tenMetersWithDegrees = 0.0001;

const getLocation = increment => {
    return {
        timestamp: 10000000,
        coords: {
            accuracy: 5,
            altitude: 5,
            heading: 0,
            latitude: 28.969772 + increment * tenMetersWithDegrees,
            longitude: 77.7293803 + increment * tenMetersWithDegrees,
            speed: 0,
            altitudeAccuracy: 5,
        }
    };
};

let counter = 0;

setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter)
    });
    counter++;
}, 1000);