import MainPage from './mainPage'
import React from 'react'
import ReactDOM from 'react-dom'
import Base from './baseView'
import Gallery from './gallery'
import CoverBlock from './coverBlock'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// ReactDOM.render(
//   <ContentWrapper />,
//   document.getElementById('page'))

ReactDOM.render(
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path='/' component={Base}>
      <Route path='/brand/' component={MainPage} />
      <Route path='/gallery/:galleryType/:itemId' component={Gallery} />
      <IndexRoute component={CoverBlock} />
    </Route>
  </Router>,
  document.getElementById('page')
)
