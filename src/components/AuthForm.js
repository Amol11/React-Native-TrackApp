import React, {useState} from 'react';
import {Text, Button, Input} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import Spacer from './Spacer';

const AuthForm = ({headerText, errorMessage, onSubmit, buttonText}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Spacer>
                <Text h3 style={styles.textStyle}>
                    {headerText}
                </Text>
            </Spacer>
            <Input 
                label="Email" 
                vlaue={email} 
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Spacer/>
            <Input
                secureTextEntry 
                label="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
            />
            {errorMessage 
            ? <Text style={styles.errorMessage}>
                {errorMessage}
            </Text>
            : null}
            <Spacer>
                <Button 
                    title={buttonText}
                    onPress={() => onSubmit({email, password})}
                />
            </Spacer>
        </>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15
    },
    textStyle: {
        marginTop: 30,
        marginBottom: 70
    }
});

export default AuthForm;