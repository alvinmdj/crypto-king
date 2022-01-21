export const authErrorMessage = (err) => {
  let errorMessage
  if(err.code === 'auth/email-already-exists') {
    errorMessage = 'This email address already exist.'
  } else if(err.code === 'auth/network-request-failed') {
    errorMessage = 'No internet connection. Please check your internet connection.'
  } else if(err.code === 'auth/invalid-email') {
    errorMessage = 'Please provide a valid email address.'
  } else if(err.code === 'auth/invalid-password') {
    errorMessage = 'Password must be at least six characters long.'
  } else if(err.code === 'auth/weak-password') {
    errorMessage = 'Password must be at least six characters long.'
  } else if(err.code === 'auth/wrong-password') {
    errorMessage = 'Invalid credentials.'
  } else if(err.code === 'auth/too-many-requests') {
    errorMessage = 'Access to this account has been temporarily disabled due to many failed login attempts. Please try again later.'
  } else {
    errorMessage = err.message
  }
  return errorMessage
}