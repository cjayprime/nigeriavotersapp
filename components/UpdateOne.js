import React, { Component } from 'react';
import {StyleProvider, Container, Header, Content, Left, Body, Title, Right, CardItem } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux'
import { Dimensions, Image, StyleSheet, TouchableOpacity, Text, View, ScrollView , BackHandler, ToastAndroid, AsyncStorage, ActivityIndicator, Alert, StatusBar} from 'react-native'
import Button from 'react-native-button'
import axios from 'axios'
import 'url-search-params-polyfill';


export default class Aspirant extends Component {
    constructor() {
        super()

    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

    }
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
      }
       onBackPress = () => {
        Actions.pop();
        return true;
      }

  render() {
    const update = this.props.data
    console.log(this.props.data)
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
                    <Text style={styles.aspirantText}>{update.title}</Text>
                </View>
                <ScrollView>
                    <Content style={styles.content} key = {update.id}>
                        <TouchableOpacity
                            style = {styles.touchable}
                            activeOpacity = {0.6}
                            >
                            <CardItem cardBody >
                                <Image
                                    resizeMode = "cover"
                                    style = {{ flex: 1, width: null, height: (( Dimensions.get('window').height) * 0.36) }}
                                    source={{uri: update.image}}
                                />
                            </CardItem>
                        </TouchableOpacity>
                        <View style={styles.about}>
                            <Text style={{alignSelf: 'center', fontSize: 20}}>DETAILS</Text>
                            <Text style={styles.aboutText}>{update.details}</Text>
                        </View>
                    </Content>
                </ScrollView>
            </Container>
        </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
    open: {
        width:  (( Dimensions.get('window').height) * 0.025),
        height:  (( Dimensions.get('window').height) * 0.025),
        marginTop: '9%',
        marginLeft: '4%'

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
    topic: {
        color: '#008841',
        fontSize: (( Dimensions.get('window').height) * 0.025),
        marginTop: '5%',
        alignSelf: 'center' 
    },
    title: {
        fontSize: (( Dimensions.get('window').height) * 0.022), 
        position: 'absolute',
        color: '#005900',
        top: '-18%',
        left: '10%'

    },
    manifestoText: {
        textAlign: 'center',
    },
    manifesto: {
        width: '95%',
        alignSelf: 'center',
        marginBottom: '10%'
    },
    aboutText: {
        textAlign: 'center',
    },
    about: {
        width: '95%',
        alignSelf: 'center',
        marginBottom: '10%'
    },
    touchable: {
        backgroundColor: '#f2f2f2'
    },
    content: {
        width: '95%',
        alignSelf: 'center',

    },
      img: {
          marginTop: '6%',
          width: 80,
          height: 80,
          resizeMode: 'cover',
          alignSelf: 'center'
      },
      info: {
        alignSelf: 'center', marginTop: '5%',
        color: '#000'
      },
      banner: {
        opacity: 0,
        position: 'absolute',
        bottom: -200
    },
    welcome: {
        color: '#000',
        textAlign: 'center',
        fontSize: (( Dimensions.get('window').height) * 0.02),
        marginBottom: '4%'

    }
      
})