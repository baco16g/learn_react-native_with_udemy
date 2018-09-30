import * as React from 'react'
import {
  View,
  ScrollView,
  Text,
  Platform,
  StyleSheet,
  Linking
} from 'react-native'
import { compose, ComponentEnhancer, setStatic } from 'recompose'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Card, Button } from 'react-native-elements'
import FitImage from 'react-native-fit-image'
import { $Call } from 'utility-types'
import { IRootStore } from '../reducers'

type Props = IPropsConnected

interface IPropsConnected
  extends $Call<typeof mapDispatchToProps>,
    $Call<typeof mapStateToProps> {}

const ReviewScreen = ({ likedJobs }: Props) => {
  const renderLikedJobs = () =>
    likedJobs.map(job => (
      <Card title={job.title} key={job.id}>
        <View>
          {job.company_logo && (
            <FitImage
              source={{ uri: job.company_logo }}
              resizeMode="contain"
              style={styles.logo}
            />
          )}
          <View style={styles.detailWrapper}>
            <Text style={styles.italics}>{job.company}</Text>
            <Text style={styles.italics}>{job.location}</Text>
          </View>
          <Button
            title="Apply Now!"
            backgroundColor="#03A9F4"
            onPress={() => Linking.openURL(job.url)}
          />
        </View>
      </Card>
    ))

  return <ScrollView>{renderLikedJobs()}</ScrollView>
}

const mapStateToProps = (state: IRootStore) => ({
  likedJobs: state.like.list
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

const enhancer: ComponentEnhancer<any, any> = compose(
  setStatic('navigationOptions', ({ navigation }: { navigation: any }) => ({
    title: 'Review Jobs',
    headerRight: (
      <Button
        title="Settings"
        onPress={() => navigation.navigate('settings')}
        backgroundColor="rgba(0, 0, 0, 0)"
        color="rgba(0, 122, 255, 1)"
      />
    ),
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  })),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

const styles = StyleSheet.create({
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 100,
    marginBottom: 30
  },
  italics: {
    fontStyle: 'italic'
  }
})

export default enhancer(ReviewScreen)
