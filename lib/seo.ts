// lib/seo.js

export const defaultMeta = {
    title: 'Your Application Name',
    description: 'An innovative application to enhance your experience.',
    keywords: 'app, nextjs, innovation',
    author: 'Your Company Name',
    robots: 'index, follow',
  };
  
  export const getMeta = (overrides = {}) => {
    return { ...defaultMeta, ...overrides };
  };
  