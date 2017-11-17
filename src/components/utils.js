export const notEmpty = (l) => l.filter((i) => !!i)

export const formatAddress = (address, separator) => {
  const lines = [
    formatFirstLine(address),
    formatSecondLine(address)
  ]
  return notEmpty(lines).join(separator)
}

export const formatFirstLine = (address) => {
  return address.street || ''
}

export const formatSecondLine = (address) => {
  return notEmpty([address.city, address.state, address.zipCode]).join(', ')
}

const padStart = (n) => {
  return ('0' + n).slice(-2)
}

export const formatDate = (date) => {
  const dateObj = new Date(date)
  if (!isNaN(dateObj.getDate())) {
    dateObj.setMinutes(dateObj.getTimezoneOffset())
    return `${padStart(dateObj.getDate())}/${padStart(dateObj.getMonth() + 1)}/${dateObj.getFullYear()}`
  } else {
    return ''
  }
}
