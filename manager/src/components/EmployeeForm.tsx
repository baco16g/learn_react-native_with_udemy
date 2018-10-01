import * as React from 'react'
import { View, StyleSheet, Text, Picker } from 'react-native'
import { ComponentEnhancer, compose, withHandlers } from 'recompose'
import * as employeeActions from '../actions/employee'
import { CardSection, Input } from './common'

interface IOuterProps {
  name: string
  phone: string
  shift: DayOfTheWeek
  employeeUpdate: typeof employeeActions.employeeUpdate
}

interface IHandelrs {
  onChangeName: (value: string) => void
  onChangePhone: (value: string) => void
  onChangeShift: (value: string) => void
}

interface IProps extends IOuterProps, IHandelrs {}

const EmployeeCreate = ({
  name,
  phone,
  shift,
  onChangeName,
  onChangePhone,
  onChangeShift
}: IProps) => {
  return (
    <View>
      <CardSection>
        <Input
          label="Name"
          placeholder="Jane"
          value={name}
          onChangeText={onChangeName}
        />
      </CardSection>
      <CardSection>
        <Input
          label="Phone"
          placeholder="555-555-5555"
          value={phone}
          onChangeText={onChangePhone}
        />
      </CardSection>
      <CardSection style={{ flexDirection: 'column' }}>
        <Text style={styles.pickerText}>Shift</Text>
        <Picker
          // style={{ flex: 1 }}
          selectedValue={shift}
          onValueChange={onChangeShift}
        >
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
          <Picker.Item label="Sunday" value="Sunday" />
        </Picker>
      </CardSection>
    </View>
  )
}

const styles = StyleSheet.create({
  pickerText: {
    fontSize: 18,
    paddingLeft: 20
  }
})

const enhancer: ComponentEnhancer<IProps, IOuterProps> = compose(
  withHandlers<IOuterProps, IHandelrs>({
    onChangeName: ({ employeeUpdate }) => (value: string): void => {
      employeeUpdate({ prop: 'name', value })
    },
    onChangePhone: ({ employeeUpdate }) => (value: string): void => {
      employeeUpdate({ prop: 'phone', value })
    },
    onChangeShift: ({ employeeUpdate }) => (value: string): void => {
      employeeUpdate({ prop: 'shift', value })
    }
  })
)

export default enhancer(EmployeeCreate)
