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
  // console.log(kind.type_documento.value)
  if (kind.type_documento.value === "DNI") {
    if (value.split("").length === 8) {
      return true;
    } else {
      return false;
    }
  }

  if (kind.type_documento.value == "Pasaporte") {
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
const validateService = (value, kind) => {
  if (kind.type_service.value === "Linea-movil") {
    if (value.split("").length >= 9 & validPhone(value)) {
      return true;
    } else {
      return false;
    }
  }
  if (kind.type_service.value === "Linea-fija") {
    if (value.split("").length >= 8 ) {
      return true;
    } else {
      return false;
    }
  }
  if (kind.type_service.value === "Codigo-de-servicio") {
    if (value.split("").length >= 6 ) {
      return true;
    } else {
      return false;
    }
  }
}

const changeTypeServices = (event) =>{
  const modalTypeService = document.querySelector('.portlet[data-portlet=bannerform] > .section > #modalTypeService')
  if (event.target.value == 'Linea-fija') {
    modalTypeService.classList.add("active")
  }
}

const openModalBBVA = (event) => {
  const modalBBVA = document.querySelector('.portlet[data-portlet=bannerform] > .section > #modalBBVA')
  if (!modalBBVA.classList.contains("opened")) {
    modalBBVA.classList.add("opened")
    modalBBVA.classList.add("active")
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
      register1.type_documento = '';
      register1.type_service = '';
      register1.documento = "";
      register1.servicio = "";
      register1.correo = "";
      register1.celular = "";
      register1.cuenta_bancaria_code = "";
      register1.cuenta_bancaria = "";
      register1.tratamiento = false;
      register1.promociones = false;
      disabled.value = false;
    })

    const register1 = reactive({
      nombres: "",
      type_documento: '',
      type_service: '',
      documento: "",
      servicio: "",
      correo: "",
      celular: "",
      cuenta_bancaria_code: "",
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
      const servicesRules = {
        required,
        name_validation: {
          $validator: validateService,
        },
      };
      
      if (register1.type_service === 'Linea-movil' || register1.type_service === 'Linea-fija') {
        servicesRules.numeric = numeric;
      } else {
        servicesRules.alphaNum = alphaNum;
      }

      return {
        nombres: {
          required,
          name_validation: {
            $validator: validName,
          },
        },
        type_documento: {
          required,
        },
        type_service: {
          required,
        },
        documento: documentoRules,
        servicio: servicesRules,
        cuenta_bancaria_code: {
          required,
          numeric,
          min: minLength(4),
        },
        cuenta_bancaria: {
          required,
          numeric,
          min: minLength(9),
        },
        correo: {
          required,
          name_validation: {
            $validator: validEmail,
          },
        },
        tratamiento: {
          required(val) {
            return val;
          },
        },

      };
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
          return 0;
      }
    })
    const lengthTypeService = computed(() => {
      switch (register1.type_service) {
        case "Linea-movil":
          return 9;
        case "Linea-fija":
          return 9;
        case "Codigo-de-servicio":
          return 14;
        case "":
          return 0;
      }
    });

    const v1$ = useVuelidate(rules1, {
      nombres: toRef(register1, "nombres"),
      type_documento: toRef(register1, "type_documento"),
      type_service: toRef(register1, "type_service"),
      documento: toRef(register1, "documento"),
      servicio: toRef(register1, "servicio"),
      correo: toRef(register1, "correo"),
      celular: toRef(register1, "celular"),
      cuenta_bancaria_code: toRef(register1, "cuenta_bancaria_code"),
      cuenta_bancaria: toRef(register1, "cuenta_bancaria"),
      tratamiento: toRef(register1, "tratamiento"),
      promociones: toRef(register1, "promociones"),
    });

    
    const submitForm1 = () => {
      v1$.value.$touch();

      if (v1$.value.$invalid) return;
      disabled.value = true;
      const inputCuenta = document.querySelector(".formBC__main-input[name='numero_de_cuenta_bancaria']")
      inputCuenta.value = '0011' + register1.cuenta_bancaria_code + register1.cuenta_bancaria
      document.getElementById("btnAction").classList.remove('active')

      form1.value.submit();

      setTimeout(() => {
        register1.nombres = "";
        register1.type_documento = '';
        register1.type_service = '';
        register1.documento = "";
        register1.servicio = "";
        register1.correo = "";
        register1.celular = "";
        register1.cuenta_bancaria_code = "";
        register1.cuenta_bancaria = "";
        register1.tratamiento = false;
        register1.promociones = false;
        disabled.value = false;
        v1$.value.$reset();
        document.querySelector(".formBC__main-input[name='monto_maximo']").value = "";
      }, 1000)
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
      validPhone,
      changeTypeServices,
      openModalBBVA,
      form1,
      v1$,
      modal1,
      modal2,
      modal3,
      disabled,
      limit,
      lgthTypeDocument,
      lengthTypeService,
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