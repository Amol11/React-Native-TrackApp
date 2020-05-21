import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import {AsyncStorage} from 'react-native';
import {navigate} from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type){
        case 'add_error':
            return {...state, errorMessage: action.payload};

        case 'signup_signin':
            return {errorMessage: '', token: action.payload};

        case 'clear_err_msg':
            return {...state, errorMessage: ''};

        case 'signout':
            return {token: null, errorMessage: ''};

        default:
            return state;
    }
};

const tryLocalSignin = (dispatch) => {
    return async () => {
        const token = await AsyncStorage.getItem('token');
        if(token){
            dispatch({type: 'signup_signin', payload: token});
            navigate('TrackList');
        }
        else{
            navigate('loginFlow');
        }
    }
}

const clearErrorMessage = (dispatch) => {
    return () => {
        dispatch({type: 'clear_err_msg'});
    };
};

const signup = (dispatch) => {
    return async ({email, password}) => {
        try {
            const response = await trackerApi.post('/signup', {email, password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'signup_signin', payload: response.data.token});

            navigate('TrackList');
        }
        catch (err) {
            dispatch({type: 'add_error', payload: 'Something went wrong!'})
        }
    };
};

const signin = (dispatch) => {
    return async ({email, password}) => {
        try{
            const response = await trackerApi.post('/signin', {email, password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'signup_signin', payload: response.data.token});

            navigate('TrackList');
        }
        catch(err){
            dispatch({
                type: 'add_error',
                payload: 'Something went wrong!'
            })
        }
    };
};

const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({type: 'signout'});

        navigate('loginFlow');
    };
};

export const {Provider, Context} = createDataContext(
    authReducer,
    {
        signin,
        signout,
        signup,
        clearErrorMessage,
        tryLocalSignin,
    },
    {token: null, errorMessage: ''}
);