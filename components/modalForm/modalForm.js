//import * as Vue from 'vue'
const { toRefs, ref, reactive, toRef, onMounted } = Vue
const { required,  email,  minLength,  sameAs,  alpha,  numeric } = VuelidateValidators
const { useVuelidate } = Vuelidate

import { onClickOutside } from 'https://cdn.jsdelivr.net/npm/@vueuse/core@9.12.0/+esm'
//import { vOnClickOutside } from 'https://cdn.jsdelivr.net/npm/@vueuse/components@10.0.2/+esm'

//import modal from './modalForm.css' assert { type: "css" };
//document.adoptedStyleSheets = [modal];



//const url = "./components/modalForm/modalForm.css";
//document.head.innerHTML += `<link type="text/css" rel="stylesheet" href=${url}>`;

//console.log("onClickOutside",onClickOutside)

//Vue.use(vOnClickOutside)

const template = /*html*/`
<teleport to="body">
  <transition name="modal-form">
    <div class="u-modal-form" v-if="fshow"> 
      <div class="u-modal-form__main" ref="modalRef"> 
        <div class="content">
          <div class="content__option" data-option="form" v-if="block1">
            <button class="close" @click="closeBlock()"></button>
            <hgroup>
              <h3> Déjanos tus datos y te llamaremos <br/>inmediatamente.</h3>
              <p>O, si lo prefieres, puedes llamarnos al <a href="tel:0800-00200">0800 00200</a></p>
            </hgroup>
            <form class="form" ref="form1" method="POST" @submit="submitForm1" novalidate autocomplete="off" action="https://svc-formulario-prd-public.k8s-tienda-virtual-d4fa2262c61265a03678a9a8bfbdc84a-0000.us-south.containers.appdomain.cloud/claro/form/add-formulario">
              <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" :value="recaptcha"/>
              <fieldset>
                <dl class="type1">
                  <dd>
                    <div class="form__groupselect1" :class="{ 'invalid': v1$.modalidad.$error, 'valid': !v1$.modalidad.$invalid, }">
                      <select class="form__select1" name="myname[4]" v-model="v1$.modalidad.$model" >
                        <option value="">Escoge tu modalidad</option>
                        <option v-for="(item, key) in send.modalidad" :value="item.id">{{ item.name }}</option>
                      </select>
                    </div>
                  </dd>
                </dl>
                <dl class="type1"> 
                  <dd>
                    <input type="text" class="form__text1" placeholder="Nombre y apellido" v-model="v1$.nombre.$model" name="myname[1]" :class="{ 'invalid': v1$.nombre.$error, 'valid': !v1$.nombre.$invalid, }"/>
                  </dd>
                </dl>
                <dl class="type2"> 
                  <dd>
                    <input type="text" class="form__text1" placeholder="Número de documento" v-model="v1$.dni.$model" name="myname[2]" maxlength="8" :class="{ 'invalid': v1$.dni.$error, 'valid': !v1$.dni.$invalid, }"/>
                  </dd>
                </dl>
                <dl class="type2">
                  <dd>
                    <input type="text" class="form__text1" placeholder="Número de celular" v-model="v1$.celular.$model" name="myname[3]" maxlength="9" :class="{ 'invalid': v1$.celular.$error, 'valid': !v1$.celular.$invalid, }"/>
                  </dd>
                </dl>
                <dl class="type1"> 
                  <dd>
                    <input type="email" class="form__text1" placeholder="Correo electrónico" v-model="v1$.correo.$model" name="myname[5]" :class="{ 'invalid': v1$.correo.$error, 'valid': !v1$.correo.$invalid, }"/>
                  </dd>
                </dl>
              </fieldset>
              <dl class="type1">
                <dt class="checkbox">
                  <div class="form__checkbox1"> 
                    <div>
                      <input type="checkbox" name="myname[6]" v-model="v1$.terminos.$model" @change="v1$.terminos.$touch()" id="Termino3"/>
                      <label for="Termino3"><b></b></label><small>Autorizo el <a @click="showBlock('block2')">tratamiento de mis datos personales.</a></small>
                    </div>
                  </div>
                </dt>
              </dl>
              <dl class="type1">
                <dt class="checkbox">
                  <div class="form__checkbox1"> 
                    <div>
                      <input type="checkbox" name="myname[7]" v-model="v1$.promociones.$model" @change="v1$.promociones.$touch()" id="promociones"/>
                      <label for="promociones"><b></b></label><small>Quiero recibir <a @click="showBlock('block3')">promociones y beneficios</a> de Claro.</small>
                    </div>
                  </div>
                </dt>
              </dl>
              <dl class="type1">
                <dt>
                  <div class="form__buttons">
                    <button class="button1" type="submit" :disabled="v1$.$invalid" :class="{ 'active': !v1$.$invalid }">Quiero que me llamen</button>
                  </div>
                </dt>
              </dl>
            </form>
          </div>
          <div class="content__option" data-option="info" v-if="block2">
            <button class="close" @click="closeBlock()"> </button>
            <hgroup> 
              <h3>Tratamiento de datos personales </h3>
            </hgroup>
            <header>
              <p>
                Autorizo a AMERICA MOVIL PERU S.A.C. con domicilio en Av. Nicolás Arriola N° 480, Santa Catalina, La Victoria, provincia y departamento de Lima (CLARO), para tratar mis datos personales y registrarlos en el Banco de Datos Personales “Clientes” de su titularidad, con la finalidad de llamarme o enviarme mensajes de texto (SMS), mensajes electrónicos y/o correos electrónicos con contenido informativo, publicitario y/o promocional sobre los productos y/o servicios que he solicitado mediante este formulario. Declaro conocer que (i) mis datos serán registrados por el tiempo necesario para cumplir con la finalidad expuesta, o hasta que decida revocar mi autorización, (ii) CLARO podrá compartir su información con terceros encargados del tratamiento de sus datos personales, (iii) mi autorización resulta facultativa, pero en caso de negativa, la finalidad expuesta no podrá realizarse, (iv) podré ejercer los derechos ARCO (Acceso, Rectificación, Cancelación y Oposición); en los puntos de atención designados para tal efecto o a través del siguiente <a href="https://www.claro.com.pe/legal-y-regulatorio/derechos-arco/" target="_blank">enlace. </a></p><br/>
              <p>
                Para consultar el detalle de los encargados de tratamiento y mayor información, revisa nuestra <a href="https://www.claro.com.pe/proteccion-datos/" target="_blank">Política de Privacidad </a></p>
            </header>
            <footer><a @click="showBlock('block1')">Entendido</a></footer>
          </div>
          <div class="content__option" data-option="info" v-if="block3">
            <button class="close" @click="closeBlock()"> </button>
            <hgroup> 
              <h3>Quiero recibir promociones y beneficios de Claro</h3>
            </hgroup>
            <header> 
              <p>
                En aplicación del artículo 58 e) de la Ley N° 29571, solicito , mediante mi consentimiento libre, previo, informado, expreso e inequívoco, que AMERICA MOVIL PERU S.A.C. con domicilio en Av. Nicolás Arriola N° 480, Santa Catalina, La Victoria, provincia y departamento de Lima (CLARO), me contacte con fines publicitarios por llamadas, mensajes de texto (SMS), mensajes electrónicos, correos electrónicos y/o por cualquier otro medio análogo de comunicación, sobre cualquier producto y/o servicio de CLARO a la línea telefónica y/o correo electrónico utilizados para completar este formulario. </p><br/>
              <p>
                Declaro conocer que (i) mis datos serán registrados en el Banco de Datos Personales “Clientes” de CLARO para cumplir con la finalidad expuesta hasta que decida revocar mi consentimiento, (ii) CLARO podrá compartir mi información con terceros encargados del tratamiento de sus datos personales, (iii) mi consentimiento resulta facultativo, pero en caso de negativa, la finalidad expuesta no podrá realizarse, (iv) podré ejercer los derechos ARCO (Acceso, Rectificación, Cancelación y Oposición); en los puntos de atención designados para tal efecto o a través del siguiente <a href="https://www.claro.com.pe/legal-y-regulatorio/derechos-arco/" target="_blank">enlace. </a>Podré consultar el detalle de los encargados de tratamiento y mayor información, revisando la <a href="https://www.claro.com.pe/proteccion-datos/" target="_blank">Política de Privacidad.</a></p>
            </header>
            <footer><a @click="showBlock('block1')">Entendido</a></footer>
          </div>
        </div>
      </div>
    </div>
  </transition>
</teleport>
`

