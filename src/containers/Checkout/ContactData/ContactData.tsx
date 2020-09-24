import React, { ChangeEvent, Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import classes from './ContactData.module.css'
import { RootState } from 'store/store'
import { purchaseBurger, purchaseBurgerStart } from 'store/actions/order'
import Order from 'types/Order'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { DictionnaryInputElement, Validation } from 'types/IInputElement'

const mapStateToProps = (state: RootState) => ({
  ingrs: state.burger.ingredients,
  tPrice: state.burger.totalPrice,
  loading: state.orders.loading,
  error: state.orders.error
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  onOrderBurger: (order: Order) => dispatch(purchaseBurger(order)),
  onOrderBurgerStart: () => dispatch(purchaseBurgerStart())
})

type ReduxState = ReturnType<typeof mapStateToProps>
type ReduxDispatch = ReturnType<typeof mapDispatchToProps>



interface IProps extends RouteComponentProps, ReduxState, ReduxDispatch {}

interface IState {
  orderForm: DictionnaryInputElement
  formIsValid: boolean
}

class ContactData extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      orderForm: {
        name: {
          name: 'name',
          elementType: 'input',
          elementConfig: {
            placeholder: 'Your name',
            type: 'text'
          },
          value: '',
          validation: {
            required: true,
            minLength: 2
          },
          valid: false,
          touched: false
        },
        street: {
          name: 'street',
          elementType: 'input',
          elementConfig: {
            placeholder: 'Your Street',
            type: 'text'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        country: {
          name: 'country',
          elementType: 'input',
          elementConfig: {
            placeholder: 'Your Country',
            type: 'text'
          },
          value: '',
          validation: {
            required: true,
            minLength: 2
          },
          valid: false,
          touched: false
        },
        zipCode: {
          name: 'zipCode',
          elementType: 'input',
          elementConfig: {
            placeholder: 'Zip code',
            type: 'text'
          },
          value: '',
          validation: {
            required: true,
            minLength: 5,
            maxLength: 5
          },
          valid: false,
          touched: false
        },
        email: {
          name: 'email',
          elementType: 'input',
          elementConfig: {
            placeholder: 'Your email',
            type: 'text'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        deliveryMethod: {
          name: 'deliveryMethod',
          elementType: 'select',
          elementConfig: {
            options: [
              { value: 'fatest', displayValue: 'Fatest' },
              { value: 'cheapest', displayValue: 'Chepeast' }
            ]
          },
          value: '',
          validation: {},
          valid: true,
          touched: false
        },
      },
      formIsValid: false
    }
  }

  orderHandler(event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event?.preventDefault()

    const formData : { [ingredient: string] : string } = {}
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    
    const order: Order = {
      ingredients: this.props.ingrs!,
      price: this.props.tPrice,
      orderData: formData
    }

    this.props.onOrderBurgerStart()
    this.props.onOrderBurger(order)
  }

  changeValidity(value: string, rules: Validation | undefined) : boolean {
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

     return isValid
  }

  inputChangedHandler = (event: ChangeEvent, identifier: string) => {
    const updatedOrderForm = { ...this.state.orderForm }
    const updatedFormElement = { ...updatedOrderForm[identifier] }
    updatedFormElement.value  = updatedFormElement.elementType === 'select' ? (event.target as HTMLSelectElement).value : (event.target as HTMLInputElement).value
    updatedFormElement.touched = true
    updatedFormElement.valid = this.changeValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedOrderForm[identifier] = updatedFormElement

    const formIsValid = !Object.keys(updatedOrderForm)
                          .map(identifier => updatedOrderForm[identifier])
                          .some(input => !input.valid)

    this.setState({ orderForm: updatedOrderForm, formIsValid })
  }

  render() {

    const listInput = Object.keys(this.state.orderForm)
                            .map(inputName => this.state.orderForm[inputName])
                            .map(input => <Input
                                            key={input.name}
                                            elementConfig={input.elementConfig}
                                            elementType={input.elementType}
                                            invalid={!input.valid}
                                            shouldValidate={!!input.validation}
                                            changed={(event: ChangeEvent) => this.inputChangedHandler(event, input.name)}
                                            touched={input.touched}
                                          />)

    let form = <form>
      {listInput}
      <Button disable={!this.state.formIsValid} btnType="Success" clicked={this.orderHandler.bind(this)}>ORDER</Button>
    </form>

    if (this.props.loading) {
      form = <Spinner />
    }

    if (this.props.error) {
      form = <p>Error Inserting data. Refresh the page.</p>
    }

    return <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData)