/**
 * Renders page and handles states
 */
import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import GalleryList from './galleryList'
import StockListBlock from './stockListBlock'
import Press from './press'
import AboutBlock from './about'
import Home from './home'
import { visibility } from '../css/globalStyles'

let Scroll = require('react-scroll')
let Element = Scroll.Element
let Waypoint = require('react-waypoint')
let MainPage = React.createClass({
  getInitialState: function () {
    return {
      contents: this.props.contents,
      showHome: this.props.showHomeStyle,
      showCollection: this.props.showCollectionStyle,
      showNormal: this.props.showNormalStyle,
      showStockList: this.props.contents.settings['show_stock_list']
    }
  },
  componentDidMount: function () {
  },
  componentDidUpdate () {
  },
  showContent: function () {

  },
  render: function () {
    return (
      <div>
        <div className='content'>
          <Waypoint
            onEnter={(props) => this.props.showHomeStyle(props)}
            // onLeave={this._showCollectionStyle.bind(this, false)}
            threshold={0}
            bottomOffset={'30%'}
            topOffset={'30%'}
          >
            <div id='home-container'><Element name='position-home'><Home homeData={this.props.contents['home_block']} scrollDirection={this.props.scrollDirection} language={this.props.language} /></Element></div>
          </Waypoint>
        </div>
        <div id='image-view'>
          <Waypoint
            onEnter={(props) => this.props.showCollectionStyle(props, true, false)}
            threshold={0}
            bottomOffset={'80%'}
            topOffset={'30%'}
          >
            <div id='collection-container'>
              <Element name='position-collection'>
                <GalleryList type='collections' collections={this.props.contents['collections']} scrollDirection={this.props.scrollDirection} />
              </Element>
            </div>
          </Waypoint>
          <Waypoint
            onEnter={(props) => this.props.showCollectionStyle(props, false, true)}
            threshold={0}
            bottomOffset={'80%'}
            topOffset={'30%'}
          >
            <div id='campaign-container'>
              <Element name='position-campaign'>
                <GalleryList type='campaigns' collections={this.props.contents['campaigns']} scrollDirection={this.props.scrollDirection} />
              </Element>
            </div>
          </Waypoint>
        </div>
        <div className='content'>
          <Waypoint
            onEnter={(props) => this.props.showNormalStyle(props, 'stock list')}
            threshold={0}
            bottomOffset={'70%'}
            topOffset={'20%'}
          >
            <div id='stock-list-container' className={css(!this.state.showStockList && visibility.hidden)}>
              <Element name='position-stock-list'>
                <StockListBlock stockListData={this.props.contents['stock_block']} language={this.props.language} />
              </Element>
            </div>
          </Waypoint>
          <Waypoint
            onEnter={(props) => this.props.showNormalStyle(props, 'press')}
            threshold={0}
            bottomOffset={'80%'}
            topOffset={'20%'}
          >
            <div id='press-container'>
              <Element name='position-press'>
                <Press pressData={this.props.contents['press_block']} language={this.props.language} />
              </Element>
            </div>
          </Waypoint>
          <Waypoint
            onEnter={(props) => this.props.showNormalStyle(props, 'about')}
            threshold={0}
            bottomOffset={'80%'}
            topOffset={'20%'}
          >
            <div id='about-container'>
              <Element name='position-about'>
                <AboutBlock aboutData={this.props.contents['about_block']} language={this.props.language} />
              </Element>
            </div>
          </Waypoint>
        </div>

      </div>
    )
  }
})

export default MainPage
