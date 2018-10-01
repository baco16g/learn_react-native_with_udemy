import * as React from 'react'
import { View, StyleSheet } from 'react-native'

interface IProps {
  children: JSX.Element | JSX.Element[]
  style?: object
}

const CardSection = ({ children, style }: IProps) => {
  return <View style={[styles.containerStyle, style]}>{children}</View>
}

const styles = StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
})

export { CardSection }
