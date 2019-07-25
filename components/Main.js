import React, { Component } from 'react'
import { Image, StyleSheet, View, StatusBar, Text, BackHandler} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button';


export default class Main extends Component {

    componentDidMount () {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress () {
        BackHandler.exitApp()
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar 
                    backgroundColor="#F2F2F2"
                    barStyle="dark-content"
                />
                <View style={styles.logoContainer}>
                    <Image source={require('./assets/icon-33.png')} style={styles.logo}/>
                    <Text style={{color: '#008841', alignSelf: 'center'}}>2019</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        style={{ fontSize: 16, color: '#008841'}}
                        styleDisabled={{ color: 'white' }}
                        disabled={false}
                        containerStyle={{width: '20%', padding: 10, height: 45, overflow: 'hidden', backgroundColor: 'rgba(0,0,0,0)', borderWidth: 2, borderColor: '#008841', marginHorizontal: '2%' }}
                        disabledContainerStyle={{ backgroundColor: 'pink' }}
                        onPress={() => Actions.signup()}
                    >
                        SIGN UP
                    </Button>
                    <Button
                        style={{ fontSize: 16, color: '#FFF'}}
                        styleDisabled={{ color: 'white' }}
                        disabled={false}
                        containerStyle={{width: '20%', padding: 10, height: 45, overflow: 'hidden', backgroundColor: '#008841',  marginHorizontal: '2%' }}
                        disabledContainerStyle={{ backgroundColor: 'pink' }}
                        onPress={() => Actions.login()}
                    >
                        LOG IN
                    </Button>
                </View>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    logoContainer: {
        alignSelf: 'center',
        marginTop: '50%'
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        marginTop: '20%',
    }
})