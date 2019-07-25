import React, { Component } from 'react'
import { Image, Keyboard, StyleSheet, View, StatusBar, TextInput, Text, AsyncStorage, BackHandler, ToastAndroid} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import axios from 'axios'
import 'url-search-params-polyfill';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        id: '',
        disabled: false
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
      }
    onBackPress () {
        Actions.pop();
        return true;
      }

    login = () => {
        var params = new URLSearchParams();
        params.append('email', this.state.email);
        params.append('password', this.state.password);
        this.setState({disabled: true})
        axios.post(`http://nva.atikuvotersapp.org/signin`, params)
        .then(response => {
            if(response.data.status === true) {
                this.setState({
                    id: response.data.details
                })
                this.saveData()
                Actions.home()
                console.log(response)
            }
            else {
                this.setState({
                    disabled: false
                })
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                console.log({else:response})

            }             
        })
        .catch(err => console.log(err)) 
      }

    saveData = () => {
        AsyncStorage.setItem('userId', JSON.stringify(this.state.id))
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
                    <Text style={styles.yearText} color="#005900">2019</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        keyboardType = 'email-address'
                        placeholder="Email"
                        onSubmitEditing={Keyboard.dismiss}
                        onChangeText={(email) => this.setState({email})}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Password"
                        onSubmitEditing={Keyboard.dismiss}
                        onChangeText={(password) => this.setState({password})}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        style={{ fontSize: 20, color: '#FFF'}}
                        styleDisabled={{ color: 'white' }}
                        disabled={this.state.disabled}
                        containerStyle={{width: '100%', padding: 10, height: 45, overflow: 'hidden', backgroundColor: '#008841',marginBottom: 20  }}
                        disabledContainerStyle={{ backgroundColor: '#999' }}
                        onPress={() => this.login()}
                    >
                        LOG IN
                    </Button>
                </View>
                <View style={styles.forgotpasswordContainer}>
                    <Text style={styles.forgotpasswordText}>Forgot Password?</Text>
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
        marginTop: '25%'
    },
    inputContainer: {
        marginVertical: '8%',
        width: '90%',
        alignSelf: 'center',
    },
    buttonContainer: {
        width: '90%',
        alignSelf: 'center'
    },
    forgotpasswordContainer: {
        width: '90%',
        alignSelf: 'center'
    },
    forgotpasswordText: {
        color: '#005900'
    },
    yearText: {
        alignSelf: 'center',
        color: '#008841'
    }
})
