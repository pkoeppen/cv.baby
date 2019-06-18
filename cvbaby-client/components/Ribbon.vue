<template>
  <div class="ribbon-mask" :style="maskStyle">
    <div class="ribbon-container" :style="containerStyle">
      <div class="ribbon" :style="ribbonStyle">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>
const RIBBON_WIDTH_MULTIPLIER = 8 * Math.sqrt(2);
const MASK_WH_ADDITIONAL = 5;
// 6 looks best on Firefox
// 7 looks best on Chrome and Edge
const OFFSET_ADDITIONAL = 6;
const MINIMUM_WIDTH = 100;
export default {
  name: 'Ribbon',
  props: {
    text: {
      type: String,
      default: 'Most Popular'
    },
    right: {
      type: Boolean,
      default: true
    },
    left: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    orientation() {
      return this.left ? 'left' : 'right';
    },
    ribbonWidthPre() {
      const width = this.text.length * RIBBON_WIDTH_MULTIPLIER;
      return width > MINIMUM_WIDTH ? width : MINIMUM_WIDTH;
    },
    ribbonWidthPost() {
      return Math.ceil(this.ribbonWidthPre + 1);
    },
    maskWidthHeight() {
      return (
        Math.sqrt(Math.pow(this.ribbonWidthPre, 2) / 2) + 5 + MASK_WH_ADDITIONAL
      );
    },
    containerOffset() {
      return (
        (Math.sqrt(2) * (this.ribbonWidthPost - 20)) / 4 - OFFSET_ADDITIONAL
      );
    },
    maskStyle() {
      return {
        width: `${this.maskWidthHeight}px`,
        height: `${this.maskWidthHeight}px`,
        top: '-5px',
        ...(this.orientation === 'right' && {
          right: `-5px`
        }),
        ...(this.orientation === 'left' && {
          left: `-5px`
        })
      };
    },
    containerStyle() {
      return {
        top: `${this.containerOffset}px`,
        ...(this.orientation === 'right' && {
          right: `${this.containerOffset}px`
        }),
        ...(this.orientation === 'left' && {
          left: `${this.containerOffset}px`
        })
      };
    },
    ribbonStyle() {
      return {
        width: `${this.ribbonWidthPost}px`,
        'transform-origin': '50% 0',
        '-webkit-transform-origin': '50% 0',
        ...(this.orientation === 'right' && {
          transform: 'translate(-50%, 0) rotate(45deg)',
          '-webkit-transform': 'translate(-50%, 0) rotate(45deg)',
          left: '100%'
        }),
        ...(this.orientation === 'left' && {
          transform: 'translate(50%, 0) rotate(-45deg)',
          '-webkit-transform': 'translate(50%, 0) rotate(-45deg)',
          right: '100%'
        })
      };
    }
  }
};
</script>
<style lang="stylus" scoped>
.ribbon-mask
  position: absolute;
  right: -5px
  top: -5px
  z-index: 1
  overflow: hidden
.ribbon-container
    position: absolute
    width: 100%
    height: 100%
.ribbon
  font-size: 10px
  font-weight: bold
  color: #FFF
  text-transform: uppercase
  text-align: center
  line-height: 20px
  display: block
  background: $bluegrass
  background: linear-gradient($bluegrass 0%, #29CF7C 100%)
  box-shadow: 0 3px 10px -5px rgba(0, 0, 0, .3)
  position: absolute
.ribbon
  &:before
    content: ''
    position: absolute
    left: 0px
    top: 100%
    z-index: -1
    border-left: 3px solid #25BF72
    border-right: 3px solid transparent
    border-bottom: 3px solid transparent
    border-top: 3px solid #25BF72
.ribbon
  &:after
    content: ''
    position: absolute
    right: 0px
    top: 100%
    z-index: -1
    border-left: 3px solid transparent
    border-right: 3px solid #25BF72
    border-bottom: 3px solid transparent
    border-top: 3px solid #25BF72
</style>
