import * as React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { CardSection } from './common'

interface IProps {
  employee: any
  onPress: ({ employee }: { employee: IEmployee }) => void
}

const ListItem = ({ employee, onPress }: IProps) => {
  const { name } = employee
  const { titleStyle } = sytles
  return (
    <TouchableWithoutFeedback onPress={() => onPress({ employee })}>
      <View>
        <CardSection>
          <Text style={titleStyle}>{name}</Text>
        </CardSection>
      </View>
    </TouchableWithoutFeedback>
  )
}

const sytles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
})

export default ListItem
