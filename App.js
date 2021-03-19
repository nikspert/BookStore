import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Dialog, Portal, Paragraph, Provider as PaperProvider } from 'react-native-paper'

import RecomendedScreen from './src/screens/Recomended'
import HomeScreen from './src/screens/Home'
import DetailsScreen from './src/screens/BookDetails'
import SearchScreen from './src/screens/Search'
const Stack = createStackNavigator()
function App() {
  const [isConnected, setIsConnected] = useState(true)

  // CheckConnectivity = async () => {
  //   connectionInfo = await NetInfo.getConnectionInfo()
  //   if (connectionInfo.type === 'none') setIsConnected(false)
  //   else setIsConnected(true)
  // }
  // useEffect(() => {
  //   CheckConnectivity()
  // }, [])
  return (
    <NavigationContainer>
      <PaperProvider>
        {isConnected ? (
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
          </Stack.Navigator>
        ) : (
          <Portal>
            <Dialog visible={true}>
              <Dialog.Content>
                <Paragraph>You are not connected to the web</Paragraph>
              </Dialog.Content>
            </Dialog>
          </Portal>
        )}
      </PaperProvider>
    </NavigationContainer>
  )
}

export default App
