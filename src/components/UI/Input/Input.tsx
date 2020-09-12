import React, { ChangeEvent, FunctionComponent } from 'react'
import classes from './Input.module.css'


interface IInputProps {
  changed?: (event: ChangeEvent) => void
  value?: string | number | readonly string[] | undefined
  type?: string
  name?: string
  id?: string
  placeholder?: string
}

interface IProps extends IInputProps {
  elementType: string
  elementConfig: {
    type?: string
    placeholder?: string
    options?: Array<{ value: string, displayValue: string }>
  }
  invalid?: boolean
  shouldValidate?: boolean
  touched?: boolean
}

const Input: FunctionComponent<IProps> = props => {
  let inputElement: React.ReactElement | null = null
  const inputClasses = [classes.InputElement]

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid)
  }

  const config = {...props.elementConfig}
  Reflect.deleteProperty(config, 'options')

  switch (props.elementType) {
    case 'input': {
      inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...config} />
      break
    }
    case 'textarea': {
      inputElement = <textarea onChange={props.changed} className={inputClasses.join(' ')} {...config} />
      break
    }
    case 'select': {
    inputElement = <select onChange={props.changed}>{props.elementConfig.options?.map(option => <option key={option.value} value={option.value}>{option.displayValue}</option>)}</select>
      break
    }
    default: {
      inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...config} />
      break
    }
  }
  
  return <div>
    {inputElement}
  </div>
}

export default Input