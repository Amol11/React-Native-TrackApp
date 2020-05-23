import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import AuthForm from '../components/AuthForm';
import {NavigationEvents, SafeAreaView} from 'react-navigation';
import NavLink from '../components/NavLink';
import {Context as AuthContext} from '../context/AuthContext';

const SigninScreen = () => {

    const {state, signin, clearErrorMessage} = useContext(AuthContext);

    return (
        <SafeAreaView forceInset={{top: 'always'}}>
            <NavigationEvents
                onWillFocus={clearErrorMessage}
            />
            <AuthForm
                headerText="Sign In to Your Account"
                errorMessage={state.errorMessage}
                buttonText="Sign In"
                onSubmit={signin}
            />
            <NavLink
                routeName="Signup"
                text="Don't have an account? Sign up instead!"
            />
        </SafeAreaView>
    );
};

SigninScreen.navigationOptions = () => {
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

export default SigninScreen;