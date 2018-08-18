import * as React from 'react'
import { Text } from 'react-native'
import { ComponentEnhancer, compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { $Call } from 'utility-types'
import { IRootState } from '../reducers'
import * as employeeActions from '../actions/employee'
import { Card, CardSection, Button } from '../components/common'
import EmployeeForm from '../components/EmployeeForm'

interface IPropsConnected
  extends $Call<typeof mapDispatchToProps>,
    $Call<typeof mapStateToProps> {}

interface IHandelrs {
  onButtonPress: () => void
}

interface IProps extends IPropsConnected, IHandelrs {}

const EmployeeCreate = ({
  name,
  phone,
  shift,
  actions,
  onButtonPress
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
          <Text>Create</Text>
        </Button>
      </CardSection>
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

const enhancer: ComponentEnhancer<IProps, {}> = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onButtonPress: ({
      actions,
      name,
      phone,
      shift
    }: IPropsConnected) => (): void => {
      actions.employeeCreate({ name, phone, shift })
    }
  })
)

export default enhancer(EmployeeCreate)
