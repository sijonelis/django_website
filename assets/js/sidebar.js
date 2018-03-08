/**
 * Created by Vilkazz on 2017-09-16.
 */
/**
 * Renders menu
 */
import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { color, fontSize, font } from '../css/typography'
import SecondLevelMenuItem from './secondLvlMenuItem'
import MediaQuery from 'react-responsive'
import { slide as BurgerMenu } from 'react-burger-menu'
import ReactCSSTransitionReplace from 'react-css-transition-replace'

import './../css/textTransition.css'

import { twentyNineCmAnimation, visibility, float } from '../css/globalStyles'
import Contact from './contact'
import LanguageButton from './languageButton'
let Scroll = require('react-scroll')
let scrollSpy = Scroll.scrollSpy
let Link = Scroll.Link
let Events = Scroll.Events

let Sidebar

let SideBarState = {
  HOME: 0,
  COLLECTION_CAMPAIGN: 1,
  NORMAL: 2,
  INVISIBLE: 3
}

Sidebar = React.createClass({
  getInitialState: function () {
    // if home menu initialized then show home animation
    this.isInit = false
    // only start showing animation after page has been scrolled at least once
    this.show29cmAnim = false
    return {
      menuState: SideBarState.HOME,
      animationsEnabled: false,
      // extra parameters for single gallery menu
      galleryTitle: null,
      galleryType: null,
      galleryId: null,
      mobileMenuOpen: false,
      showStockList: this.props.settings['show_stock_list'],
      showLanguageMenu: this.props.settings['show_language_menu'],
      showCollectionTitle: false,
      showCampaignTitle: false
    }
  },
  componentDidMount: function () {
    // todo move these events to loadSidebar success function
    Events.scrollEvent.register('begin', function () {
      console.log('begin', arguments)
    })

    Events.scrollEvent.register('end', function () {
      console.log('end', arguments)
    })

    scrollSpy.update()
  },
  componentDidUpdate: function () {
    this.show29cmAnim = true
  },
  // menu style setters
  setCollectionStyle: function (showStyle, showCollectionTitle = false, showCampaignTitle = false) {
    if (showStyle) {
      this.isInit = true
      this.setState({
        menuState: SideBarState.COLLECTION_CAMPAIGN,
        showCollectionTitle: showCollectionTitle,
        showCampaignTitle: showCampaignTitle
      })
    } else {
      this.setState({menuState: SideBarState.NORMAL,
        showCollectionTitle: false,
        showCampaignTitle: false
      })
    }
  },
  setHomeStyle: function (showStyle) {
    if (showStyle) {
      this.setState({menuState: SideBarState.HOME,
        showCollectionTitle: false,
        showCampaignTitle: false
      })
    } else {
      this.setState({menuState: SideBarState.NORMAL})
    }
  },
  // menu style checkers
  showHomeStyle: function () {
    return this.state.menuState === SideBarState.HOME
  },
  showNormalStyle: function () {
    return this.state.menuState === SideBarState.NORMAL
  },
  setInvisible: function () {
    this.setState({
      menuState: SideBarState.INVISIBLE,
      isInit: false
    })
  },
  showCollectionStyle: function () {
    return this.state.menuState === SideBarState.COLLECTION_CAMPAIGN
  },
  showInvisible: function () {
    return this.state.menuState === SideBarState.INVISIBLE
  },
  showSingleGalleryTitle: function (type, title, id) {
    this.setState({
      galleryTitle: title,
      galleryType: type,
      galleryId: id
    })
  },
  _create2ndLevelMenu: function (parentName, createMobileMenu = false) {
    if (parentName === 'collections') {
      if (this.showHomeStyle() || createMobileMenu) {
        return this.props.collections.map(function (collection, index) {
          return (
            <SecondLevelMenuItem key={index} collection={collection} galleryType={parentName} isDisabled={false} showMenu={createMobileMenu} />
          )
        })
      }
    }
    if (this.showCollectionStyle() && this.state.galleryType === parentName && this.state.galleryTitle !== null) {
      return (
        <SecondLevelMenuItem key={0} collection={{id: this.state.galleryId, title: this.state.galleryTitle}} galleryType={parentName} isDisabled />
      )
    }
    if (parentName === 'campaigns') {
      if (this.showHomeStyle() || createMobileMenu) {
        return this.props.campaigns.map(function (collection, index) {
          return (
            <SecondLevelMenuItem key={index} collection={collection} galleryType={parentName} isDisabled={false} showMenu={createMobileMenu} />
          )
        })
      }
    }
  },
  getLinkList: function () {
    return (
      <div className={css((this.showHomeStyle() && this.isInit) && styles.homeStyleAnim)}>
        <Link className={css(styles.menuItemStyle, (this.showCollectionStyle() || this.showNormalStyle()) && styles.collStyleItemAnim, (this.showHomeStyle() && this.isInit) && styles.homeStyleItemAnim, this.showCollectionStyle() && styles.menuItemTransparentBackground, this.showHomeStyle() && styles.homeMenuLargeSpacing, this.showHomeStyle() && styles.homeSpacing)}
          activeClass={css(styles.menuItemStyle, (this.showCollectionStyle() || this.showNormalStyle()) && styles.collStyleItemAnim, (this.showHomeStyle() && this.isInit) && styles.homeStyleItemAnim, styles.menuItemStyleSelected, this.showCollectionStyle() && styles.menuItemTransparentBackground, this.showHomeStyle() && styles.homeMenuLargeSpacing, this.showHomeStyle() && styles.homeSpacing)}
          to='position-home'
          spy
          smooth>
          <div>{this.props.menu.home}</div>
        </Link>
        <div>
          <div className={css(styles.menuSuperscript, (this.showHomeStyle()) && visibility.hidden)}>{this._create2ndLevelMenu('collections', this.state.showCollectionTitle)}</div>
          <Link
            className={css(styles.menuItemStyle, (this.showCollectionStyle() || this.showNormalStyle()) && styles.collStyleItemAnim, (this.showHomeStyle() && this.isInit) && styles.homeStyleItemAnim, this.showCollectionStyle() && styles.menuItemTransparentBackground, this.showHomeStyle() && styles.homeMenuLargeSpacing, this.showHomeStyle() && styles.homeSpacing)}
            activeClass={css(styles.menuItemStyle, (this.showCollectionStyle() || this.showNormalStyle()) && styles.collStyleItemAnim, (this.showHomeStyle() && this.isInit) && styles.homeStyleItemAnim, styles.menuItemStyleSelected, this.showCollectionStyle() && styles.menuItemTransparentBackground, this.showHomeStyle() && styles.homeMenuLargeSpacing, this.showHomeStyle() && styles.homeSpacing)}
            to='position-collection'
            spy
            smooth>
            <div>{this.props.menu.collection}</div>
          </Link>
        </div>
        <div>
          <div className={css(styles.menuSuperscript, this.showNormalStyle() && visibility.hidden)}>{this._create2ndLevelMenu('campaigns', this.state.showCampaignTitle)}</div>
          <Link
            className={css(styles.menuItemStyle, (this.showCollectionStyle() || this.showNormalStyle()) && styles.collStyleItemAnim, (this.showHomeStyle() && this.isInit) && styles.homeStyleItemAnim, this.showCollectionStyle() && styles.menuItemTransparentBackground, this.showHomeStyle() && styles.margin60, this.showHomeStyle() && styles.homeSpacing)}
            activeClass={css(styles.menuItemStyle, (this.showCollectionStyle() || this.showNormalStyle()) && styles.collStyleItemAnim, (this.showHomeStyle() && this.isInit) && styles.homeStyleItemAnim, styles.menuItemStyleSelected, this.showCollectionStyle() && styles.menuItemTransparentBackground, this.showHomeStyle() && styles.margin60, this.showHomeStyle() && styles.homeSpacing)}
            to='position-campaign'
            spy
            smooth>
            <div>{this.props.menu.campaign}</div>
          </Link>
        </div>
        <Link
          className={css(styles.menuItemStyle, this.showCollectionStyle() && styles.menuItemTransparentBackground, this.showHomeStyle() && styles.alignRight, !this.state.showStockList && visibility.hidden, this.showHomeStyle() && styles.homeSpacing)}
          activeClass={css(styles.menuItemStyle, styles.menuItemStyleSelected, this.showCollectionStyle() && styles.menuItemTransparentBackground, this.showHomeStyle() && styles.alignRight, !this.state.showStockList && visibility.hidden, this.showHomeStyle() && styles.homeSpacing)}
          to='position-stock-list'
          spy
          smooth>
          <div>
            <div>{this.props.menu.stockList}</div>
          </div>
        </Link>
        <Link
          className={css(styles.menuItemStyle, this.showCollectionStyle() && styles.menuItemTransparentBackground, this.showHomeStyle() && styles.alignRight, this.showHomeStyle() && styles.homeSpacing)}
          activeClass={css(styles.menuItemStyle, styles.menuItemStyleSelected, this.showCollectionStyle() && styles.menuItemTransparentBackground, this.showHomeStyle() && styles.alignRight, this.showHomeStyle() && styles.homeSpacing)}
          to='position-press'
          spy
          smooth>
          <div>
            <div>{this.props.menu.press}</div>
          </div>
        </Link>
        <Link
          className={css(styles.menuItemStyle, this.showCollectionStyle() && styles.menuItemTransparentBackground, this.showHomeStyle() && styles.alignRight, this.showHomeStyle() && styles.homeSpacing)}
          activeClass={css(styles.menuItemStyle, styles.menuItemStyleSelected, this.showCollectionStyle() && styles.menuItemTransparentBackground, this.showHomeStyle() && styles.alignRight, this.showHomeStyle() && styles.homeSpacing)}
          to='position-about'
          spy
          smooth>
          {this.props.menu.about}
        </Link>
      </div>
    )
  },
  desktopMenu: function () {
    return (
      <div className={css(styles.sidebarStyle, this.showHomeStyle() && styles.homeStyle, this.showInvisible() && visibility.hidden, this.init && styles.fontSizeTransition)}>
        <div className={css((this.showCollectionStyle() || this.showNormalStyle()) && styles.collStyleAnim)}>
          <div className={css(styles.fixed, this.show29cmAnim && twentyNineCmAnimation.transition, this.props.scrollDirection === 1 && twentyNineCmAnimation.animateUp, this.props.scrollDirection === 2 && twentyNineCmAnimation.animateDown)}>
            {this.getLinkList()}
            <div className={css(styles.whiteBg, (this.showCollectionStyle() || this.showNormalStyle()) && styles.languageButtonMargin, this.showCollectionStyle() && styles.menuItemTransparentBackground, this.showHomeStyle() && float.right, !this.state.showLanguageMenu && visibility.hidden)}>
              <LanguageButton changeLanguage={this.props.changeLanguage} language={this.props.currentLanguage} />
            </div>
          </div>
        </div>
      </div>
    )
  },
  handleMenuClick: function () {
    this.setState({
      mobileMenuOpen: false
    })
  },
  isMobileMenuOpen: function (state) {
    if (state.isOpen && !this.state.mobileMenuOpen) {
      this.setState({
        mobileMenuOpen: true
      })
    }
    if (!state.isOpen && this.state.mobileMenuOpen) {
      this.setState({
        mobileMenuOpen: false
      })
    }
  },
  mobileMenu: function () {
    return (
      <div>
        <Link className={css(styles.bmBurgerItemStyle)}
          activeClass={css(styles.bmBurgerItemStyle, styles.menuItemStyleSelected)}
          to='position-home'
          spy
          smooth
          onClick={() => { this.handleMenuClick() }}
        >
          <div>{this.props.menu.home}</div>
        </Link>
        <div>
          <div className={css(styles.menuSuperscript, float.right)}>{this._create2ndLevelMenu('collections', true)}</div>
          <Link
            className={css(styles.bmBurgerItemStyle)}
            activeClass={css(styles.bmBurgerItemStyle, styles.menuItemStyleSelected)}
            to='position-collection'
            spy
            smooth
            onClick={() => { this.handleMenuClick() }}
          >
            <div>{this.props.menu.collection}</div>
          </Link>
        </div>
        <div>
          <div className={css(styles.menuSuperscript, float.right)}>{this._create2ndLevelMenu('campaigns', true)}</div>
          <Link
            className={css(styles.bmBurgerItemStyle)}
            activeClass={css(styles.bmBurgerItemStyle, styles.menuItemStyleSelected)}
            to='position-campaign'
            spy
            smooth
            onClick={() => { this.handleMenuClick() }}
          >
            <div>{this.props.menu.campaign}</div>
          </Link>
        </div>
        <Link
          className={css(styles.bmBurgerItemStyle, this.state.showStockList && visibility.hidden)}
          activeClass={css(styles.bmBurgerItemStyle, styles.menuItemStyleSelected)}
          to='position-stock-list'
          spy
          smooth
          onClick={() => { this.handleMenuClick() }}
        >
          <div>
            <div>{this.props.menu.stockList}</div>
          </div>
        </Link>
        <Link
          className={css(styles.bmBurgerItemStyle)}
          activeClass={css(styles.bmBurgerItemStyle, styles.menuItemStyleSelected)}
          to='position-press'
          spy
          smooth
          onClick={() => { this.handleMenuClick() }}
        >
          <div>
            <div>{this.props.menu.press}</div>
          </div>
        </Link>
        <Link
          className={css(styles.bmBurgerItemStyle)}
          activeClass={css(styles.bmBurgerItemStyle, styles.menuItemStyleSelected)}
          to='position-about'
          spy
          smooth
          onClick={() => { this.handleMenuClick() }}
        >
          {this.props.menu.about}
        </Link>
        <Contact showMobile contactData={this.props.settings} />
        <div className={css(styles.whiteBg, float.right, !this.state.showLanguageMenu && visibility.hidden)} onClick={() => { this.handleMenuClick() }}>
          <LanguageButton changeLanguage={this.props.changeLanguage} language={this.props.currentLanguage} />
        </div>
      </div>
    )
  },
  render: function () {
    if (this.state.galleryType !== null) {
      return (
        <div>
          {/* {this.desktopMenu()} */}
        </div>)
    }
    return (
      <div>
        <MediaQuery query='(max-device-width: 768px), (max-width: 768px)'>
          <MediaQuery query='(max-device-height: 500px), (max-height: 500px)'>
            <BurgerMenu customBurgerIcon={<img src='http://oxrkv9ms4.bkt.clouddn.com/mobile_menu_bars.png' />} customCrossIcon={<img src='http://oxrkv9ms4.bkt.clouddn.com/mobile_menu_cross.png' />} isOpen={this.state.mobileMenuOpen} onStateChange={this.isMobileMenuOpen} width={'100%'} styles={burgerStylesLandscape}>
              {this.mobileMenu()}
            </BurgerMenu>
          </MediaQuery>
          <MediaQuery query='(min-device-height: 501px), (min-height: 501px)'>
            <BurgerMenu customBurgerIcon={<img src='http://oxrkv9ms4.bkt.clouddn.com/mobile_menu_bars.png' />} customCrossIcon={<img src='http://oxrkv9ms4.bkt.clouddn.com/mobile_menu_cross.png' />} isOpen={this.state.mobileMenuOpen} onStateChange={this.isMobileMenuOpen} width={'100%'} styles={burgerStylesPortrait}>
              {this.mobileMenu()}
            </BurgerMenu>
          </MediaQuery>
        </MediaQuery>
        <MediaQuery query='(min-device-width: 769px) and (min-width: 769px)'>
          <ReactCSSTransitionReplace transitionName='cross-fade' overflowHidden={false}
            transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <div key={this.props.menu.home}>{this.desktopMenu()} </div>
          </ReactCSSTransitionReplace>
        </MediaQuery>
      </div>
    )
  }
})

