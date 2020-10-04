import React, { ChangeEvent, Dispatch, FC, FormEvent, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { DictionnaryInputElement } from '../../types/IInputElement'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

import classes from './Auth.module.css'
import { connect } from 'react-redux'
import { RootState } from 'store/store'
import { auth, setAuthRedirectPath } from 'store/actions/auth'
import { checkValidty } from '../../shared/utility'

import { updateObject } from '../../shared/utility'

import Spinner from '../../components/UI/Spinner/Spinner'
import { AUTH_ACTION } from 'store/types'

const mapStateToProps = (state: RootState) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burger.building,
  authRedirectPath: state.auth.authRedirectPath
})

const mapDispatchToProps = (dispatch: Dispatch<AUTH_ACTION>) => ({
  onAuth: (login: string, password: string, isSignup: boolean) => dispatch(auth(login, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
})

type ReduxState = ReturnType<typeof mapStateToProps>
type ReduxDispatch = ReturnType<typeof mapDispatchToProps>


interface IProps extends ReduxState, ReduxDispatch { }

const Auth: FC<IProps> = props => {

  const { buildingBurger, onSetAuthRedirectPath , authRedirectPath } = props

  const [isSignup, setIsSignup] = useState(false)
  const [controls, setControls]: [DictionnaryInputElement, any] = useState({
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
  })

  useEffect(() => {
    if (buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath()
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath])

  const inputChangedHandler = (event: ChangeEvent, controlName: string) => {
    const value = controls[controlName].elementType === 'select' ? (event.target as HTMLSelectElement).value : (event.target as HTMLInputElement).value
    const updatedControls = updateObject(controls, {
      [controlName]: {
        ...controls[controlName],
        value,
        valid: checkValidty(value, controls[controlName].validation),
        touched: true
      }
    })

    setControls(updatedControls)
  }

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.onAuth(controls['email'].value, controls['password'].value, isSignup)
  }

  const swicthAuthModeHandler = () => {
    setIsSignup(prevState => !prevState)
  }

  let listInput: React.ReactNode = Object.keys(controls)
    .map(inputName => controls[inputName])
    .map(input => <Input
      key={input.name}
      elementConfig={input.elementConfig}
      elementType={input.elementType}
      invalid={!input.valid}
      shouldValidate={!!input.validation}
      changed={(event: ChangeEvent) => inputChangedHandler(event, input.name)}
      touched={input.touched}
    />)

  if (props.loading) {
    listInput = <Spinner />
  }

  let errorMessage = null

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>
  }

  let authRedirect: React.ReactElement | null = null
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />
  }

  return <div className={classes.Auth}>
    {authRedirect}
    {errorMessage}
    <form onSubmit={submitForm}>
      {listInput}
      <Button btnType="Success">SUBMIT</Button>
    </form>
    <Button clicked={swicthAuthModeHandler} btnType="Danger" >SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
  </div>

}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)