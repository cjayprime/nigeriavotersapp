import React, { Component } from 'react';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import { StyleProvider, Container,View, Header, DeckSwiper, Card, CardItem, Text, Left, Body,Title, Content, Icon } from 'native-base';
import { StyleSheet, Dimensions, TouchableOpacity, Image, BackHandler, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Swiper from 'react-native-swiper';

const data = [
    {
        content: "Upon arrival at the polling unit, join the queue.",
        img: <Image style={{width: '100%', height: 200}} source = {require('./assets/inec.png')} />,
        step : "STEP 1",
        number: " 1/10 >"
    },
    {
        content: "The Polling Official will request for your Permanent Voter’s Card (PVC) and check if the photograph on the PVC matches your face. Then he/she will check if your name is on the register for that polling unit.  He/she will also use the card reader to confirm the status of the PVC. After this, he/she will check your fingers to ascertain that you have not voted before.",
        img: <Image  style={{width: '100%', height: 200}} source = {require('./assets/inec.png')} />,
        step : "STEP 2",
        number: "< 2/10 >"
    },
    {
        content: "Satisfied that you have been duly verified, the INEC Official will tick against your details in the register.",
        img: <Image  style={{width: '100%', height: 200}} source = {require('./assets/inec.png')} />,
        step : "STEP 3",
        number: "< 3/10 > "
    },
    {
        content: "After verifying your PVC, the INEC official will return it to you. Indelible ink will be applied on the cuticle of your finger as a further proof that you have voted.",
        img: <Image  style={{width: '100%', height: 200}} source = {require('./assets/inec.png')} />,
        step : "STEP 4",
        number: "< 4/10 > "
    },
    {
        content: "The INEC Official will stamp the back of the ballot paper and endorse his/her signature on it.",
        img: <Image  style={{width: '100%', height: 200}} source = {require('./assets/inec.png')} />,
        step : "STEP 5",
        number: "< 5/10 > "
    },
    {
        content: "The INEC Official will then fold the ballot paper vertically with the printed side inwards before giving it to you.",
        img: <Image  style={{width: '100%', height: 200}} source = {require('./assets/inec.png')} />,
        step : "STEP 6",
        number: "< 6/10 > "
    },
    {
        content: "At the polling booth, you will then stain your appropriate finger for the election with indelible ink.",
        img: <Image  style={{width: '100%', height: 200}} source = {require('./assets/inec.png')} />,
        step : "STEP 7",
        number: "< 7/10 > "
    },
    {
        content: " You will use your stained thumb to mark the section provided on the ballot paper for your preferred candidate/party.",
        img: <Image  style={{width: '100%', height: 200}} source = {require('./assets/inec.png')} />,
        step : "STEP 8",
        number: "< 8/10 "
    },
    {
        content: "You will fold the marked ballot paper vertically with the printed side inwards before dropping it in the ballot box.",
        img: <Image  style={{width: '100%', height: 200}} source = {require('./assets/inec.png')} />,
        step : "STEP 9",
        number: "< 9/10 > "
    },
    {
        content: " You will then leave the polling station.",
        img: <Image  style={{width: '100%', height: 200}} source = {require('./assets/inec.png')} />,
        step : "STEP 10",
        number: "< 10/10 "
    },


]
export default class Guide extends Component {
    componentDidMount()  {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
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

        renderContent = () => {
            return ( 
                data.map((item) => {
                    return (
                        <View style={styles.deck}> 
                            <Text style = {[styles.topic, styles.step]}> {item.step} </Text>
                                {item.img}
                            <ScrollView>
                                <Text style={styles.cont}>{item.content} </Text>
                            </ScrollView>

                        </View>
                    )
                })
            )
        }
   
  render() {
    
    return (
        <StyleProvider style={getTheme(material)}>
            <Container style={styles.container}>
                <Header style={{ backgroundColor: 'rgba(0,0,0,0)'}}>
                    <Left>
                        <TouchableOpacity onPress={() => Actions.pop()} activeOpacity = {0.8}>
                        <Image source={require('./assets/icons-03.png')} style={styles.open}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={styles.body}>
                        <Title style={{marginLeft: '5%',fontSize: (( Dimensions.get('window').height) * 0.024)}}>VOTERS GUIDE</Title>
                    </Body>  
                </Header>
                    <Swiper
                        activeDotColor="#fff"
                        style={styles.wrapper}>
                        {this.renderContent()}
                    </Swiper>
        </Container>
        </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#008841'
    },
    card: {
        backgroundColor: '#008841',
        height: Dimensions.get('window').height
    },
    carditem: {
        backgroundColor: '#008841',
    },
    text: {
        color: '#FFF'
    },
    name: {
        color: '#FFF'
    },
    open: {
        width:  (( Dimensions.get('window').height) * 0.025),
        height:  (( Dimensions.get('window').height) * 0.025),
        marginTop: '9%',
        marginLeft: '4%'
    
    },
    body: {
        marginTop: '10%',
        marginBottom: '5%'
    },
    deck: {
        backgroundColor: '#008841',
        height: Dimensions.get(`window`).height
    },
    img: {
        width: '100%'
    },
    topic: {
        alignSelf: 'center',
        color: '#fff',
        marginBottom: '6%',
        marginTop: '6%',
        textAlign: 'center',
        width: '80%',
    },
    cont: {
        color: '#fff',
        textAlign: 'center',
        width: '80%',
        alignSelf: 'center',
        marginBottom: '25%',
        marginTop: '10%'
    },
    body: {
        backgroundColor: 'rgba(0,0,0,0)'
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    }
    
    
})