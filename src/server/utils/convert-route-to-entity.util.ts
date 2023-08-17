const mapping: Record<string, string> = {
  cars: 'car',
  flights: 'flight',
  hotels: 'hotel',
  offers: 'offer',
  startups: 'startup',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
