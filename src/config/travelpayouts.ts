export const travelpayoutsConfig = {
  // Your Travelpayouts Partner Marker ID (shmarker) for affiliate link attribution
  marker: '550267',
  
  // Default search configuration
  defaultOrigin: 'DEL',
  defaultDestination: 'SGN',
};

export const flightApiConfig = {
  // Your Kiwi Tequila API key. Get a free key at https://tequila.kiwi.com/
  // Leave empty to use the realistic simulated flights fallback.
  kiwiApiKey: '',
  
  // Set to false if you only want to use live API results (and show errors if API key is missing)
  useMockFallback: true,
};
