import * as React from 'react'
import { ListView, ListViewDataSource } from 'react-native'
import {
  ComponentEnhancer,
  compose,
  lifecycle,
  withStateHandlers,
  StateHandlerMap
} from 'recompose'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { Actions as routerActions } from 'react-native-router-flux'
import { $Call } from 'utility-types'
import _ from 'lodash'
import { IRootState } from '../reducers'
import * as employeeActions from '../actions/employee'
import { Spinner } from '../components/common'
import ListItem from '../components/ListItem'

interface IPropsConnected
  extends $Call<typeof mapDispatchToProps>,
    $Call<typeof mapStateToProps> {}

interface IState {
  dataSource: ListViewDataSource | null
}

type Updater = StateHandlerMap<IState> & {
  createDataSource: (
    employees: IEmployee[]
  ) => { dataSource: ListViewDataSource }
}

type Props = IPropsConnected & IState & Updater

const EmployeeList = ({ dataSource }: Props) => {
  const renderRow = (employee: IEmployee) => {
    return (
      <ListItem
        key={employee.uid}
        employee={employee}
        onPress={() => routerActions.employeeEdit({ employee })}
      />
    )
  }
  return dataSource ? (
    <ListView
      enableEmptySections
      dataSource={dataSource}
      renderRow={renderRow}
    />
  ) : (
    <Spinner size="large" />
  )
}

const mapStateToProps = (state: IRootState) => {
  const employees: IEmployee[] = _.map(state.employee.list, (val, uid) => ({
    ...val,
    uid
  }))
  return {
    ...state.employee,
    employees
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: {
      ...bindActionCreators(employeeActions, dispatch)
    }
  }
}

const enhancer: ComponentEnhancer<Props, {}> = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStateHandlers<IState, Updater>(
    {
      dataSource: null
    },
    {
      createDataSource: () => (employees: IEmployee[]) => {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        })
        return {
          dataSource: employees ? ds.cloneWithRows(employees) : null
        }
      }
    }
  ),
  lifecycle<IPropsConnected & Updater, {}>({
    componentWillMount() {
      this.props.actions.addEventForEmployeesFetch()
      this.props.createDataSource(this.props.employees)
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.employees === nextProps.employees) {
        return false
      }
      this.props.createDataSource(nextProps.employees)
    }
  })
)

export default enhancer(EmployeeList)
