import React, { FunctionComponent } from 'react'
import classes from './Spinner.module.css'

interface IProps {}

const Spinner: FunctionComponent<IProps> = _props => <div className={classes.Loader}>Loading ...</div>

export default Spinner