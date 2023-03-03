const formatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

export function mapCondition(condition?: string) {
  switch (condition) {
    case 'new':
      return 'Nuevo';
    case 'used':
      return 'Usado';
    default:
      return condition || '';
  }
}

export function formatPrice(price?: number) {
  return formatter.format(price ?? 0);
}