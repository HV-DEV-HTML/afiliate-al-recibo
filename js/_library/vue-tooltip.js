var VueTooltip = {
  template: '<div :class="`tooltip ${position}`"><slot></slot><span class="tooltip-text">{{content}}</span></div>',
  props: {
    position: String,
    content: String
  }
};