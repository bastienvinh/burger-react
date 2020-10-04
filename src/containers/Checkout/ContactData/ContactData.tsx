import React, { ChangeEvent, FC, useState } from 'react'
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
import { DictionnaryInputElement } from 'types/IInputElement'

import { updateObject, checkValidty } from '../../../shared/utility'

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



interface IProps extends RouteComponentProps, ReduxState, ReduxDispatch { }

// class ContactData extends Component<IProps, IState> {

const ContactData: FC<IProps> = props => {

  const [formIsValid, setFormIsValid] = useState(false)
  const [orderForm, setOrderForm] : [DictionnaryInputElement, any] = useState({
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
  })

  const orderHandler = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.preventDefault()

    const formData: { [ingredient: string]: string } = {}
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value
    }

    const order: Order = {
      ingredients: props.ingrs!,
      price: props.tPrice,
      orderData: formData
    }

    props.onOrderBurgerStart()
    props.onOrderBurger(order)
  }

  const inputChangedHandler = (event: ChangeEvent, identifier: string) => {
    const updatedOrderForm = { ...orderForm }
    const updatedFormElement = updateObject(orderForm[identifier], {
      value: orderForm[identifier].elementType === 'select' ? (event.target as HTMLSelectElement).value : (event.target as HTMLInputElement).value,
      touched: true,
      valid: checkValidty(orderForm[identifier].value, orderForm[identifier].validation)
    })
    updatedOrderForm[identifier] = updatedFormElement

    const formIsValid = !Object.keys(updatedOrderForm)
      .map(identifier => updatedOrderForm[identifier])
      .some(input => !input.valid)

    setOrderForm(updatedOrderForm)
    setFormIsValid(formIsValid)
  }


  const listInput = Object.keys(orderForm)
    .map(inputName => orderForm[inputName])
    .map(input => <Input
      key={input.name}
      elementConfig={input.elementConfig}
      elementType={input.elementType}
      invalid={!input.valid}
      shouldValidate={!!input.validation}
      changed={(event: ChangeEvent) => inputChangedHandler(event, input.name)}
      touched={input.touched}
    />)

  let form = <form>
    {listInput}
    <Button disable={!formIsValid} btnType="Success" clicked={orderHandler}>ORDER</Button>
  </form>

  if (props.loading) {
    form = <Spinner />
  }

  if (props.error) {
    form = <p>Error Inserting data. Refresh the page.</p>
  }

  return <div className={classes.ContactData}>
    <h4>Enter your Contact Data</h4>
    {form}
  </div>

}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData)