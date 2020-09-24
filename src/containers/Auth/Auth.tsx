import React, { ChangeEvent, Component, FormEvent } from 'react'
import { Redirect } from 'react-router-dom'

import { DictionnaryInputElement, Validation } from '../../types/IInputElement'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

import classes from './Auth.module.css'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from 'store/store'
import { auth } from 'store/actions/auth'

import Spinner from '../../components/UI/Spinner/Spinner'

const mapStateToProps = (state: RootState) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  onAuth: (login: string, password: string, isSignup: boolean) => dispatch(auth(login, password, isSignup))
})

type ReduxState = ReturnType<typeof mapStateToProps>
type ReduxDispatch = ReturnType<typeof mapDispatchToProps>


interface IProps extends ReduxState, ReduxDispatch {}
interface IState {
  controls: DictionnaryInputElement
  isSignup: boolean
}

class Auth extends Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props)

    this.state = {
      controls: {
        email: {
          name: "email",
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Mail Address'
          },
          value: '',
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false
        },
        password: {
          name: "password",
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        }
      },
      isSignup: true
    }
  }

  checkValidty(value: string, rules: Validation | undefined) : boolean {
    let isValid = true

    if (!rules) {
      return true
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
      // const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
      isValid = emailRegex.test(value) && isValid
    }

     return isValid
  }

  inputChangedHandler = (event: ChangeEvent, controlName: string) => {
    const value = this.state.controls[controlName].elementType === 'select' ? (event.target as HTMLSelectElement).value : (event.target as HTMLInputElement).value
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value,
        valid: this.checkValidty(value, this.state.controls[controlName].validation),
        touched: true
      },
    }

    this.setState( { controls: updatedControls } )
  }

  submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.onAuth( this.state.controls['email'].value, this.state.controls['password'].value, this.state.isSignup )
  }

  swicthAuthModeHandler() {
    this.setState(prevState => ({ isSignup: !prevState.isSignup }))
  }
  
  render() {
  
    let listInput : React.ReactNode = Object.keys(this.state.controls)
                            .map(inputName => this.state.controls[inputName])
                            .map(input => <Input
                                  key={input.name}
                                  elementConfig={input.elementConfig}
                                  elementType={input.elementType}
                                  invalid={!input.valid}
                                  shouldValidate={!!input.validation}
                                  changed={(event: ChangeEvent) => this.inputChangedHandler(event, input.name)}
                                  touched={input.touched}
                                />)

    if (this.props.loading) {
      listInput = <Spinner />
    }

    let errorMessage = null

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }

    let authRedirect : React.ReactElement | null = null
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />
    }

    return <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={this.submitForm.bind(this)}>
        {listInput}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button clicked={this.swicthAuthModeHandler.bind(this)} btnType="Danger" >SWITCH TO { this.state.isSignup ? 'SIGNIN' : 'SIGNUP' }</Button>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)