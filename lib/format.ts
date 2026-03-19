export function formatCurrency(value: number): string {
  const [whole, decimal] = value.toFixed(2).split('.')
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `$${withCommas}.${decimal}`
}

export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function truncateAddress(address: string, start = 8, end = 4): string {
  if (address.length <= start + end + 3) return address
  return `${address.slice(0, start)}...${address.slice(-end)}`
}
