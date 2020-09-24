export interface IInputElement {
  name: string
  elementType: string
  elementConfig: {
    type?: string
    placeholder?: string
    options?: Array<{ value: string, displayValue: string }>
  }
  value: string,
  validation?: Validation
  valid: boolean
  touched: boolean
}

export interface Validation {
  required?: boolean
  minLength?: number
  maxLength?: number,
  isEmail?: boolean
}

export type DictionnaryInputElement = { [element: string]: IInputElement }

export default IInputElement