export const formatCurrency = (nominal) => {
  return nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}