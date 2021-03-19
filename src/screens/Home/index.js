import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RecomendedScreen from '../Recomended'
import InfoScreen from '../Info'
import SearchScreen from '../Search'
import SavedScreen from '../Saved'

const Tab = createBottomTabNavigator()
function HomeScreen({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'Search') {
            iconName = focused ? 'search-circle' : 'search-circle-outline'
          } else if (route.name === 'Info') {
            iconName = focused ? 'ios-information-circle-sharp' : 'ios-information-circle-outline'
          } else if (route.name === 'Saved') {
            iconName = focused ? 'ios-list-circle' : 'ios-list-circle-outline'
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={RecomendedScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Info" component={InfoScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
    </Tab.Navigator>
  )
}

export default HomeScreen
