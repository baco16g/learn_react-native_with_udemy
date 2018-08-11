import * as React from 'react'
import { View, FlatList } from 'react-native'
import { ComponentEnhancer, compose, withStateHandlers } from 'recompose'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { $Call } from 'utility-types'
import { IRootState } from '../reducers'
import { ILibrary } from '../reducers/LibraryReducer'
import * as selectionActions from '../actions/selectionActions'

import ListItem from '../components/ListItem'

interface IState {
  listUpdate: number
}

interface IStateHandlers {
  onUpdateList: () => { listUpdate: number }
}

interface IProps
  extends $Call<typeof mapDispatchToProps>,
    $Call<typeof mapStateToProps>,
    IState,
    IStateHandlers {}

const LibraryList = ({
  libraries,
  selection,
  actions,
  listUpdate,
  onUpdateList
}: IProps) => {
  const renderItem = ({ item }: { item: ILibrary }) => {
    const { id } = item
    return (
      <ListItem
        library={item}
        expanded={selection.id === id}
        onPress={() => {
          onUpdateList()
          actions.selectLibrary(id)
        }}
      />
    )
  }
  return (
    <View>
      <FlatList
        data={libraries.data}
        renderItem={renderItem}
        extraData={listUpdate}
        keyExtractor={({ id }: ILibrary) => `${id}`}
      />
    </View>
  )
}

const mapStateToProps = (state: IRootState) => {
  return {
    libraries: state.libraries,
    selection: state.selectedLibrary
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: {
      ...bindActionCreators(selectionActions, dispatch)
    }
  }
}

const enhancer: ComponentEnhancer<IProps, {}> = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStateHandlers(
    {
      listUpdate: 0
    },
    {
      onUpdateList: ({ listUpdate }) => () => ({
        listUpdate: listUpdate + 1
      })
    }
  )
)

export default enhancer(LibraryList)
