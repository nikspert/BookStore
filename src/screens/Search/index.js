import React, { useState, useRef } from 'react'
import { Colors, TextInput, ActivityIndicator, Button, Card } from 'react-native-paper'
import { View, Text, FlatList } from 'react-native'
import { getBooksByTitle } from '../../api'
import _ from 'lodash'

export default ({ navigation }) => {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearchChange = _.debounce((title) => {
    setIsLoading(true)
    getBooksByTitle(title)
      .then((result) => {
        setBooks(result)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, 600)

  const btnClick = async () => {
    navigation.navigate('home', { city: city })
  }
  const listClick = async (isbn13) => {
    navigation.navigate('Details', { isbn13: isbn13 })
  }
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        mode="outlined"
        label="Book title"
        theme={{ colors: { primary: Colors.purple400 } }}
        onChangeText={(text) => {
          handleSearchChange(text)
        }}
      />
      {isLoading ? (
        <ActivityIndicator animating={true} size={'large'} color={Colors.purple400} />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.isbn13}
          renderItem={({ item }) => {
            return (
              <Card style={{ margin: 2, padding: 12 }} onPress={() => listClick(item.isbn13)}>
                <Text>{item.title}</Text>
              </Card>
            )
          }}
        />
      )}
    </View>
  )
}
