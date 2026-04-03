export const getWeatherIcon = (code: number): string => {
  if (code === 0)                         return '/images/icon-sunny.webp'
  if (code <= 2)                          return '/images/icon-partly-cloudy.webp'
  if (code === 3)                         return '/images/icon-overcast.webp'
  if (code <= 48)                         return '/images/icon-fog.webp'
  if (code <= 55)                         return '/images/icon-drizzle.webp'
  if (code <= 67)                         return '/images/icon-rain.webp'
  if (code <= 77)                         return '/images/icon-snow.webp'
  if (code <= 82)                         return '/images/icon-rain.webp'
  if (code <= 86)                         return '/images/icon-snow.webp'
  return '/images/weather/stormy.webp'    
}