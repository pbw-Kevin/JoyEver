/*
  Asset for providing unified error message of JoyEver
*/

var errors = [
  {
    code: 0,
    message: 'Success!',
  },
  {
    code: 2,
    message:
      'Username is not formatted. The length of username should be between 2 and 16(include), only contains A-Za-z0-9_(underline), and begins with A-Za-z.',
  },
  {
    code: 3,
    message:
      'Password is not formatted. The length of password should be at least 8, and does not contain empty chars.',
  },
  {
    code: 11,
    message: 'Username should not be like an email.',
  },
  {
    code: 12,
    message: 'Passwords do not match.',
  },
  {
    code: 13,
    message: 'Not a valid email.',
  },
  {
    code: 15,
    message: 'Registered successfully, but error occured while creating account-related objects.',
  },
]

export function getError(code: number) {
  return (
    errors.find((error) => {
      return error.code == code
    }) || { code: -1, message: 'Non-exist error.' }
  )
}
