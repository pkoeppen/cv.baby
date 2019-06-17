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
    color: 'blue',
    live: true,
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
    color: 'blue',
    live: true,
    name: 'Joe Example',
    title: 'Full Stack Developer',
    email: 'example@cv.baby',
    phone: '+1 (888) 830 6043',
    website: 'https://cv.baby',
    profile:
      "Tired of searching for resume ideas? We're here to help. cvbaby is an out-of-the-box resume creation and hosting service for the twenty-first century. Draft, save, and share multiple resumes, all in one place!",
    skills: [
      'Node.js',
      'Nuxt',
      'AWS Lambda',
      'NGINX',
      'Docker',
      'SCSS',
      'Photoshop',
      'After Effects'
    ],
    employment: [
      {
        dateFrom: '01/01/2019',
        dateTo: null,
        title: 'Full Stack Developer',
        company: 'Macrosoft Corporation',
        description:
          "Instead of wrestling with Word templates and overpriced resume builders, make things simple and let us host your resumes for you. For just $3 per month, you'll get access to a personalized suite of creation, analytics, and export tools to help you land that job."
      },
      {
        dateFrom: '04/28/2015',
        dateTo: '12/31/2018',
        title: 'UI/UX Designer',
        company: 'Orange Inc.',
        description:
          'Stay competitive with multiple resumes for multiple employers. Tailor each resume to target the employer you want to impress. Create and host up to twenty custom resumes for maximum personalization!'
      },
      {
        dateFrom: '07/25/2014',
        dateTo: '04/27/2015',
        title: 'Software Engineering Intern',
        company: 'Fells Wargo & Company',
        description:
          'Track visiting statistics for each of your resume pages to see when your resume is viewed, by whom, and from where. Done with the job search? Take resumes on- and offline with the simple flip of a switch.'
      }
    ],
    education: [
      {
        dateFrom: '09/01/2011',
        dateTo: '05/31/2014',
        university: 'Harvard University',
        degree: 'MS Computer Science',
        description:
          'Want to send your resume the old-fashioned way (as an attachment) or print it out by hand? Allow employer downloads and export your resumes as PDF files instantly with the quick click of a button.'
      },
      {
        dateFrom: '09/01/2007',
        dateTo: '06/01/2011',
        university: 'Northwestern University',
        degree: 'BA Telecommunications',
        description:
          'Enjoy all of the above in a completely ad-free environment: We believe in a premium, no-ad service, or no service at all. We take pride in our streamlined user experience and cleanly site design. No ads allowed!'
      }
    ],
    references: [
      {
        name: 'George Washington',
        title: 'President',
        company: 'United States',
        yearsKnown: '242',
        phone: '1-800-AMERICA',
        email: 'example@cv.baby'
      },
      {
        name: 'Benjamin Franklin',
        title: 'Polymath',
        company: 'Enlightenment',
        yearsKnown: '228',
        phone: '1-800-LIGHTNING',
        email: 'example@cv.baby'
      },
      {
        name: 'Theodore Roosevelt',
        title: 'Outdoorsman',
        company: 'Great Outdoors',
        yearsKnown: '99',
        phone: '1-800-GRIZZLIES',
        email: 'example@cv.baby'
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
