const objectLength = (object) => {
  var length = 0;
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      ++length;
    }
  }
  return length;
}

const isNumber = (evt) => {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    evt.preventDefault();
  } else {
    return true;
  }
}

const isString = (evt) => {
  var charCode = (evt.which) ? evt.which : window.event.keyCode;

  if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 241 || charCode == 209) {
    console.log("true");
    return true;
  }
  else {
    evt.preventDefault();
  }
}

const updateQueryStringParameter = (key, value) => {
  const uri = window.location.href;
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    const newurl = uri.replace(re, "$1" + key + "=" + value + "$2");
    window.history.pushState({ path: newurl }, "", newurl);
  } else {
    const newurl = uri + separator + key + "=" + value;
    window.history.pushState({ path: newurl }, "", newurl);
  }
}

const getQueryParam = (key) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params[key];
}

const generateRecaptcha = (recaptcha) => {

  grecaptcha.ready(function () {
    grecaptcha.execute('6Ld1_2caAAAAABG4EakA3PwvnyGjP2OLAn20_F9g', {
      action: 'homepage'
    }).then(function (token) {
      //document.getElementById('g-recaptcha-response-max_59').value=token;
      recaptcha.value = token;
      //console.log("token", token)
    });
  });

}

export { generateRecaptcha, updateQueryStringParameter, getQueryParam, isNumber, isString, objectLength }