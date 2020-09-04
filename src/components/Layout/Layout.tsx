import React from 'react'
import Aux from '../../hoc/Aux'
import classes from './Layout.module.css'

interface IProps {}

const Layout : React.FunctionComponent<IProps> = props => {

  return <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
}

export default Layout