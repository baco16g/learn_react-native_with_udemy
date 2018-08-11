import * as React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native'
import { ComponentEnhancer, compose, lifecycle } from 'recompose'
import { CardSection } from './common'
import { ILibrary } from '../reducers/LibraryReducer'

interface IProps {
  library: ILibrary
  expanded: boolean
  onPress: () => void
}

const LibraryItem = ({ library, expanded, onPress }: IProps) => {
  const { titleStyle } = styles
  const { title, description } = library

  const renderDescription = () => {
    return expanded ? (
      <CardSection>
        <Text style={{ flex: 1 }}>{description}</Text>
      </CardSection>
    ) : null
  }

  return (
    <View>
      <TouchableWithoutFeedback onPress={onPress}>
        <View>
          <CardSection>
            <Text style={titleStyle}>{title}</Text>
          </CardSection>
          {renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
})

const enhancer: ComponentEnhancer<IProps, IProps> = compose(
  lifecycle({
    componentWillUpdate() {
      LayoutAnimation.spring()
    }
  })
)

export default enhancer(LibraryItem)
