/** @format */

import axios from 'axios'
import * as React from 'react'
import { ScrollView, Text } from 'react-native'
import { ComponentEnhancer, compose, lifecycle, withState } from 'recompose'

import AlbumDetail, { IAlbum } from './AlbumDetail'

interface IProps {
  albums: IAlbum[]
  updateAlbums: () => void
}

const AlbumList = ({ albums }: IProps) => {
  const Albums = albums.map((album: IAlbum) => (
    <AlbumDetail key={album.title} album={album} />
  ))
  return <ScrollView>{Albums}</ScrollView>
}

const enhancer: ComponentEnhancer<IProps, {}> = compose(
  withState('albums', 'updateAlbums', []),
  lifecycle({
    async componentWillMount() {
      try {
        const { data } = await axios.get(
          'https://rallycoding.herokuapp.com/api/music_albums'
        )
        this.setState({
          albums: data
        })
      } catch (err) {
        throw new Error(err)
      }
    }
  })
)

export default enhancer(AlbumList)
