import * as React from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'

interface IProps {
  data: IData[]
  width?: number
  onComplete: () => void
}

export interface IData {
  text: string
  color: string
}

const Slides = ({
  data,
  width = Dimensions.get('window').width,
  onComplete
}: IProps) => {
  const renderLastSlide = (index: number) =>
    index === data.length - 1 ? (
      <Button
        buttonStyle={styles.buttonStyle}
        title="Onwards!"
        raised
        onPress={onComplete}
      />
    ) : null

  const renderSlides = () =>
    data.map((slide, index) => (
      <View
        key={slide.text}
        style={[
          StyleSheet.flatten(styles.slideStyle),
          { width, backgroundColor: slide.color }
        ]}
      >
        <Text style={styles.textStyle}>{slide.text}</Text>
        {renderLastSlide(index)}
      </View>
    ))

  return (
    <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
      {renderSlides()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 30,
    color: '#fff'
  },
  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 15
  }
})

export default Slides
