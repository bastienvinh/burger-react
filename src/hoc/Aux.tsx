import React, { FunctionComponent } from 'react'

interface IProps {}

const Aux : FunctionComponent<IProps> = props => <div>{props.children}</div>

export default Aux