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
        disc: 'Made by @syq.',
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
      emailSaved: 'Email saved.',
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
      title: 'Global Setting',
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
        status: {
          title: 'Email Status: {status}',
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
      title: 'Game Setting',
      madeHistoryPublic: {
        title: 'Make History Public',
      },
      autoDisableUnavailableSkill: {
        title: 'Auto Disable Unavailable Skill',
      },
      customSkill: {
        title: 'Custom Skill',
        disc: 'Custom skills will be automatically judged as breaking into shield.',
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
