declare interface ILoginParams {
  email: string
  password: string
}

declare interface IPushEmployeeParams {
  name: string
  phone: string
  shift: DayOfTheWeek
}

declare interface ISaveEmployeeParams {
  uid: string
  name: string
  phone: string
  shift: DayOfTheWeek
}

declare interface IDeleteEmployeeParams {
  uid: string
}

declare interface IEmployee {
  uid: string
  name: string
  phone: string
  shift: DayOfTheWeek
}