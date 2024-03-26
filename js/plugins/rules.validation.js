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

const validName = (name) => {
  let validNamePattern = new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+(?:[-'\\s][a-zA-ZñÑáéíóúÁÉÍÓÚ]+)*$");
  if (validNamePattern.test(name)) {
    // console.log("validName",name)
    return true;
  }
  return false;
}

const validString = (name) => {
  let validNamePattern = new RegExp("/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/");
  if (validNamePattern.test(name)) {
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

export { validPhone, validName, validString, validEmail }