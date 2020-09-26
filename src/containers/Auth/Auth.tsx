import React, { ChangeEvent, Component, FormEvent } from 'react'
import { Redirect } from 'react-router-dom'

import { DictionnaryInputElement } from '../../types/IInputElement'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

import classes from './Auth.module.css'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from 'store/store'
import { auth, setAuthRedirectPath } from 'store/actions/auth'
import { checkValidty } from '../../shared/utility'

import { updateObject } from '../../shared/utility'

import Spinner from '../../components/UI/Spinner/Spinner'

const mapStateToProps = (state: RootState) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burger.building,
  authRedirectPath: state.auth.authRedirectPath
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  onAuth: (login: string, password: string, isSignup: boolean) => dispatch(auth(login, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
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

  componentDidMount() {
    if (this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath()
    }
  }

  

  inputChangedHandler = (event: ChangeEvent, controlName: string) => {
    const value = this.state.controls[controlName].elementType === 'select' ? (event.target as HTMLSelectElement).value : (event.target as HTMLInputElement).value
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: {
        ...this.state.controls[controlName],
        value,
        valid: checkValidty(value, this.state.controls[controlName].validation),
        touched: true
      }
    })

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
      authRedirect = <Redirect to={this.props.authRedirectPath} />
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