import { StyleSheet } from 'aphrodite'

const twentyNiceCmAnimParams = {
  moveUp: 'translateY(-30px)',
  moveDown: 'translateY(30px)',
  moveUpMobile: 'translateY(-10px)',
  moveDownMobile: 'translateY(10px)'
}

export const twentyNineCmAnimation = StyleSheet.create({
  animateUp: {
    transform: twentyNiceCmAnimParams.moveDown,
    '@media screen and (max-width: 768px)': {
      transform: twentyNiceCmAnimParams.moveDownMobile
    },
    '@media screen and (max-device-width: 768px)': {
      transform: twentyNiceCmAnimParams.moveDownMobile
    }
  },
  animateDown: {
    transform: twentyNiceCmAnimParams.moveUp,
    '@media screen and (max-width: 768px)': {
      transform: twentyNiceCmAnimParams.moveUpMobile
    },
    '@media screen and (max-device-width: 768px)': {
      transform: twentyNiceCmAnimParams.moveUpMobile
    }
  },
  transition: {
    transition: '0.5s ease-out'
  }
})

export const visibility = StyleSheet.create({
  hidden: {
    display: 'none'
  }
})

export const float = StyleSheet.create({
  left: {
    float: 'left'
  },
  right: {
    float: 'right'
  }
})
