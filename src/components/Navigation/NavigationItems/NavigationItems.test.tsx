import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({ adapter: new Adapter() })

describe('<NaviagtionItems />', () => {
  it('should render two <NavigationItem /> elements if not authenticated', () => {  
    const wrapper = shallow(<NavigationItems />)
    expect(wrapper.find(NavigationItem)).toHaveLength(3)
  })
})

it('should render three <NavigationItem /> elements if authentificated', () => {
  const wrapper = shallow(<NavigationItems />)
  wrapper.setProps({ isAuthenticated: true })
  expect(wrapper.find(NavigationItem)).toHaveLength(3)
}) 

it('should render three <NavigationItem /> elements if authentificated', () => {
  const wrapper = shallow(<NavigationItems />)
  wrapper.setProps({ isAuthenticated: true })
  expect(wrapper.contains(<NavigationItem exact link="/logout">Logout</NavigationItem>)).toBe(true)
}) 