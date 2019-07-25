import React, { Component } from 'react'
import { 
    Image, 
    Keyboard, 
    KeyboardAvoidingView, 
    Picker, 
    ScrollView, 
    StyleSheet,
    View, 
    StatusBar, 
    TextInput, 
    ToastAndroid, 
    Text, 
    BackHandler,
    AsyncStorage 
} from 'react-native'

import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import data  from './StateData'
import axios from 'axios'
import 'url-search-params-polyfill';

export default class Login extends Component {
    state = {
        fullname: '',
        gender: '',
        state: '',
        mobile: '',
        email: '',
        dob: '',
        id: '',
        message: '',
        password: '',
        password2: '',
        disabled: false,
        data: []

     }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        axios.get('http://nva.atikuvotersapp.org/getallstates')
        .then((res) => this.setState({
            data: res.data.message
        }))
        }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
      }
    onBackPress () {
        Actions.pop();
        return true;
      }

    saveData = () => {
        AsyncStorage.setItem('state', JSON.stringify(this.state.state))
    }  

    signup = () => {
        var params = new URLSearchParams();
        params.append('fullname', this.state.fullname);
        params.append('gender', this.state.gender);
        params.append('email', this.state.email);
        params.append('state', this.state.state);
        params.append('mobile', this.state.mobile);
        params.append('dob', this.state.dob);
        params.append('password', this.state.password);
        this.setState({disabled: true})
        if(this.state.password == this.state.password2){
            axios.post(`http://nva.atikuvotersapp.org/adduser`, params)
            .then(response => {
                if(response.data.status === true) {
                    this.setState({
                        id: response.data.details
                    })
                    this.saveData()
                    Actions.verify()
                    console.log(response)
                }
                else {
                    this.setState({
                        message: response.data.message,
                        disabled: false
                    })
                    ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                    console.log({else:response})

                }             
            })
            .catch(err => console.log(err)) 
        }
        else {
            ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT)
            this.setState({
                disabled: false
            })
        }
      }

    render() {
        const items = this.state.data.map((item, i) => {
            return (
                <Picker.Item label={item.statename} value={item.id} key={item.id} />
            )
        })
        return (
            <KeyboardAvoidingView>
                <ScrollView>
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
                                placeholder="Name"
                                onChangeText={(name) => this.setState({fullname: name})}
                                onSubmitEditing={Keyboard.dismiss}
                            />
                            <TextInput
                                keyboardType = 'email-address'
                                onChangeText={(email) => this.setState({email})}
                                onSubmitEditing={Keyboard.dismiss}
                                placeholder="Email"
                            />
                            <TextInput
                                keyboardType = 'numeric'
                                placeholder="Phone Number"
                                onChangeText={(mobile) => this.setState({mobile})}
                                onSubmitEditing={Keyboard.dismiss}
                            />
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={this.state.gender}
                                    onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}
                                    mode='dialog'>
                                    <Picker.Item  label="Gender" />
                                    <Picker.Item label="Male" value="Male" />
                                    <Picker.Item label="Female" value="Female" />
                                </Picker>
                            </View>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={this.state.state}
                                    onValueChange={(itemValue, itemIndex) => this.setState({state: itemValue})}
                                    mode='dialog'>
                                    <Picker.Item label="State of Residence" />
                                    {items}
                                </Picker>
                            </View>
                            <View style={styles.picker}>
                                <DatePicker
                                    style={styles.dob}
                                    date={this.state.dob}
                                    mode="date"
                                    placeholder="Date of Birth"
                                    format="YYYY-MM-DD"
                                    minDate="1950-05-01"
                                    maxDate="2000-01-01"
                                    androidMode="spinner"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={false}
                                    customStyles={{
                                        placeholderText: {
                                            color: '#888',
                                            fontSize: 12,
                                            alignSelf:'flex-start',
                                            paddingLeft:5
                                        },
                                    dateInput: {
                                        // marginLeft: 36,
                                        borderWidth: null,
                                        borderBottomWidth: 1,
                                        borderColor: '#fff'
                                    },
                                    dateText:{
                                        justifyContent: 'flex-start'
                                    }
                                    // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => {this.setState({dob: date})}}
                                    />
                            </View>
                            <TextInput
                                secureTextEntry={true}
                                onChangeText={(password) => this.setState({password})}
                                placeholder="Password"
                                onSubmitEditing={Keyboard.dismiss}
                            />
                            <TextInput
                                secureTextEntry={true}
                                onChangeText={(password2) => this.setState({password2})}
                                placeholder="Confirm Password"
                                onSubmitEditing={Keyboard.dismiss}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                style={{ fontSize: 20, color: '#FFF'}}
                                styleDisabled={{ color: 'white' }}
                                disabled={this.state.disabled}
                                containerStyle={{width: '100%', padding: 10, height: 45, overflow: 'hidden', backgroundColor: '#008841',marginBottom: 20  }}
                                disabledContainerStyle={{ backgroundColor: '#999' }}
                                onPress={()=> this.signup()}
                            >
                                SIGN UP
                            </Button>
                        </View>
                        <View style={styles.oldUserContainer}>
                            <Text style={styles.oldUserText}>Already a user? Log in</Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    logoContainer: {
        alignSelf: 'center',
        marginTop: '7%'
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
    oldUserContainer: {
        width: '90%',
        alignSelf: 'center'
    },
    oldUserText: {
        color: '#005900'
    },
    picker: {
        borderBottomWidth: 1,
    },
    yearText: {
        alignSelf: 'center',
        color: '#008841'
    }
})
