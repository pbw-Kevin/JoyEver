export default {
  site: {
    title: 'JoyEver',
  },
  lang: {
    title: 'Language',
    name: 'English (US)',
    followSystem: 'Follow System',
  },
  developing: {
    title: 'Developing.',
  },
  user: {
    title: 'User',
    tags: {
      user: 'User',
      admin: 'Admin',
      superAdmin: 'Super Admin',
      siteOwner: 'Site Owner',
      banned: 'Banned',
    },
  },
  hint: {
    title: 'Do you know that...',
  },
  announcement: {
    title: 'Announcement',
    tags: {
      official: 'Official',
    },
    new: {
      title: 'New Announcement',
    },
    no: {
      title: 'No Announcements',
    },
  },
  message: {
    title: 'Message',
    tips: {
      chatDisabledBeforeLogin: 'Chatting is disabled before login!',
    },
  },
  chat: {
    title: 'Chat',
    titleInTopAppBar: 'Chat: {user}',
    message: {
      no: {
        title: 'No Messages',
      },
    },
    operation: {
      send: 'Send Message',
    },
  },
  search: {
    title: 'Search',
  },
  menu: {
    title: 'Menu',
  },
  home: {
    title: 'Home',
    disc: 'Welcome to JoyEver!',
    options: {
      title: 'You can:',
      startGame: {
        pre: '',
        title: 'Start a Game',
        suf: ' immediately',
      },
      viewWiki: {
        pre: 'View ',
        title: 'Online Wiki',
        suf: '',
      },
      login: {
        title: 'Login',
        disc: '(Recommended, history and chat will be available after login)',
      },
    },
  },
  game: {
    title: 'Game',
    room: {
      title: 'Room',
      titleInTopAppBar: 'Room: {room}',
      list: {
        title: 'Room List',
      },
    },
    history: {
      title: 'Game History',
      my: {
        title: 'My Game History',
      },
    },
  },
  wiki: {
    title: 'Wiki',
    home: {
      title: 'You can visit:',
      test: {
        pre: 'If you are confused with the wiki, just try in the ',
        suf: '.',
      },
    },
    online: {
      title: 'Online Wiki',
    },
    docx: {
      title: 'Wiki Docx',
      visitOnline: {
        title: 'Visit Online Wiki in Docx Format',
        disc: 'Link:',
      },
      about: {
        title: 'About',
        disc: "Made by {'@'}syq.",
      },
    },
    test: {
      title: 'Test',
    },
  },
  account: {
    title: 'Account',
    operation: {
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      resetPassword: 'Reset Password',
      emailVerify: 'Email Verification',
    },
    my: {
      title: 'My Account',
    },
    view: {
      visitor: 'Visitor View',
      my: 'Personal View',
    },
    email: {
      title: 'Email',
    },
    login: {
      title: 'Login',
      usernameEmail: {
        title: 'Username（Email）',
      },
      password: {
        title: 'Password',
      },
      tips: {
        noAccount: 'No account? ',
        forgotPassword: 'Forgot the password? ',
      },
      message: {
        success: 'Successfully logged in!',
        emptyUsernameEmail: 'Username (Email) should not be empty.',
        invalidUsernameEmail:
          'Username (Email) is not formatted. The length of username should be between 2 and 16(include), only contains A-Za-z0-9_(underline), and begins with A-Za-z.',
        emptyPassword: 'Password should not be empty.',
        invalidPassword:
          'Password is not formatted. The length of password should be at least 8, and does not contain empty chars.',
        unverifiedEmail:
          'Email is not verified. Verify your email to get safer experience. Go to Setting to verify.',
        cannotFindEmailUser: 'A user with the specified email was not found.',
        mismatchUsernamePassword: 'The username and password mismatch.',
        cannotFindUser: 'Could not find user.',
        unknownError:
          'Failed to login. Error code: {code}。Error message: {message}。If neccesary, contact the admin.',
      },
    },
    logout: {
      title: 'Logout',
      message: {
        success: 'Successfully logged out!',
      },
    },
    register: {
      title: 'Register',
      username: {
        title: 'Username',
      },
      password: {
        title: 'Password',
      },
      ensurePassword: {
        title: 'Ensure Password',
      },
      email: {
        title: 'Email (Optional)',
      },
      message: {
        success: 'Successfully registered!',
        alreadyHaveAccount: 'Already have an account? ',
        emptyUsername: 'Username should not be empty.',
        invalidUsername:
          'Username is not formatted. The length of username should be between 2 and 16(include), only contains A-Za-z0-9_(underline), and begins with A-Za-z.',
        usernameWithEmailFormat:
          'Username is not formatted. Username should not be in email format.',
        emptyPassword: 'Password should not be empty.',
        invalidPassword:
          'Password is not formatted. The length of password should be at least 8, and does not contain empty chars.',
        differentPassword: 'The two passwords are different.',
        invalidEmail: 'Email is not formatted.',
        unverifiedEmail: 'Email is not verified. Please check the verify email in your inbox.',
        usernameUsed: 'Username is already used.',
        emailUsed: 'Email is already used.',
        createObjectsError:
          'Registration completed, but an error occurred while creating necessary objects related to the account. You can now log in and use it normally, but there may be some potential functional issues. If necessary, contact the admin for help.',
        failedRegister:
          'Failed to register. Error code: {code}. Error message: {message}. If necessary, contact the admin.',
      },
    },
    preResetPassword: {
      title: 'Reset Password',
      disc: 'Please enter your email to reset your password.<br />A reset link will be sent to your email inbox.',
      email: {
        title: 'Email',
      },
      operation: {
        send: 'Send Reset Link',
      },
      message: {
        success: 'Reset link sent. Please check your email inbox.',
        emptyEmail: 'Please enter your email address.',
        invalidEmail: 'Please enter a valid email address.',
        cannotFindEmailUser: 'A user with the specified email is not found.',
        unknownError:
          'An error occured. Code: {code}. Message: {message}. If necessary, contact the admin.',
      },
    },
    resetPassword: {
      title: 'Reset Password',
      password: {
        title: 'Password',
      },
      ensurePassword: {
        title: 'Ensure Password',
      },
      message: {
        success: 'Password reset successfully! Please login again.',
        emptyPassword: 'Password should not be empty.',
        differentPassword: 'The two passwords are different.',
        invalidPassword:
          'Password is not formatted. The length of password should be at least 8, and does not contain empty chars.',
        expiredToken: 'The reset token has expired or is invalid.',
        failedConnectServer: 'Failed to connect to server. Please check your network connection.',
        emptyToken: 'Missed Token.',
      },
    },
    emailVerify: {
      title: 'Email Verification',
      message: {
        success: 'Email verified successfully! Please login again.',
        failed: 'Verification failed.',
        error: 'Error: {errorInfo}',
        expiredToken: 'The verification token has expired or is invalid.',
        failedConnectServer: 'Failed to connect to server. Please check your network connection.',
        emptyToken: 'Missed Token.',
      },
    },
    requireLogin: {
      message: 'Please login first!',
    },
  },
  setting: {
    title: 'Setting',
    operation: {
      save: 'Save',
    },
    message: {
      failedAutoSave:
        'A problem occured while auto saving settings. Please check your network connection.',
      failedSave: 'A problem occured while saving.',
      saved: 'Settings saved!',
      incorrectEmailFormat: 'Incorrect email format.',
      emailSaved: 'Email saved. Check your inbox to verify email.',
      emailUsed: 'Email is already used. Please try another email.',
      failedEmailSave: 'A problem occured while saving email.',
      emailPublicChanged: 'Email privacy setting updated!',
      failedChangeEmailPublic: 'A problem occured while updating email privacy setting.',
      emptyPassword: 'Please enter a password.',
      incorrectPasswordFormat:
        'Password is not formatted. The length of password should be at least 8, and does not contain empty chars.',
      differentPassword: 'The two passwords are different.',
      failedLoadBackgroundImage:
        'Failed to load background image. It may be a cross-origin issue or the image does not exist.',
    },
    global: {
      title: 'Global',
      username: {
        title: 'Username',
      },
      nickname: {
        title: 'Nickname',
      },
      email: {
        title: 'Email',
        operation: {
          verify: 'Verify Email',
          save: 'Save Email',
          madePublic: 'Make Email Public',
        },
        verify: {
          title: 'Verify Email',
          disc: 'If your email is unverified, please click the button below to get a verification email.',
          status: 'Email Status: {status}',
          unverified: 'Unverified ❌',
          verified: 'Verified ✔',
          message: {
            clicked: 'Verification link clicked. Please check your email inbox.',
            failed: 'Failed to send verification email.',
          },
        },
      },
    },
    security: {
      title: 'Security',
      password: {
        title: 'Password',
        change: {
          title: 'Change Password',
        },
        new: {
          title: 'New Password',
        },
        ensureNew: {
          title: 'Ensure New Password',
        },
        operation: {
          change: 'Change Password',
        },
        message: {
          changed: 'Password changed. Please login again.',
        },
      },
    },
    game: {
      title: 'Game',
      madeHistoryPublic: {
        title: 'Make History Public',
      },
      autoDisableUnavailableSkill: {
        title: 'Auto Disable Unavailable Skill',
      },
      customSkill: {
        title: 'Custom Skill',
        disc: 'Custom skills will be automatically judged as breaking to shield.',
      },
    },
    appearance: {
      title: 'Appearance',
      theme: {
        title: 'Theme',
        message: {
          failedSave: 'Failed to save. {savingErrorInfo}',
        },
        select: {
          title: 'Select Theme',
        },
        type: {
          title: 'Theme Type',
          general: 'System Theme',
          custom: 'Custom Theme',
        },
        applied: {
          title: 'Applied ✔',
        },
        name: {
          title: 'Theme Name',
        },
        lightDark: {
          title: 'Light / Dark Mode',
          light: 'Light',
          dark: 'Dark',
          auto: 'Follow System',
        },
        backgroundImage: {
          title: 'Background Image URL',
        },
        colorScheme: {
          title: 'Color Scheme: ',
          getColorFromImage: 'Get Color from Image',
          error: 'Failed to get color. Error: {colorErrorInfo}',
        },
        opacity: {
          backgroundImage: 'Background Image Opacity: ',
          sidebar: 'Sidebar Opacity: ',
        },
        operation: {
          apply: 'Apply this Theme',
          delete: 'Delete Theme',
          save: 'Save Theme',
          saveAs: 'Save as New Theme',
        },
      },
    },
  },
  admin: {
    title: 'Admin',
  },
  ticket: {
    title: 'Ticket',
    new: {
      title: 'New Ticket',
    },
  },
  changelog: {
    title: 'Changelog',
  },
  about: {
    title: 'About',
  },
}
