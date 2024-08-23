const {
  createApp,
  ref,
  reactive,
  watch,
  toRef,
  computed,
  onMounted,
} = Vue;
const { required, minLength, maxLength, numeric, alphaNum } =
  VuelidateValidators;
const { useVuelidate } = Vuelidate;



const isNumber = (evt) => {
  evt = evt || window.event;
  const charCode = evt.which || evt.keyCode;

  // Permitir teclas de control como Enter (13), retroceso (8) y eliminar (46)
  if (charCode === 13 || charCode === 8 || charCode === 46) {
    return true;
  }

  // Asegurar que el carácter sea un dígito del 0 al 9 (charCode entre 48 y 57)
  if (charCode < 48 || charCode > 57) {
    evt.preventDefault();
    return false;
  }

  return true;
};

const isNumberKey = (evt) => {
  const charCode = evt.which || evt.keyCode;

  // Permitir teclas de control como Enter, retroceso, eliminar, tabulación, flechas
  if (
    charCode === 13 || // Enter
    charCode === 8 ||  // Backspace
    charCode === 46 || // Delete
    charCode === 9 ||  // Tab
    (charCode >= 37 && charCode <= 40) // Flechas
  ) {
    return true;
  }

  // Asegurar que el carácter sea un dígito del 0 al 9 (teclas superiores) o del teclado numérico
  const isNumber = 
    (charCode >= 48 && charCode <= 57) || // Números del 0 al 9
    (charCode >= 96 && charCode <= 105); // Números del teclado numérico

  if (!isNumber) {
    evt.preventDefault();
    return false;
  }

  return true;
};

const preventNonNumericInput = (evt) => {
  const input = evt.target;
  input.value = input.value.replace(/[^0-9]/g, '');
};

const isAlphanumeric = (inputString) => {
  let validPattern = /^[a-zA-Z0-9]+$/;
  if (validPattern.test(inputString)) {
    return true;
  }
  return false;
}
const isAlphanumericKey = (evt) => {
  const charCode = evt.which || evt.keyCode;

  // Permitir teclas de control como Enter, retroceso, eliminar, tabulación, flechas
  if (
    charCode === 13 || // Enter
    charCode === 8 ||  // Backspace
    charCode === 46 || // Delete
    charCode === 9 ||  // Tab
    (charCode >= 37 && charCode <= 40) // Flechas
  ) {
    return true;
  }

  // Obtener el carácter desde el evento
  const char = String.fromCharCode(charCode);

  // Usar una expresión regular para permitir solo letras (a-z, A-Z) y números (0-9)
  const isValidChar = /^[a-zA-Z0-9]$/.test(char);

  if (!isValidChar) {
    evt.preventDefault();
    return false;
  }

  return true;
};

const preventNonAlphanumericInput = (evt) => {
  const input = evt.target;
  input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
};

const onlyStrings = (event) => {
  const inputText = event.target.value;
  const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;
  if (!regex.test(inputText)) {
    event.target.value = inputText.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/g, '');
  }
}
const onlyStringsKey = (event) => {
  const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;
  const keyPressed = event.key;
  if (!regex.test(keyPressed)) {
    event.preventDefault();
  }
}

const validName = (name) => {
  // let validNamePattern = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
  let validNamePattern = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
  return validNamePattern.test(name);
}

const validEmail = (name) => {
  let validNamePattern = new RegExp(
    /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
  )
  // let validNamePattern = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
  if (validNamePattern.test(name)) {
    return true
  }
  return false
}

const validPhone = (name) => {
  let validNamePattern = new RegExp(
    /^9[\d]{8}$/
  )
  if (validNamePattern.test(name)) {
    // console.log('validPhone', name)
    return true
  }
  return false
}

const validateDocument = (value, kind) => {

  if (kind.type_documento.value === "DNI") {
    if (value.split("").length === 8) {
      return true;
    } else {
      return false;
    }
  }


  if (kind.type_documento.value === "Pasaporte") {
    if (value.split("").length >= 9) {
      return true;
    } else {
      return false;
    }
  }

  if (kind.type_documento.value === "CE") {
    if (value.split("").length >= 9 ) {
      return true;
    } else {
      return false;
    }
  }

  if (kind.type_documento.value === "RUC") {
    let ruc = value.replace(/[-.,[\]()\s]+/g, '')
    if (
      !(
        (ruc >= 1e10 && ruc < 11e9) ||
        (ruc >= 15e9 && ruc < 18e9) ||
        (ruc >= 2e10 && ruc < 21e9)
      )
    ) {
      return false
    }
    let suma
    let i
    for (suma = -(ruc % 10 < 2), i = 0; i < 11; i++, ruc = (ruc / 10) | 0)
      suma += (ruc % 10) * ((i % 7) + ((i / 7) | 0) + 1)
    if (suma % 11 === 0) {
      return suma % 11 === 0
    }
  }
}

const modal1 = ref(false);
const modal2 = ref(false);
const modal3 = ref(false);
const form1 = ref(null);
const disabled = ref(false);
const limit = ref(8)

