import React, { useEffect, useState } from 'react'
import { View, Image } from 'react-native'
import { ActivityIndicator, Title, Subheading, Paragraph, Colors, Button } from 'react-native-paper'
import { AddBookToStorage } from '../../utils/AsyncStorage'
import { getDetails } from '../../api'
import styles from './style'

export default function DetailsScreen({ route, navigation }) {
  const { isbn13 } = route.params
  const [book, setBook] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  const [icon, setIcon] = useState('book-plus')

  useEffect(() => {
    setIsLoading(true)
    getDetails(isbn13)
      .then((data) => {
        setBook(data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      {isLoading || book == {} ? (
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
        <>
          <Title
            style={{
              textAlign: 'center',
              margin: '5%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {book.title}
          </Title>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 5, alignItems: 'center' }}>
              <Image style={styles.image} source={{ uri: book.image }} />
              <Subheading style={{ textAlign: 'center' }}>{book.authors}</Subheading>
              <Subheading>{book.publisher}</Subheading>
              <Subheading>{book.price}</Subheading>
            </View>
            <View style={{ flex: 5, margin: '4%' }}>
              <Paragraph>{book.desc}</Paragraph>
              <Button
                loading={isButtonLoading}
                icon={icon}
                onPress={() => {
                  setIsButtonLoading(true)
                  AddBookToStorage({ title: book.title, isbn13: book.isbn13 })
                    .then(() => {
                      setIsButtonLoading(false)
                      setIcon('clipboard-check')
                    })
                    .catch((error) => {
                      setIsButtonLoading(false)
                      setIcon('file-excel-box')
                    })
                }}
              >
                add
              </Button>
            </View>
          </View>
        </>
      )}
    </>
    // </View>
  )
}
