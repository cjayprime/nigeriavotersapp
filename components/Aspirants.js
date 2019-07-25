import React, { Component } from 'react'
import { View, Text, Picker, StyleSheet, TouchableOpacity, StatusBar, Image, Dimensions, BackHandler, ToastAndroid, AsyncStorage, ScrollView, Alert } from 'react-native'
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import data  from './StateData'
import { Actions } from 'react-native-router-flux'
import { StyleProvider, Container, Header, Left, Body, Title, Content, CardItem } from 'native-base'
import Button from 'react-native-button'
import 'url-search-params-polyfill';
import axios from 'axios'
import Toast from '../native-base-theme/components/Toast';


export default class Aspirants extends Component {
    state = {
        category: '',
        state: '',
        party: '',
        disabled: false,
        aspirants: [],
        userId: '',
        noData: '',
        parties: []

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.getState()
        this.getUser()
        this.getParty()

    }
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
      }
       onBackPress = () => {
        if (Actions.state.index === 0) {
          return false;
        }

        Actions.pop();
        return true;
      }

      getState = async () => {
        try {
            let stateId = await AsyncStorage.getItem('state')
            let parsed = JSON.parse(stateId)
            if(stateId !== null) {
                this.setState({
                    state: parsed
                })
            }
            else {
                state: ''
            }
            
        }
        catch(error) {
            alert("Error fetching data")
        }   

    }
    getUser = async () => {
        try {
            let userId = await AsyncStorage.getItem('userId')
            let parsed = JSON.parse(userId)
            if(userId !== null) {
                this.setState({
                    userId: parsed
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
    getParty = () => {
        axios.get('http://nva.atikuvotersapp.org/getallparty')
        .then(res => this.setState({
            parties: res.data.message
        }))
    }

    viewAspirants = () => {
        var params = new URLSearchParams();
        params.append('categoryid', this.state.category );
        params.append('stateid', this.state.state);
        params.append('partyid', this.state.party);
        this.setState({disabled: true})
        axios.post(`http://nva.atikuvotersapp.org/fetchallaspirant`, params)
        .then(res => {
            if(res.data.message == "categoryid is required") {
                this.setState({
                    disabled: false
                })
                ToastAndroid.show("Please select a category", ToastAndroid.SHORT)
            }
            else if(typeof res.data.message == "object" && res.data.message.length < 1) {
                this.setState({
                    disabled: false,
                    aspirants: res.data.message
                })
                ToastAndroid.show('There are no matching aspirants', ToastAndroid.SHORT)
            }
            else {
                this.setState({
                    disabled: false,
                    aspirants: res.data.message
                })
            }
        })
    }
    vote = (aspirant, aspirant_id) => {
        Alert.alert(
          'Vote',
          `Are you sure you want to vote for ${aspirant}?`,
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => this.voteHandler(aspirant_id)},
          ],
          { cancelable: false }
        )
      }

    voteHandler = (id) => {
        var params = new URLSearchParams();
        params.append('user_id', this.state.userId );
        params.append('aspirant_id', id);
        axios.post(`http://nva.atikuvotersapp.org/vote`, params)
        .then(res => {
            if(res.data.status === true) {
                ToastAndroid.show("You have successfully voted for this aspirant", ToastAndroid.SHORT)
                this.onBackPress()
                
            }
            else {
                ToastAndroid.show(res.data.message, ToastAndroid.SHORT)
            }
        })
    }

    renderContent = () => {
        const partyPicker = this.state.parties.map(party => {
            return (
                <Picker.Item label={party.partyname} value={party.id} key={party.id} />
                
            )
        })
        if(this.state.aspirants.length < 1) {
           return (
            <View style={styles.container}>
                <View style={styles.aspirantContainer}>
                    <Text style={styles.aspirantText}>Aspirants</Text>
                </View>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={this.state.category}
                        onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}
                        mode='dropdown'>
                        <Picker.Item  label="Choose Category" />
                        <Picker.Item label="Presidential" value="1" />
                        <Picker.Item label="Governorship" value="2" />
                    </Picker>
                </View>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={this.state.party}
                        onValueChange={(itemValue, itemIndex) => this.setState({party: itemValue})}
                        mode='dropdown'>
                        <Picker.Item  label="Choose Party"/>
                        {partyPicker}
                    </Picker>
                        
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        style={{ fontSize: 20, color: '#FFF'}}
                        styleDisabled={{ color: 'white' }}
                        disabled={this.state.disabled}
                        containerStyle={{width: '100%', padding: 10, height: 45, overflow: 'hidden', backgroundColor: '#008841',marginBottom: 20  }}
                        disabledContainerStyle={{ backgroundColor: '#999' }}
                        onPress={() => this.viewAspirants()}
                    >
                        VIEW ASPIRANTS
                    </Button>
                </View>
            </View>
           ) 
        }
        else {
            return (
                this.state.aspirants.map((aspirant) => {
                    return (
                        <Content style={styles.content} key = {aspirant.id}>
                            <TouchableOpacity
                            style = {styles.touchable}
                            activeOpacity = {0.6}
                            >
                            <CardItem cardBody >
                                <Image
                                resizeMode = "cover"
                                style = {{ flex: 1, width: null, height: (( Dimensions.get('window').height) * 0.36) }}
                                source={{uri: aspirant.image}}
                                />
                            </CardItem>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Text style={{height: (( Dimensions.get('window').height) * 0.065), color: '#222', paddingLeft: 10, paddingTop: 10,  fontSize: (( Dimensions.get('window').height) * 0.024)}}>{aspirant.fullname}</Text>
                                    <Text style={{paddingLeft: 10, fontSize: (( Dimensions.get('window').height) * 0.024), marginLeft: '10%', paddingTop: 12}}>{aspirant.partyid}</Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        style={{ fontSize: 20, color: '#FFF'}}
                                        styleDisabled={{ color: 'white' }}
                                        disabled={this.state.disabled}
                                        containerStyle={{width: '100%', padding: 10, height: 45, overflow: 'hidden', backgroundColor: '#008841',marginBottom: 20  }}
                                        disabledContainerStyle={{ backgroundColor: '#999' }}
                                        onPress={() => Actions.aspirant({data: aspirant})}
                                    >
                                        VIEW MANIFESTO
                                    </Button>
                                    <Button
                                        style={{ fontSize: 20, color: '#FFF'}}
                                        styleDisabled={{ color: 'white' }}
                                        disabled={this.state.disabled}
                                        containerStyle={{width: '100%', padding: 10, height: 45, overflow: 'hidden', backgroundColor: '#008841',marginBottom: 20  }}
                                        disabledContainerStyle={{ backgroundColor: '#999' }}
                                        onPress={() => this.vote(aspirant.fullname, aspirant.id)}
                                    >
                                        VOTE
                                    </Button>
                                </View>  
                            </TouchableOpacity>
                        </Content>
                    )
                })
            )
        }
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <StatusBar 
                        backgroundColor="#005900"
                        barStyle="light-content"
                    />
                    <Header style={{ backgroundColor: '#f2f2f2'}}>
                        <Left>
                            <TouchableOpacity onPress={() => Actions.drawerOpen()} style={styles.touchable} activeOpacity = {0.8}>
                                <Image source={require('./assets/icon-23.png')} style={styles.open}/>
                            </TouchableOpacity>
                        </Left>
                        <Body>
                            <Title style={styles.title}></Title> 
                        </Body>
                    </Header>
                        <ScrollView>
                            {this.renderContent()}
                        </ScrollView>
                </Container>
            </StyleProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    open: {
        width:  (( Dimensions.get('window').height) * 0.025),
        height:  (( Dimensions.get('window').height) * 0.025),
        marginTop: '9%',
        marginLeft: '4%'

    },
    title: {
        fontSize: (( Dimensions.get('window').height) * 0.022), 
        position: 'absolute',
        color: '#005900',
        top: '-18%',

    },
    touchable: {
        backgroundColor: '#f2f2f2'
    },
    content: {
        width: '80%',
        alignSelf: 'center',
        marginVertical: '3%'

    },
    aspirantContainer: {
        backgroundColor: '#f2f2f2',
        marginBottom: '5%'
    },
    aspirantText: {
        fontSize: 18,
        alignSelf: 'center',
        marginVertical: '5%',
        color: '#005900'
    },
    aspirantBucket: {
        flex: 1,
        backgroundColor: 'blue',
        width: '60%',
        alignSelf: 'center'
    },
    aspirantImage: {
        height: 200
    },
    picker: {
        width: '90%',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#008841',
        marginBottom: '5%'
    },
    buttonContainer: {
        width: '90%',
        alignSelf: 'center'
    },
})