const app = createApp({
  components: {},
  setup() {

    const isMobile = () => screen.width <= 760;

    /* Form */

    onMounted(() => {
      register1.nombres = "";
      register1.nombres_acompanante = "";
      register1.type_documento = '';
      register1.documento = "";
      register1.documento_acompanante = "";
      register1.correo = "";
      register1.celular = "";
      register1.cuenta_bancaria = "";
      register1.tratamiento = false;
      register1.promociones = false;
      disabled.value = false;
    })

    const register1 = reactive({
      nombres: "",
      nombres_acompanante: "",
      type_documento: '',
      documento: "",
      documento_acompanante: "",
      correo: "",
      celular: "",
      cuenta_bancaria: "",
      tratamiento: false,
      promociones: false,
    });

    const rules1 = computed(() => {
      const documentoRules = {
        required,
        name_validation: {
          $validator: validateDocument,
        },
      };
      if (register1.type_documento === 'DNI' || register1.type_documento === 'CE') {
        documentoRules.numeric = numeric;
      } else {
        documentoRules.alphaNum = alphaNum;
      }
      return{
        nombres: {
          required,
          name_validation: {
            $validator: validName,
          },
        },
        nombres_acompanante: {
          required,
          name_validation: {
            $validator: validName,
          },
        },
        type_documento: {
          // required,
        },
        // documento: documentoRules,
        documento: {
          required,
          numeric,
          min: minLength(8),
        },
        documento_acompanante: {
          required,
          numeric,
          min: minLength(8),
        },
        celular: {
          required,
          numeric,
          name_validation: {
            $validator: validPhone,
          },
          min: minLength(9),
        },
        correo: {
          required,
          //email
          name_validation: {
            $validator: validEmail,
          },
        },
        tratamiento: {
          required(val) {
            return val;
          },
        },
        promociones: {
          /*required(val) {
            return val
          }*/
        },
      }
    });

    const lgthTypeDocument = computed(() => {
      switch (register1.type_documento) {
        case "DNI":
          return 8;
        case "RUC":
          return 11;
        case "Pasaporte":
          return 20;
        case "CE":
          return 20;
        case "":
          return 8;
      }
    })

    const v1$ = useVuelidate(rules1, {
      nombres: toRef(register1, "nombres"),
      nombres_acompanante: toRef(register1, "nombres_acompanante"),
      type_documento: toRef(register1, "type_documento"),
      documento: toRef(register1, "documento"),
      documento_acompanante: toRef(register1, "documento_acompanante"),
      correo: toRef(register1, "correo"),
      celular: toRef(register1, "celular"),
      cuenta_bancaria: toRef(register1, "cuenta_bancaria"),
      tratamiento: toRef(register1, "tratamiento"),
      promociones: toRef(register1, "promociones"),
    });

    
    const submitForm1 = () => {
      v1$.value.$touch();
      if (v1$.value.$invalid) return;
      disabled.value = true;
      document.getElementById("btnAction").classList.remove('active')
      grecaptcha.ready(function () {
        grecaptcha.execute('6Ld1_2caAAAAABG4EakA3PwvnyGjP2OLAn20_F9g', { action: 'homepage' }).then(function (token) {
          $('#token-HV').val(token);
          console.log(token, "TOKEN FROM CLARO TALKING");
          form1.value.submit();
          setTimeout(() => {
            console.log("After submitted!!")
            register1.nombres = "";
            register1.nombres_acompanante = "";
            register1.type_documento = '';
            register1.documento = "";
            register1.documento_acompanante = "";
            register1.correo = "";
            register1.celular = "";
            register1.tratamiento = false;
            register1.promociones = false;
            disabled.value = false;
            v1$.value.$reset();
          }, 1000)
        });
      });
    };

    return {
      register1,
      submitForm1,
      isNumber,
      isNumberKey,
      preventNonNumericInput,
      isAlphanumeric,
      isAlphanumericKey,
      preventNonAlphanumericInput,
      validName,
      onlyStrings,
      onlyStringsKey,
      form1,
      v1$,
      modal1,
      modal2,
      modal3,
      disabled,
      limit,
      lgthTypeDocument
    };
  },
});

const vm = app.mount("#app");

const modals = document.querySelectorAll('.portlet[data-portlet=bannerform] > .section > .section__modals')

const closesSub = document.querySelectorAll('.portlet[data-portlet=bannerform] > .section > .section__modals > .section__modals__modal > .section__modals__modal-close')

const closesBtn = document.querySelectorAll('.portlet[data-portlet=bannerform] > .section > .section__modals > .section__modals__modal > .section__modals__modal-footer > .section__modals__modal-footer-close')

const btnsOpen = document.querySelectorAll('.portlet[data-portlet=bannerform] > .section > .section__align > .content > .formBC > .formBC__main > dl > dd > .formBC__main-checkbox >.formBC__main-checkbox-text > .ctopen');