export default {
  name: 'modal-form',
  props: {
    fshow: {
      type: Boolean,
      default: false,
      required: true
    },
    send: {
      type: Object,
      default: null,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {

    onMounted(() => {
      generateRecaptcha()
    })

    const state = reactive({
      block1: true,
      block2: false,
      block3: false
    })

    const modalRef = ref(null)

    const form1 = ref(null)
    const form2 = ref(null)

    const recaptcha = ref('')
    const sectionForm = ref(null);

    const generateRecaptcha = () => {

      grecaptcha.ready(function () {
        grecaptcha.execute('6Le-6poUAAAAAPbrsY79XwKMDjW9PkwVZAU36Fxz', {
          action: 'homepage'
        }).then(function (token) {
          //document.getElementById('g-recaptcha-response-max_59').value=token;
          recaptcha.value = token;
          //console.log("token", token)
        });
      });

    }

    const toForm = () => {
      sectionForm.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // const nav = document.getElementById('nav-bar')
      // const topBar = document.getElementById('id-0001')
      // const scrolledY = window.scrollY;
      // if(scrolledY){
      //   window.scroll(0, scrolledY - nav-((topBar*2)/3));
      // }
    }

     /* Form */

    const validName = (name) => {
      let validNamePattern = new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+(?:[-'\\s][a-zA-ZñÑáéíóúÁÉÍÓÚ]+)*$");
      if (validNamePattern.test(name)) {
        console.log("validName",name)
        return true;
      }
      return false;
    }

    const string = (name) => {
      let validNamePattern = new RegExp("/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/");
      if (validNamePattern.test(name)) {
        return true;
      }
      return false;
    }

    const email = (name) => {
      //let validNamePattern = new RegExp(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i);
      let validNamePattern = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
      if (validNamePattern.test(name)) {
        return true;
      }
      return false;
    }

    const register1 = reactive({
      modalidad: '',
      nombre: '',
      dni: '',
      celular: '',
      correo: '',
      terminos: false,
      promociones: false
    })

    const rules1 = {
      modalidad: {
        required
      },
      nombre: {
        required,
        name_validation: {
          $validator: validName
        }
      },
      dni: {
        required,
        numeric,
        min: minLength(8)
      },
      celular: {
        required,
        numeric,
        min: minLength(9)
      },
      correo: {
        required,
        //email
        name_validation: {
          $validator: email
        }
      },
      terminos: {
        required(val) {
          return val
        }
      },
      promociones: {
        /*required(val) {
          return val
        }*/
      }
    }

    const v1$ = useVuelidate(rules1, {
      modalidad: toRef(register1, "modalidad"),
      nombre: toRef(register1, "nombre"),
      dni: toRef(register1, "dni"),
      celular: toRef(register1, "celular"),
      correo: toRef(register1, "correo"),
      terminos: toRef(register1, "terminos"),
      promociones: toRef(register1, "promociones")
    })

    const submitForm1 = () => {
      v1$.value.$touch();

      if (v1$.value.$invalid) return;

      console.log("fomr1", form1)

      //alert("listo form 1");

      document.getElementById("load_er").classList.add('over_lay');

      //form1.value.submit();

      //alert("Form Submitted " + JSON.stringify(fform, null, 2));
    };


    /* Methods */

    const showBlock = (block) => {

      if(block == 'block1'){
        state.block1 = true
        state.block2 = false
        state.block3 = false
      }else if(block == 'block2'){
        state.block1 = false
        state.block2 = true
        state.block3 = false
      }else if(block == 'block3'){
        state.block1 = false
        state.block2 = false
        state.block3 = true
      }

    };

    const closeBlock = () => {

      state.block1 = true
      state.block2 = false
      state.block3 = false

      v1$.value.$reset();

      register1.modalidad = ''
      register1.nombre = null
      register1.dni = null
      register1.celular = null
      register1.correo = null
      register1.terminos = false
      register1.promociones = false

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
      ...toRefs(state),
      closeBlock,
      showBlock,
      modalRef,
      submitForm1,
      recaptcha,
      form1,
      v1$
    }
  },
  template: template
}