import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, BackHandler, StatusBar, AsyncStorage, ToastAndroid } from 'react-native'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import 'url-search-params-polyfill';

export default class Support extends Component {
    state = {
        message: '',
        id: '',
        disabled: false
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.getData()
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress () {
        if (Actions.state.index === 0) {
            return false;
    }

        Actions.pop();
        return true;
    }
    getData = async () => {
        try {
            let userId = await AsyncStorage.getItem('userId')
            let parsed = JSON.parse(userId)
            if(userId !== null) {
                this.setState({
                    id: parsed
                })
            }
            else {
                id: ''
            }
            
        }
        catch(error) {
            alert("Error Fetching User Details")
        }   

    }

    handleSend = () => {
        var params = new URLSearchParams();
        params.append('user_id', this.state.id);
        params.append('message', this.state.message);
        this.setState({disabled: true})
        axios.post(`http://nva.atikuvotersapp.org/support`, params)
        .then(response => {
            if(response.data.status === true) {
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                this.onBackPress()
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
    render() {
        return (
            <View style={styles.container}>
                <StatusBar 
                    backgroundColor="#005900"
                    barStyle="light-content"
                />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>24/7 Support</Text>
                    <Text style={styles.subtext}>Write us on complaints, contributions, comments, technical issues, etc</Text>
                </View>
                <TextInput
                    multiline = {true}
                    numberOfLines = {8}
                    onChangeText={(message) => this.setState({message})}
                    underlineColorAndroid={'transparent'}
                    style= { styles.input }
                    placeholderTextColor={'#ccc'}
                    placeholder = { 'Enter Text'}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        style={{ fontSize: 20, color: '#FFF'}}
                        styleDisabled={{ color: 'white' }}
                        disabled={this.state.disabled}
                        containerStyle={{width: '100%', padding: 10, height: 45, overflow: 'hidden', backgroundColor: '#008841',marginBottom: 20  }}
                        disabledContainerStyle={{ backgroundColor: 'pink' }}
                        onPress={() => this.handleSend()}
                    >
                        SEND
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
    textContainer: {
        width: '90%',
        alignSelf: 'center'
    },
    text: {
        color: '#005900',
        alignSelf: 'center',
        fontSize: 18,
        marginTop: '10%',
        marginBottom: '3%'
    },
    subtext: {
        marginBottom: '10%',
        fontSize: 16,
        textAlign: 'center'
    },
    input: {
        color: '#000',
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 4,
        width: '90%',
        alignSelf: 'center',
        textAlignVertical: 'top',
    },
    buttonContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: '7%'
    }
})