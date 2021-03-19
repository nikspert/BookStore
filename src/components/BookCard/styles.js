import { StyleSheet, Dimensions } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  stretch: {
    width: 300,
    height: 400,
    resizeMode: 'stretch',
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  image: {
    height: (Dimensions.get('screen').height / 5) * 3,
    width: (Dimensions.get('screen').width / 3) * 2,
  },
})
