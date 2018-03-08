/**
 * Created by Vilkazz on 2017-09-17.
 */
/**
 * Renders about block
 * */
import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { lineHeight, fontSize } from '../css/typography'
import ReactCSSTransitionReplace from 'react-css-transition-replace'

import './../css/textTransition.css'

let Home = React.createClass({
  getInitialState: function () {
    return {home: {'contents': ''}}
  },
  componentDidMount: function () {
  },
  componentDidUpdate: function () {
  },

  render: function () {
    return (
      <span>
        <div className={css(styles.homeTextStyle) + ' animated fadeInUp'}>
          <ReactCSSTransitionReplace transitionName='cross-fade' overflowHidden={false}
            transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <div dangerouslySetInnerHTML={{__html: this.props.homeData['contents']}} key={this.props.language} />
          </ReactCSSTransitionReplace>
        </div>
      </span>
    )
  }
})

export default Home

const styles = StyleSheet.create({
  homeTextStyle: {
    width: '50vw',
    margin: 0,
    marginLeft: 'calc(50vw - 130px)',
    marginRight: '130px',
    verticalAlign: 'top',
    paddingTop: '300px',
    fontSize: fontSize.standard,
    lineHeight: lineHeight.normal,
    textSizeAdjust: 'none',
    minHeight: '100vh',
    position: 'relative',
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      paddingTop: '85px',
      paddingBottom: '40px',
      marginLeft: '28vw',
      marginRight: '8vw',
      width: '64vw',
      fontSize: fontSize.standardMobile
    }
  }
})
