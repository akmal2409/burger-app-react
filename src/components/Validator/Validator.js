export const checkValidity = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.digits) {
    isValid = (value.match(/\d+/) ? true : false) && isValid;
  }

  if (rules.email) {
    isValid = (value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? true : false) && isValid;
  }

  return isValid; 
}