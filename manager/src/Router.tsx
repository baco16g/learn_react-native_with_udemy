import * as React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import LoginForm from './containers/LoginForm'
import EmployeeList from './containers/EmployeeList'
import EmployeeCreate from './containers/EmployeeCreate'
import EmployeeEdit from './containers/EmployeeEdit'

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Please Login" />
        </Scene>

        <Scene key="main">
          <Scene
            rightTitle="Add"
            onRight={() => {
              Actions.employeeCreate()
            }}
            key="employeeList"
            component={EmployeeList}
            title="Employees"
          />
          <Scene
            key="employeeCreate"
            component={EmployeeCreate}
            title="Create Employee"
          />
          <Scene
            key="employeeEdit"
            component={EmployeeEdit}
            title="Edit Employee"
          />
        </Scene>
      </Scene>
    </Router>
  )
}

export default RouterComponent
