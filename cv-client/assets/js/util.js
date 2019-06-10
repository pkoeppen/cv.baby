export function getDefaultResume() {
  return {
    index: -1,
    draft: false,
    resumeImageSource:
      'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
    // Database fields.
    alias: null,
    slug: null,
    name: null,
    title: null,
    email: null,
    phone: null,
    website: null,
    profile: null,
    description: null,
    skills: [],
    employment: [],
    education: [],
    references: [],
    hobbies: [],
    social: []
  };
}
