import React, { Component } from 'react'
import { View, Text, BackHandler, AsyncStorage, ActivityIndicator, StyleSheet, TouchableOpacity, Image, StatusBar, Dimensions, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import { StyleProvider, Header, Container, Body, Left, Title } from 'native-base'
import axios from 'axios'

export default class Poll extends Component {
    state = {
        id: '',
        presidentialResults: [],
        isLoading: true
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.getData()
        this.getResults()
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
    
    getResults = () => {
        axios.get(`http://nva.atikuvotersapp.org/poll/1`)
        .then(res => {
            this.setState({
                presidentialResults: res.data.message[0],
                governorshipResults: res.data.message[1],
                isLoading: false
            })
        })

    }
    renderContent = () => {
        return ( 
            this.state.presidentialResults.map((item) => {
                return (
                    // <Text key={item.aspirant_id}>{item.aspirant_name}</Text>
                    <View style={{width: '90%', alignSelf: 'center', marginVertical: '3%', backgroundColor: '#f2f2f2'}} key={item.aspirant_id}>
                        <View style={styles.pollContainer}>
                            <Image 
                                resizeMode="cover"
                                source={{uri: item.aspirantimage}}
                                style={{width: 150, height: 150}}
                            />
                            <View>
                                <Text style={styles.text}>{item.aspirant_name}</Text>
                                <Text style={styles.subtext}>Political Party:</Text>
                                <Text style={styles.text}>{item.party_acronyms}</Text>
                                <Text style={styles.subtext}>Current total votes:</Text>
                                <Text style={styles.text}>{item.votes_count}</Text>
                            </View>
                        </View>
                    </View>
                )
            })
        )
    }
    renderContent2 = () => {
        return ( 
            this.state.governorshipResults.map((item) => {
                return (
                    <View style={{width: '90%', alignSelf: 'center', marginVertical: '3%', backgroundColor: '#f2f2f2'}} key={item.aspirant_id}>
                        <View style={styles.pollContainer}>
                            <Image 
                                resizeMode="cover"
                                source={{uri: item.aspirantimage}}
                                style={{width: 150, height: 150}}
                            />
                            <View>
                                <Text style={styles.text}>{item.aspirant_name}  |  {item.aspirant_state}</Text>
                                <Text style={styles.subtext}>Political Party:</Text>
                                <Text style={styles.text}>{item.party_acronyms}</Text>
                                <Text style={styles.subtext}>Current total votes:</Text>
                                <Text style={styles.text}>{item.votes_count}</Text>
                            </View>
                        </View>
                    </View>
                )
            })
        )
    }
    

    render() {
        if(this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#008841"/> 
                </View>
            )
        }
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
                    <View style={styles.aspirantContainer}>
                        <Text style={styles.aspirantText}>POLL RESULTS</Text>
                    </View>
                        <ScrollView>
                            <Text style={{alignSelf: 'center', fontSize: 18, color: '#008841', fontWeight: 'bold', paddingVertical: 10}}>Presidential Poll</Text>
                           {this.renderContent()}
                           <Text style={{alignSelf: 'center', fontSize: 18, color: '#008841', fontWeight: 'bold', paddingVertical: 10}}>Governorship Poll</Text>
                           {this.renderContent2()}
                        </ScrollView>
                </Container>
            </StyleProvider>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    text: {
        padding: 10,
        color: '#008841',
        fontSize: 16,
        fontWeight: 'bold'
    },
    subtext: {
        fontSize: 16,
        color: '#aaa',
        paddingLeft: 10
    },
    pollContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 150,
    },
    pollContainer2: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 200,
    },
    open: {
        width:  (( Dimensions.get('window').height) * 0.025),
        height:  (( Dimensions.get('window').height) * 0.025),
        marginTop: '9%',
        marginLeft: '4%'

    },
})