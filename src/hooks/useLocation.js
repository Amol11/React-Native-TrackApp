import {useState, useEffect} from 'react';
import {Accuracy, requestPermissionsAsync, watchPositionAsync} from 'expo-location';

export default (shouldTrack, callback) => {

    const [err, setErr] = useState(null);
    // const [subscriber, setSubscriber] = useState(null);
    
    

    useEffect(() => {
        let subscriber;

        const startWatching = async () => {
            let { status } = await requestPermissionsAsync();
            subscriber = await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                enableHighAccuracy: true,
                timeInterval: 1000,
                distanceInterval: 10
                },
                    callback
                );
                // setSubscriber(sub);
    
            if(status !== 'granted'){
                setErr('Permission to access location was denied');
            }
            else if(status === 'granted'){
                setErr(null);
            }
        };

        if(shouldTrack){
            startWatching();
        }
        else{
            if(subscriber){
                subscriber.remove();
                // setSubscriber(null);
                subscriber = null;
            }
        }

        return () => {
            if(subscriber){
                subscriber.remove();
            }
        };
    }, [shouldTrack, callback]);

    return [err];
};