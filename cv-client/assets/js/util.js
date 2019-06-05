export function getDefaultResume() {
  return {
    index: -1,
    draft: false,
    // Database fields.
    alias: null,
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