export default Sidebar

const sidebarKeyframes = {
  '0%': {
    marginLeft: '115px',
    marginTop: '180px'
  },
  '100%': {
    marginLeft: '0px',
    marginTop: '0px'
  }
}
const homeKeyFrames = {
  '0%': {
    marginLeft: '-115px',
    marginTop: '-180px'
  },
  '100%': {
    marginLeft: '0px',
    marginTop: '0px'
  }
}

const sidebarItemKeyframes = {
  '0%': {
    marginBottom: '60px'
  },
  '100%': {
    marginBottom: '20px'
  }
}

const styles = StyleSheet.create({
  sidebarStyle: {
    width: '200px',
    position: 'fixed',
    fontFamily: font.bold,
    fontWeight: '700',
    fontSize: fontSize.standard,
    textTransform: 'uppercase',
    marginTop: '120px',
    marginRight: '130px',
    marginLeft: '15px',
    float: 'right',
    zIndex: 10,
    cursor: 'pointer'
  },
  collStyleAnim: {
    animationName: [sidebarKeyframes],
    animationDuration: '.3s'
  },
  collStyleItemAnim: {
    animationName: [sidebarItemKeyframes],
    animationDuration: '.3s'
  },
  homeStyleAnim: {
    animationName: [homeKeyFrames],
    animationDuration: '.3s'
  },
  homeStyleItemAnim: {
    animationName: [sidebarItemKeyframes],
    animationDuration: '.3s',
    animationDirection: 'reverse'
  },
  menuItemStyle: {
    display: 'block',
    width: 'fit-content',
    textAlign: 'right',
    marginRight: 0,
    marginBottom: '20px',
    maxHeight: '19px',
    textDecoration: 'none',
    backgroundColor: color.white
  },
  menuItemTransparentBackground: {
    backgroundColor: color.transparent,
    '@media screen and (min-device-width: 768px)': {
      textShadow: '2px 0px 15px rgba(26, 26, 26, 0.35)'
    },
    color: color.white
  },
  menuItemStyleSelected: {
    textDecoration: 'underline'
  },
  fixed: {
    position: 'fixed'
  },
  homeStyle: {
    fontSize: fontSize.headingLarge,
    marginLeft: '130px',
    marginTop: '300px',
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      fontSize: fontSize.menuSuperscript
    }
  },
  homeSpacing: {
    maxHeight: '28px',
    minWidth: '157px'
  },
  homeMenuLargeSpacing: {
    marginBottom: '60px',
    marginLeft: 'auto',
    marginRight: 0
  },
  alignRight: {
    marginLeft: 'auto',
    marginRight: 0
  },
  margin60: {
    marginBottom: '60px',
    marginLeft: 'auto',
    marginRight: 0
  },
  fontSizeTransition: {
    transitionProperty: 'font-size',
    transitionDuration: '.3s'
  },
  whiteBg: {
    backgroundColor: '#FFF'
  },
  bmBurgerItemStyle: {
    display: 'block',
    width: 'fit-content',
    textAlign: 'right',
    marginRight: 0,
    marginBottom: '20px',
    textDecoration: 'none',
    backgroundColor: color.white,
    marginLeft: 'auto',
    color: color.text
  },
  languageButtonMargin: {
    marginTop: '50px'
  }
})

