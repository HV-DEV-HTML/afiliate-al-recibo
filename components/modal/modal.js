//import * as Vue from 'vue'
const { ref } = Vue

//import { onClickOutside } from 'https://cdn.jsdelivr.net/npm/@vueuse/core@9.12.0/+esm'
//import { vOnClickOutside } from 'https://cdn.jsdelivr.net/npm/@vueuse/components@10.0.2/+esm'

//import { create } from 'https://cdn.jsdelivr.net/npm/jss@10.10.0/+esm'
//import preset from 'https://cdn.jsdelivr.net/npm/jss-preset-default@10.10.0/+esm'

import { onClickOutside } from 'https://cdn.jsdelivr.net/npm/@vueuse/core@9.12.0/+esm'

//import bemPlugin from "../../library/jssbem.js";

//import styles from './styles.js'

/*import modal from './modal.css' assert { type: "css" };
document.adoptedStyleSheets = [modal];*/

//const url = "./components/modal/modal.css";
//document.head.innerHTML += `<link type="text/css" rel="stylesheet" href=${url}>`;
//shadowRoot.adoptedStyleSheets = [modal];

//const jss = create(preset())

/*import modal from './modal.css' assert { type: "css" };
document.adoptedStyleSheets = [modal];*/

//console.log("vOnClickOutside",vOnClickOutside)

//Vue.use(vOnClickOutside)

/*

`
<transition name="modal">
  <div>
    <div class="modal-container">
      <div class="modal-header">
        <slot name="header">default header</slot>
      </div>

      <div class="modal-body">
        <slot name="body">default body</slot>
      </div>

      <div class="modal-footer">
        <slot name="footer">
          default footer
          <button
            class="modal-default-button"
            @click="$emit('close')"
          >OK</button>
        </slot>
      </div>
    </div>
  </div>
</transition>
`

<div v-if="show" :class="classes.modal_mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">default header</slot>
        </div>

        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            default footer
            <button
              class="modal-default-button"
              @click="$emit('close')"
            >OK</button>
          </slot>
        </div>
      </div>
    </div>

*/

const template = /*html*/`
<teleport to="body">
  <transition name="modal">
    <div class="u-modal" v-if="cshow"> 
      <div class="u-modal__main" ref="modalRef">
        <button class="u-modal__close" @click="closeBlock()"></button>
        <slot name="main">default body</slot>
      </div>
    </div>
  </transition>
</teleport>
`

export default {
  name: 'custom-modal',
  props: {
    cshow: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {

    const modalRef = ref(null)

    /*function closeModal() {
      //modal.value = false
      console.log("llegamos close modal")
    }*/

    /*console.log("onClickOutside",onClickOutside)

    onClickOutside(modalRef,
      (event) => {
        console.log(event)
        //$emit('close')
        //show.value = false
      }
    )*/

    //const { classes } = jss.createStyleSheet(styles).attach()

    //const modalRef = ref(null)

    //onClickOutside(modalRef, (event) => console.log(event))

    /*onClickOutside(
      modalRef,
      (event) => {
        console.log(event)
        //$emit('close')
        //show.value = false
      },
    )*/

    //const { show } = toRefs(props)
    //const show$ = ref(false)

    //onClickOutside(show, (event) => console.log(event))
    //onClickOutside(show, (event) => (show.value = false))
    //console.log("props",show.value)
    //let color = ref('orange')
    //let color = ref('#ff0000');
    //onMounted(() => console.log('Mounted from setup!'));

    /*function open(x){
      show$.value = x
    }

    function close(){
      show$.value = false
    }*/

    //open(show)

    //return { classes };

    const closeBlock = () => {

      /*state.block1 = true
      state.block2 = false
      state.block3 = false

      v1$.value.$reset();

      register1.modalidad = ''
      register1.nombre = null
      register1.dni = null
      register1.celular = null
      register1.correo = null
      register1.terminos = false
      register1.promociones = false*/

      emit('close')

    };

    onClickOutside(
      modalRef,
      (event) => {
        //console.log(event)
        closeBlock()
      },
    )

    return { 
      closeBlock,
      modalRef
    }
  },
  template: template
}