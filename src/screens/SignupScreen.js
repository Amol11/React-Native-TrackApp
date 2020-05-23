import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import {NavigationEvents, SafeAreaView} from 'react-navigation';
import NavLink from '../components/NavLink';

const SignupScreen = () => {

    const {state, signup, clearErrorMessage} = useContext(AuthContext);

    return (
        <SafeAreaView forceInset={{top: 'always'}}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />
            <AuthForm
                headerText="Sign Up for Tracker"
                errorMessage={state.errorMessage}
                buttonText="Sign Up"
                onSubmit={signup}
            />
            <NavLink
                routeName="Signin"
                text="Already have an account? Sign in instead!"
            />
        </SafeAreaView>
    );
};

SignupScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 25,
        // borderColor: 'red',
        // borderWidth: 5
    }
});

export default SignupScreen;