const burgerStylesPortrait = {
  bmBurgerButton: {
    position: 'fixed',
    width: '30px',
    height: '30px',
    left: '4vw',
    top: '3vh'
  },
  bmBurgerBars: {
    background: '#262626'
  },
  bmCrossButton: {
    width: '30px',
    height: '30px',
    left: '4vw',
    top: '3vh'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#fff',
    overflow: 'none',
    paddingRight: '8vw',
    paddingLeft: '8vw',
    paddingTop: '16vw',
    fontSize: fontSize.menuHeadingMobile,
    textTransform: 'uppercase',
    fontFamily: font.bold,
    fontWeight: '700'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#262626',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  },
  bmMenuWrap: {
    zIndex: 15
  }
}

const burgerStylesLandscape = {
  bmBurgerButton: {
    position: 'fixed',
    width: '30px',
    height: '30px',
    left: '4vw',
    top: '3vh'
  },
  bmBurgerBars: {
    background: '#262626'
  },
  bmCrossButton: {
    width: '30px',
    height: '30px',
    left: '4vw',
    top: '3vh'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#fff',
    overflow: 'none',
    paddingRight: '8vw',
    paddingLeft: '8vw',
    paddingTop: '5vw',
    fontSize: fontSize.menuHeadingMobileSmall,
    textTransform: 'uppercase',
    fontFamily: font.bold,
    fontWeight: '700'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#262626',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  },
  bmMenuWrap: {
    zIndex: 15
  }
}
