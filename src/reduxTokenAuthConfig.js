import { generateAuthActions } from 'redux-token-auth'

const config = {
  authUrl: "https://glocal-news.herokuapp.com/api/v1/auth",
  userAttributes: {
    uid: 'uid',
    id: 'id'
  },
  userRegistrationAttributes: {
    password_confirmation: 'password_confirmation'
  },
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
}