btnsOpen.forEach(function (e, i) {
  e.onclick = function () {
    modals[i].classList.add('active');
    console.log("CLICK")

    window.onclick = function (event) {
      if (event.target === modals[i]) {
        modals.forEach(e => e.classList.remove('active'));
      }
    };
  }
})
closesSub.forEach(function (e, _i) {
  e.onclick = function () {
    modals.forEach(e => e.classList.remove('active'));
  }
})
closesBtn.forEach(function (e, _i) {
  e.onclick = function () {
    modals.forEach(e => e.classList.remove('active'));
  }
})


const inputField = document.querySelector('.formBC__main-input--email');

const ase = new autoSuggestEmail(inputField, {
  domains:  ["gmail.com", "hotmail.com", "yahoo.com", "icloud.com", "outlook.com"],
  priority: ["gmail.com", "hotmail.com","outlook.com", "icloud.com", "yahoo.com"]
});


// Obtén una referencia al contenedor ul
const ulContainer = document.getElementById('asm-autolist');
if (ulContainer) {
  // Agrega un evento click al contenedor ul
  ulContainer.addEventListener('click', function(event) {
    if (event.target.tagName == 'LI') {
      const textLI = event.target.innerText
      vm.register1.correo = textLI;
    } else if (event.target.tagName == 'STRONG') {
      const textSTRONG = event.target.parentElement.innerText
      vm.register1.correo = textSTRONG
    }
  });
  document.querySelector(".formBC").addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      setTimeout(() => {
        const valueEmail = document.querySelector('.formBC__main-input--email').value
        vm.register1.correo = valueEmail
      }, 150);
    }
  });
}

document.querySelector("#origen-HV").value  = window.location.origin + window.location.pathname

/**
 * Habilita el modal de error si el parámetro de consulta especificado está presente en la URL.
 *
 * @param {HTMLElement} elParent - El elemento padre para insertar el modal.
 * @param {string} nameParam - El nombre del parámetro de consulta a verificar.
 * @param {object} data - Los datos del modal.
 * @return {void}
 */
const templateModalError = (data) => {
  return `
    <div class="section__modals" id="modalError"> 
      <div class="section__modals__modal" style="max-width: 660px;text-align:center">
        <div class="section__modals__modal-close"></div>
        <div class="section__modals__modal-main-image" style="width:100%;padding-top:40px"><img style="display:inline-block" src="${data.image}" alt="${data.title}" width="206" height="180"/></div>
        <hgroup class="section__modals__modal-group" style="padding-top:20px">
          <h4 class="section__modals__modal-group-title" style="color:#DA291C;margin-top:0px;text-align:center">${data.title}</h4>
        </hgroup>
        <div class="section__modals__modal-main"> 
          <p class="section__modals__modal-main-text" style="text-align:center">${data.description}</p>
        </div>
        <div class="section__modals__modal-footer"> 
          <button class="section__modals__modal-footer-close" style="width:180px;float:none;margin:0">${data.callToAction}</button>
        </div>
      </div>
    </div>
  `
}
const enabelModalError = (elParent, nameParam, data) => {
  const searchParams = new URLSearchParams(window.location.search)
  let dataByParams = "";
  if(searchParams.get(nameParam) == null) return;
  const params = JSON.parse(searchParams.get(nameParam))
  dataByParams = params
  // console.log(params);
  //show modal
  const templateModal = templateModalError(data)
  elParent.insertAdjacentHTML("afterbegin", templateModal)
  const modalError = document.querySelector('#modalError')
  const btnClose = modalError.querySelector('.section__modals__modal-close')
  const btnAction = modalError.querySelector('.section__modals__modal-footer-close')
  modalError.classList.add("active")
  btnClose.addEventListener('click', () => {
    modalError.classList.remove("active")
  })
  btnAction.addEventListener('click', () => {
    modalError.classList.remove("active")
  })
  return dataByParams
}
//Autocompletamos los campos segun los parametros (los campos dependerán del formulario)
const autoCompleteValues = (params) => {
  vm.register1.nombres = params.nombre_y_apellidos
  vm.register1.type_documento = params.tipo_de_documento
  vm.register1.type_service = params.tipo_de_servicio
  vm.register1.documento = params.numero_de_documento
  vm.register1.servicio = params.numero_de_servicio
  vm.register1.correo = params.correo_electronico
  vm.register1.cuenta_bancaria_code = params.numero_de_cuenta_bancaria_code
  vm.register1.cuenta_bancaria = params.numero_de_cuenta_bancaria_final
  vm.register1.monto = params.monto_maximo
  vm.register1.tratamiento = (params.acepto_terminos_y_condiciones == "Sí") ? true : false;
}

const dataModal = {
  title: "¡Vaya! Algo salió mal",
  description: "Por favor, intenta enviar nuevamente el formulario en unos minutos.",
  callToAction: "Volver a la página",
  image: "https://www.claro.com.pe/assets/havas/general/error_alert.png"
}
//declaramos el ID donde ser insertará el modal de error Recaptcha
const doomModalError = document.querySelector('.portlet[data-portlet=bannerform] .section')
// habilitamos el modal y retornamos los datos para autocompletar
const dataParams = enabelModalError(doomModalError, "parameters", dataModal);
if (typeof dataParams == "object") {
  //autocompletamos los campos
  console.log(dataParams)
  autoCompleteValues(dataParams)
}