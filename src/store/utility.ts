export const updateObject = (oldObject: any, updatedProperties: any) : any => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}