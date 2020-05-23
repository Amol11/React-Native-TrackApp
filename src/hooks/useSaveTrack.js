import {useContext} from 'react';
import {Context as TrackContext} from '../context/TrackContext';
import {Context as LocationContext} from '../context/LocationContext';
import {navigate} from '../navigationRef';

export default () => {
    const {createTrack} = useContext(TrackContext);
    const {reset, state: {locations, name}} = useContext(LocationContext);

    const saveTrack = async () => {
        await createTrack(name, locations);
        reset();
        navigate('TrackList');
    };

    return [saveTrack];
};