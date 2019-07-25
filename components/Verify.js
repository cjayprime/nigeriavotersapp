import React, { Component } from 'react'
import { View, Text, StatusBar, StyleSheet } from 'react-native'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

export default class Verify extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#f2f2f2"
                    barStyle="dark-content"
                />
                <View style={styles.verifyContainer}>
                    <Text style={styles.verifyText}>A verification link has been sent to your email, Click on the link and then proceed to login</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        style={{ fontSize: 20, color: '#FFF'}}
                        styleDisabled={{ color: 'white' }}
                        disabled={false}
                        containerStyle={{width: '100%', padding: 10, height: 45, overflow: 'hidden', backgroundColor: '#008841',marginBottom: 20  }}
                        disabledContainerStyle={{ backgroundColor: 'pink' }}
                        onPress={() => Actions.login()}
                    >
                        PROCEED TO LOGIN
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    verifyContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: '20%'
    },
    verifyText: {
        color: '#005900',
        alignSelf: 'center',
        fontSize: 18,
        textAlign: 'center'
    },
    buttonContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: '20%'
    },
})