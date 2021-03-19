import React, { useState, useEffect } from 'react'
import { Colors, IconButton, ActivityIndicator, Button, Card } from 'react-native-paper'
import { View, Text, FlatList } from 'react-native'
import _ from 'lodash'

import { getSavedStorage, RemoveBookFromStorage } from '../../utils/AsyncStorage'

export default ({ navigation }) => {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getSavedStorage().then((json) => {
        setBooks(json)
      })
    })
    return unsubscribe
  }, [navigation])

  const RemoveButtonClick = (isbn13) => {
    RemoveBookFromStorage(isbn13).then(() => {
      setBooks(books.filter((item) => item.isbn13 !== isbn13))
    })
  }
  const listClick = async (isbn13) => {
    navigation.navigate('Details', { isbn13: isbn13 })
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.isbn13}
        renderItem={({ item }) => {
          return (
            <Card
              style={{ flexDirection: 'row', margin: 2, padding: 12 }}
              onPress={() => listClick(item.isbn13)}
            >
              <Text style={{ flex: 4 }}>{item.title}</Text>
              <IconButton
                style={{ flex: 1 }}
                icon="delete-circle"
                color={Colors.purple500}
                size={20}
                onPress={() => RemoveButtonClick(item.isbn13)}
              />
            </Card>
          )
        }}
      />
    </View>
  )
}
