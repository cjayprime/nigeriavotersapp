import React, { Component } from 'react'
import {StatusBar, View, BackHandler, TouchableOpacity, ScrollView, StyleSheet, Image, ActivityIndicator, Dimensions, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { StyleProvider, Header, Container, Content, Left, Body, Title, CardItem } from 'native-base'
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import axios from 'axios'

export default class Update extends Component {
    state = {
        isLoading: true,
        updates: []
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.fetchUpdates()
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

    fetchUpdates = () => {
        axios.get('http://nva.atikuvotersapp.org/fetchAllElectionUpdate')
        .then(res => this.setState({
            isLoading: false,
            updates: res.data.message
        }))
    }
    renderContent = () => {
        return (
            this.state.updates.map((update) => {
                return (
                    <Content style={styles.content} key = {update.id}>
                        <TouchableOpacity
                        style = {styles.touchable}
                        activeOpacity = {0.6}
                        onPress={() => Actions.updateOne({data: update})}

                        >
                        <CardItem cardBody >
                            <Image
                            resizeMode = "cover"
                            style = {{ flex: 1, width: null, height: (( Dimensions.get('window').height) * 0.36) }}
                            source={{uri: update.image}}
                            />
                        </CardItem>
                            <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#f2f2f2'}}>
                                <Text style={{height: (( Dimensions.get('window').height) * 0.065), color: '#222', paddingLeft: 10, paddingTop: 10,  fontSize: 18}}>{update.title}</Text>
                            </View>  
                        </TouchableOpacity>
                    </Content>
                )
            })
        )
    }

    render() {
        if(this.state.isLoading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
                        <Text style={styles.aspirantText}>ELECTION UPDATES</Text>
                    </View>
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
    content: {
        width: '90%',
        alignSelf: 'center'
    }
})