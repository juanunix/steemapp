const thousandUnit = 'k'

export const abbreviateNumber = count => {
  return count >= 1000 ? (count / 1000).toFixed(1) + thousandUnit : count
}
