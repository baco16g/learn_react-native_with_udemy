import * as React from 'react'
import { Text, View, Image, Linking, StyleSheet } from 'react-native'

import Card from './Card'
import CardSection from './CardSection'
import Button from './Button'

export interface IAlbum {
  artist: string
  image: string
  thumbnail_image: string
  title: string
  url: string
}

interface IProps {
  album: IAlbum
}

const AlbumDetail = ({ album }: IProps) => {
  const { title, artist, thumbnail_image, image, url } = album
  const {
    thumnailContainerStyle,
    tuhmbnailStyle,
    headerContentStyle,
    headerTextStyle,
    imageStyle
  } = styles

  return (
    <Card>
      <CardSection>
        <View style={thumnailContainerStyle}>
          <Image style={tuhmbnailStyle} source={{ uri: thumbnail_image }} />
        </View>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
          <Text>{artist}</Text>
        </View>
      </CardSection>

      <CardSection>
        <Image style={imageStyle} source={{ uri: image }} />
      </CardSection>

      <CardSection>
        <Button onPress={() => Linking.openURL(url)}>
          <Text>Buy now!!!</Text>
        </Button>
      </CardSection>
    </Card>
  )
}

const styles = StyleSheet.create({
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  tuhmbnailStyle: {
    width: 50,
    height: 50
  },
  thumnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1
  }
})

export default AlbumDetail
