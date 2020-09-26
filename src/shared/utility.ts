import { Validation } from "types/IInputElement"

export const updateObject = (oldObject: any, updatedProperties: any) : any => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const checkValidty = (value: string, rules: Validation | undefined) : boolean => {
  let isValid = true

  if (!rules) {
    return true
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid
  }

  if (rules.minLength) {
    isValid = value.trim().length >= rules.minLength && isValid
  }

  if (rules.maxLength) {
    isValid = value.trim().length <= rules.maxLength && isValid
  }

  if (rules.isEmail) {
    // const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
    isValid = emailRegex.test(value) && isValid
  }

   return isValid
}