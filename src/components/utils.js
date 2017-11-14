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
