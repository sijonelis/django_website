/**
 * Created by Vilkazz on 2017-09-17.
 */
/**
 * Renders about block
 * */
import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { lineHeight, fontSize } from '../css/typography'
import WOW from 'wowjs'
import './../css/textTransition.css'
import ReactCSSTransitionReplace from 'react-css-transition-replace'

let AboutBlock = React.createClass({
  componentDidMount: function () {
    // init animations
    new WOW.WOW().init()
  },
  componentDidUpdate: function () {
  },
  render: function () {
    return (
      <span>
        <div>
          <ReactCSSTransitionReplace transitionName='cross-fade' overflowHidden={false}
            transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <div className={css(styles.aboutTextStyle) + ' wow fadeInUp'} dangerouslySetInnerHTML={{__html: this.props.aboutData['contents']}} {...{'data-wow-offset': 150}} key={this.props.language} />
          </ReactCSSTransitionReplace>
        </div>
      </span>
    )
  }
})

export default AboutBlock

const styles = StyleSheet.create({
  aboutTextStyle: {
    width: 'calc(50vw-130px)',
    marginLeft: '50vw',
    marginRight: '130px',
    minHeight: '85vh',
    verticalAlign: 'top',
    paddingTop: '120px',
    lineHeight: lineHeight.normal,
    fontSize: fontSize.standard,
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      paddingTop: '85px',
      paddingBottom: '145px',
      marginLeft: '8vw',
      marginRight: '8vw',
      width: '84vw',
      fontSize: fontSize.standardMobile
    }
  }
})
