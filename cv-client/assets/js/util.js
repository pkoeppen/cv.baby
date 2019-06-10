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
    description: null,
    skills: [],
    employment: [],
    education: [],
    references: [],
    hobbies: [],
    social: []
  };
}
