import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import BookCard from '../../components/BookCard'
import { Button, ActivityIndicator, Colors, Portal, Dialog, Paragraph } from 'react-native-paper'
import { getNewBooks } from '../../api'

export default function RecomendedScreen({ navigation }) {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [visible, setVisible] = useState(false)
  const showDialog = () => setVisible(true)
  const hideDialog = () => setVisible(false)

  useEffect(() => {
    setIsLoading(true)
    getNewBooks()
      .then((result) => {
        setBooks(result)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const renderItem = ({ item }) => {
    return (
      <BookCard
        title={item.title}
        subtitle={item.subtitle}
        image={item.image}
        isbn13={item.isbn13}
        navigation={navigation}
        showDialog={showDialog}
      ></BookCard>
    )
  }
  return (
    <>
      {isLoading || books == [] ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator animating={true} size={'large'} color={Colors.purple400} />
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Success!</Dialog.Title>
              <Dialog.Content>
                <Paragraph>This book is now in your saved list</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button type="text" title={'Ok'} onPress={hideDialog}>
                  Ok
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <FlatList
            horizontal={true}
            data={books}
            keyExtractor={(item) => item.isbn13}
            renderItem={renderItem}
          />
        </View>
      )}
    </>
  )
}
