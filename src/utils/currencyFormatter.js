export const currencyFormatter = (nominal) => {
  return nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}