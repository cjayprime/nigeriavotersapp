import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, Dimensions, Image, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import { Container, Content, List, ListItem } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008841',
    borderWidth: 2,
    borderColor: '#008841',
    paddingTop: '4%'
  },
  link: {
    color: '#fff',
    fontSize: (( Dimensions.get('window').height) * 0.02),
  },
  close: {
    width:  (( Dimensions.get('window').height) * 0.018),
    height:  (( Dimensions.get('window').height) * 0.018),
    marginLeft: '92%',
    marginTop: (( Dimensions.get('window').height) * 0.03) 
  },
  logo: {
    width:  (( Dimensions.get('window').height) * 0.1),
    height:  (( Dimensions.get('window').height) * 0.1),
    alignSelf: 'center',
    marginVertical: '10%'
  },
  version: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: '5%'
  },
  space: {
    marginVertical: '5%'
  }
});

class DrawerContent extends React.Component {

  logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.logoutHandler()},
      ],
      { cancelable: false }
    )
  }

  logoutHandler = () => {
    AsyncStorage.removeItem('userId')
    Actions.main()
  }

  render() {
    return (
      <View style={styles.container}>
        <Container>
          <Content>
            <View style={styles.space}></View>
            <List>
              <ListItem onPress={() => Actions.support()}>
                <Text style={styles.link}>Need help?</Text>
              </ListItem>
              <ListItem onPress={() => this.logout()}>
                <Text style={styles.link}>Log out</Text>
              </ListItem>
            </List>
          </Content>
        </Container>
      </View >
    );
  }
}

export default DrawerContent;