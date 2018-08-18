import _ from 'lodash'
import * as React from 'react'
import { Text } from 'react-native'
import Comminications from 'react-native-communications'
import {
  ComponentEnhancer,
  compose,
  withHandlers,
  lifecycle,
  withStateHandlers
} from 'recompose'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { $Call } from 'utility-types'
import { IRootState } from '../reducers'
import * as employeeActions from '../actions/employee'
import { Card, CardSection, Button, Confirm } from '../components/common'
import EmployeeForm from '../components/EmployeeForm'

interface IOuterProps {
  employee: IEmployee
}

interface IPropsConnected
  extends $Call<typeof mapDispatchToProps>,
    $Call<typeof mapStateToProps> {}

interface IHandlers {
  onButtonPress: () => void
  onTextPress: () => void
  onAccept: () => void
  onDecline: () => void
}

interface IState {
  showModal: boolean
}

interface IStateHandlers {
  onToggleConfirm: () => void
}

interface IProps
  extends IOuterProps,
    IPropsConnected,
    IHandlers,
    IState,
    IStateHandlers {}

const EmployeeEdit = ({
  name,
  phone,
  shift,
  actions,
  onButtonPress,
  onTextPress,
  onAccept,
  onDecline,
  onToggleConfirm,
  showModal
}: IProps) => {
  return (
    <Card>
      <EmployeeForm
        name={name}
        phone={phone}
        shift={shift}
        employeeUpdate={actions.employeeUpdate}
      />

      <CardSection>
        <Button onPress={onButtonPress}>
          <Text>Save Changes</Text>
        </Button>
      </CardSection>

      <CardSection>
        <Button onPress={onTextPress}>
          <Text>Text Schedule</Text>
        </Button>
      </CardSection>

      <CardSection>
        <Button onPress={onToggleConfirm}>
          <Text>Fire Employee</Text>
        </Button>
      </CardSection>

      <Confirm visible={showModal} onAccept={onAccept} onDecline={onDecline}>
        Are you sure you want to delete this?
      </Confirm>
    </Card>
  )
}

const mapStateToProps = (state: IRootState) => {
  return {
    ...state.employeeForm
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: {
      ...bindActionCreators(employeeActions, dispatch)
    }
  }
}

const enhancer: ComponentEnhancer<IProps, IOuterProps> = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStateHandlers(
    { showModal: false },
    {
      onToggleConfirm: ({ showModal }) => () => ({
        showModal: !showModal
      })
    }
  ),
  withHandlers({
    onButtonPress: ({
      actions,
      name,
      phone,
      shift,
      employee
    }: IOuterProps & IPropsConnected & IStateHandlers) => (): void => {
      actions.employeeSave({ name, phone, shift, uid: employee.uid })
    },
    onTextPress: ({
      phone,
      shift
    }: IOuterProps & IPropsConnected & IStateHandlers) => (): void => {
      Comminications.text(phone, `Your upcoming shift is on ${shift}`)
    },
    onAccept: ({
      actions,
      employee
    }: IOuterProps & IPropsConnected & IStateHandlers) => (): void => {
      actions.employeeDelete({ uid: employee.uid })
    },
    onDecline: ({
      onToggleConfirm
    }: IOuterProps & IPropsConnected & IStateHandlers) => (): void => {
      onToggleConfirm()
    }
  }),
  lifecycle<IOuterProps & IPropsConnected & IHandlers & IStateHandlers, {}>({
    componentWillMount() {
      _.each(this.props.employee, (value, prop) => {
        this.props.actions.employeeUpdate({ prop, value })
      })
    }
  })
)

export default enhancer(EmployeeEdit)
