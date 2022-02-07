
export const isUserLoggedIn = () => {
  return localStorage.getItem('userData'); // && localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
}

export const getUserData = () => JSON.parse(localStorage.getItem('userData'))


export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === 'estudent') return '/dashboard/estudiante'
  if (userRole === 'secretary') return '/dashboard/secretaria'
  if (userRole === 'teacher') return '/dashboard/profesor'
  if (userRole === 'admin') return '/dashboard/administrador'
  if (userRole === 'User') return '/dashboard/estudiante'
  if (userRole === 'client') return { name: 'access-control' }
  return { name: 'auth-login' }
}
