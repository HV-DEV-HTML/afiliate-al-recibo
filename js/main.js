const {
  createApp,
  ref,
  reactive,
  toRef,
  computed,
  onMounted
} = Vue;
const { required, minLength, maxLength, numeric } =
  VuelidateValidators;
const { useVuelidate } = Vuelidate;



const isNumber = (evt) => {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    evt.preventDefault();
  } else {
    return true;
  }
}
const validName = (name) => {
  let validNamePattern = new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+(?:[-'\\s][a-zA-ZñÑáéíóúÁÉÍÓÚ]+)*$");
  if (validNamePattern.test(name)) {
    // console.log("validName",name)
    return true;
  }
  return false;
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
    if (value.split("").length === 12) {
      return true;
    } else {
      return false;
    }
  }

  if (kind.type_documento.value === "CE") {
    if (value.split("").length === 12) {
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
      register1.type_documento = '';
      register1.documento = "";
      register1.correo = "";
      register1.celular = "";
      register1.tratamiento = false;
      register1.promociones = false;
      disabled.value = false;
    })

    const register1 = reactive({
      nombres: "",
      type_documento: '',
      documento: "",
      correo: "",
      celular: "",
      tratamiento: false,
      promociones: false,
    });

    const rules1 = {
      nombres: {
        required,
        name_validation: {
          $validator: validName,
        },
      },
      type_documento: {
        required,
      },
      documento: {
        required,
        numeric,
        name_validation: {
          $validator: validateDocument
        }
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
    };

    const lgthTypeDocument = computed(() => {
      switch (register1.type_documento) {
        case "DNI":
          return 8;
        case "RUC":
          return 11;
        case "Pasaporte":
          return 12;
        case "CE":
          return 12;
        case "":
          return 0;
      }
    })

    const v1$ = useVuelidate(rules1, {
      nombres: toRef(register1, "nombres"),
      type_documento: toRef(register1, "type_documento"),
      documento: toRef(register1, "documento"),
      correo: toRef(register1, "correo"),
      celular: toRef(register1, "celular"),
      tratamiento: toRef(register1, "tratamiento"),
      promociones: toRef(register1, "promociones"),
    });


    const submitForm1 = () => {
      v1$.value.$touch();

      if (v1$.value.$invalid) return;
      disabled.value = true;
      document.getElementById("btnAction").classList.remove('active')

      form1.value.submit();

      setTimeout(() => {
        register1.nombres = "";
        register1.type_documento = '';
        register1.documento = "";
        register1.correo = "";
        register1.celular = "";
        register1.tratamiento = false;
        register1.promociones = false;
        disabled.value = false;
      }, 3000)
    };

    return {
      register1,
      submitForm1,
      isNumber,
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

app.mount("#app");

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


