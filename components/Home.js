import React, { Component } from 'react';
import {StyleProvider, Container, Header, Content, Left, Body, Title, Right } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import { Dimensions, Image, StyleSheet, TouchableOpacity, Text, View, ScrollView , BackHandler, ToastAndroid, AsyncStorage, ActivityIndicator, Alert, StatusBar} from 'react-native'


export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            fullname: '',
            email: ''
        }
    }
    componentDidMount () {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.getData().then(() => {
            axios.get(`http://nva.atikuvotersapp.org/users/${this.state.id}`)
            .then(res => {
                this.setState({
                    fullname: res.data.message[0].fullname,
                    email: res.data.message[0].email 
                })
            })
        })
      }

    componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress () {
    BackHandler.exitApp()
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

    showToast = () => {
        ToastAndroid.show("Nearest polling stations are not available at the moment", ToastAndroid.SHORT)
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
                        <Title style={styles.title}>Welcome, {this.state.fullname.toLocaleUpperCase()}</Title> 
                    </Body>
                </Header>
                <View style={styles.logoContainer}>
                    <Image source={require('./assets/icon-33.png')} style={styles.logo}/>
                    <Text style={{color: '#008841', alignSelf: 'center'}}>2019</Text>
                </View>
                <Content style={styles.container}>
                    <Grid style={styles.grid}>
                        <TouchableOpacity onPress={()=> Actions.guide()} style= {{backgroundColor: '#ddd', height: 160, width: '42%'}} >
                            <Image style={styles.img}source = {require('./assets/icon-29.png')} />
                            <Text style = {styles.info} > Voters Guide </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> Actions.aspirants({data: this.state})} style= {{backgroundColor: '#eee', height: 160, width: '42%'}} >
                            <Image style={styles.img}source = {require('./assets/icon-31.png')} />
                            <Text style = {styles.info} > Aspirants</Text>
                        </TouchableOpacity> 
                    </Grid>
                    <Grid style={styles.grid}>
                        <TouchableOpacity onPress={()=> Actions.poll({data: this.state})}  style= {{backgroundColor: '#eee', height: 160, width: '42%'}} >
                            <Image style={styles.img}source = {require('./assets/icon-36.png')}/>
                            <Text style = {styles.info} > Poll Result</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> Actions.update()} style= {{backgroundColor: '#ddd', height: 160, width: '42%'}} >
                            <Image style={styles.img}source = {require('./assets/icon-32.png')} />
                            <Text style = {styles.info} > Election Updates </Text>
                        </TouchableOpacity> 
                    </Grid>
                    <Grid style={styles.grid}>
                        <TouchableOpacity onPress={()=> this.showToast()} style= {{backgroundColor: '#ddd', height: 160, width: '42%'}} >
                            <Image style={styles.img}source = {require('./assets/icon-04.png')} />
                            <Text style = {styles.info} >Nearest Polling Centre </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> Actions.support({data: this.state})} style= {{backgroundColor: '#eee', height: 160, width: '42%'}} >
                            <Image style={styles.img}source = {require('./assets/icon-35.png')} />
                            <Text style = {styles.info} > 24/7 Support </Text>
                        </TouchableOpacity> 
                    </Grid>  
                </Content>
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
    container: {
        marginTop:'10%'
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
        textAlign: 'center'
    },
   
    dp: {
        height: 100,
        borderRadius: 50,
        width: 100,
        alignSelf: 'center',
    },
    logoContainer: {
        alignSelf: 'center',
        marginTop: '10%'
    },
      col: {
          width: '50%',
          alignSelf: 'center',
          height: '10%',
          position: 'relative'
      },
      grid: {
          alignSelf: 'center'
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