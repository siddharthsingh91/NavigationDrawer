import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import HomeScreen from './navigation/screens/HomeScreen';
import ContactUs from './navigation/screens/ContactUs';
import Services from './navigation/screens/Services';
import Certifications from './navigation/screens/Certifications';
import WhatWeDo from './navigation/screens/WhatWeDo';
import Blog from './navigation/screens/Blog';
import Post from './navigation/screens/Post';

const client = new ApolloClient({
  uri : 'https://dlh.sanditsolution.com/graphql'
})

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>  
      <Drawer.Navigator initialRouteName="HomeScreen">
        <Drawer.Screen name="HOME" component={HomeScreen} />
        <Drawer.Screen name="CONTACT US" component={ContactUs} />
        <Drawer.Screen name="SERVICES" component={Services} />
        <Drawer.Screen name="CERTIFICATIONS" component={Certifications} />
        <Drawer.Screen name="WHAT WE DO" component={WhatWeDo} />
        <Drawer.Screen name="BLOG" component={Blog} />
      </Drawer.Navigator>
      </ApolloProvider>
    </NavigationContainer>
  );
}

