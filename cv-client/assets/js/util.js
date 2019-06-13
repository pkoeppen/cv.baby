export function getDefaultResume() {
  return {
    // UI fields.
    index: -1,
    draft: false,
    resumeImageSource: require('~/assets/images/avatarPlaceholder.png'),
    // Database fields.
    resumeID: null,
    alias: null,
    slug: null,
    name: null,
    title: null,
    email: null,
    phone: null,
    website: null,
    profile: null,
    skills: [],
    employment: [],
    education: [],
    references: [],
    hobbies: [],
    social: []
  };
}

export function getDemoResume() {
  return {
    name: 'Joe Example',
    title: 'Full Stack Developer',
    email: 'example@cv.baby',
    phone: '+1 (888) 830 6043',
    website: 'https://cv.baby',
    profile:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    skills: [
      'Node.js',
      'Nuxt',
      'AWS Lambda',
      'NGINX',
      'Docker',
      'SCSS',
      'Photoshop',
      'crossbow'
    ],
    employment: [
      {
        dateFrom: '01/01/2019',
        dateTo: null,
        title: 'President',
        company: 'United States',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        dateFrom: '04/28/2015',
        dateTo: '12/31/2018',
        title: 'Portrait',
        company: 'Dollar Bill',
        description:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        dateFrom: '07/25/2009',
        dateTo: '04/27/2015',
        title: 'CEO',
        company: 'Space X',
        description:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    ],
    education: [
      {
        dateFrom: '09/01/2006',
        dateTo: '05/31/2009',
        university: 'Duke University',
        degree: 'BS Badassery',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        dateFrom: '09/01/2002',
        dateTo: '06/01/2006',
        university: 'Indiana University',
        degree: 'BA English',
        description:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    ],
    references: [
      {
        name: 'George Washington',
        title: 'President',
        company: 'United States',
        yearsKnown: '242',
        phone: '1-800-AMERICA',
        email: 'george@usa.gov'
      },
      {
        name: 'Benjamin Franklin',
        title: 'Polymath',
        company: 'American Enlightenment',
        yearsKnown: '228',
        phone: '1-800-LIGHTNING',
        email: 'ben@franklin.com'
      },
      {
        name: 'Theodore Roosevelt',
        title: 'Hunter',
        company: 'Great Outdoors',
        yearsKnown: '99',
        phone: '1-800-GRIZZLIES',
        email: 'teddy@bear.com'
      }
    ],
    hobbies: [
      {
        icon: '002-bowling',
        title: 'Sports',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        icon: '017-airplane',
        title: 'Flying',
        description:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        icon: '031-headphone',
        title: 'Music',
        description:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    ],
    social: [{ title: 'Facebook', link: 'facebook.com/foobar' }]
  };
}
