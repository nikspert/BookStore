import * as React from 'react'
import { Image, View } from 'react-native'
import { Card, Title, Button } from 'react-native-paper'
import { AddBookToStorage } from '../../utils/AsyncStorage'
import { styles } from './styles'
class BookCard extends React.PureComponent {
  render() {
    return (
      <Card style={styles.card}>
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: this.props.image }} />
        </View>
        <Card.Content style={styles.container}>
          <Title>{this.props.title}</Title>
        </Card.Content>
        <Card.Actions style={styles.container}>
          <Button
            onPress={() => {
              this.props.navigation.navigate('Details', { isbn13: this.props.isbn13 })
            }}
          >
            Show
          </Button>
          <Button
            onPress={() => {
              AddBookToStorage({ title: this.props.title, isbn13: this.props.isbn13 })
                .then(() => this.props.showDialog())
                .catch((error) => {
                  this.props.showDialog()
                })
            }}
          >
            Add
          </Button>
        </Card.Actions>
      </Card>
    )
  }
}
export default BookCard
