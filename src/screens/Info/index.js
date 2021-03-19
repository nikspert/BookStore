import React from 'react'
import { View } from 'react-native'
import { Title, Paragraph } from 'react-native-paper'

export default function infoScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Title>About</Title>
      <Paragraph>
        Simple project to demonstrate working with api in react native for educational purposes
      </Paragraph>
    </View>
  )
}
