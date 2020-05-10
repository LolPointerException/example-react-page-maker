
export const elements = {
  TEXTBOX: 'TEXTBOX',
  SLIDER: 'SLIDER',
  HEADER: 'HEADER',
  DROPDOWN: 'DROPDOWN',
  GRID_LAYOUT_3_3: 'GRID_LAYOUT_3_3',
  GRID_LAYOUT_1_2: 'GRID_LAYOUT_1_2',
  HEADING: 'HEADING',
};


export const exampleResume = {
  name: 'Jane Q. Programmer',
  meta: {
    format: 'FRESH@0.6.0',
    version: '0.1.0',
  },
  info: {
    label: 'Senior Developer',
    'class': 'Programmer',
    image: 'jane_doe.png',
    brief: '**Imaginary full-stack software developer with 6+ years industry experience** specializing in cloud-driven web applications and middleware. A native of southern CA, Jane enjoys hiking, mystery novels, and the company of Rufus, her two year old beagle.\n',
    quote: 'Be the change you want to see in the world.',
  },
  disposition: {
    travel: 0,
    authorization: 'VISA',
    commitment: [
      'permanent',
    ],
    remote: true,
    relocation: {
      destinations: [
        'America',
      ],
    },
  },
  contact: {
    email: 'jdoe@onecoolstartup.io',
    phone: '1-650-999-7777',
    website: 'http://janesblog.com/blog',
    other: [
      {
        label: 'Home Phone',
        category: 'phone',
        value: '1-650-999-4321',
      },
    ],
  },
  location: {
    address: 'Jane Q. Programmer\n123 Somewhere Rd.\nMountain View, CA 94035',
    code: '94035',
    city: 'Mountain View',
    country: 'US',
    region: 'CA',
  },
  employment: {
    summary: '7+ years industry IT and software development experience.',
    history: [
      {
        employer: 'Area 52',
        position: 'Head Code Ninja',
        url: 'https://area52.io/does-not-exist',
        start: '2013-09-01',
        end: '2020-04-19',
        summary: '"Development team manager for [**Quantum Diorama**](https://en.wikipedia.org/wiki/Vaporware), a distributed molecular modeling and analysis suite for Linux and OS X.""\n',
        highlights: [
          'Managed a 5-person development team',
        ],
        location: 'Mountain View, CA',
        keywords: [
          'Agile',
        ],
      },
    ],
  },
  projects: [
    {
      title: 'HackMyResume',
      category: 'FOSS',
      description: 'A resume authoring and analysis tool for OS X, Linux, and Windows.',
      summary: 'Exemplar user for HackMyResume and FluentCV!',
      role: 'Contributor',
      url: 'http://please.hackmyresume.com',
      media: [
        {
          category: 'download',
          name: 'Download HackMyResume',
          url: 'https://www.npmjs.com/package/hackmyresume',
        },
      ],
      repo: 'https://github.com/hacksalot/hackmyresume',
      start: '2015-09-01',
      end: '2020-04-19',
      highlights: [
        'Working with a remote team',
      ],
      location: 'International',
      keywords: [
        'JavaScript',
      ],
    },
    {
      title: 'Random app thing',
      category: 'FOSS',
      description: 'A resume authoring and analysis tool for OS X, Linux, and Windows.',
      summary: 'Exemplar user for HackMyResume and FluentCV!',
      role: 'Contributor',
      url: 'http://please.hackmyresume.com',
      media: [
        {
          category: 'download',
          name: 'Download HackMyResume',
          url: 'https://www.npmjs.com/package/hackmyresume',
        },
      ],
      repo: 'https://github.com/hacksalot/hackmyresume',
      start: '2015-09-01',
      end: '2020-04-19',
      highlights: [
        'Working with a remote team',
      ],
      location: 'International',
      keywords: [
        'JavaScript',
      ],
    }
  ],
  skills: {
    sets: [
      {
        name: 'Web',
        level: 'Advanced',
        skills: [
          'JavaScript',
        ],
      },
    ],
    list: [
      {
        name: 'C++',
        level: '9',
        summary: 'Optional summary of your experience with the skill.',
        years: 7,
      },
    ],
  },
  service: {
    summary: 'Active US Army Reserve member and Technology for Tots technical consultant and volunteer coordinator.',
    history: [
      {
        category: 'military',
        organization: 'US Army Reserves',
        position: 'NCO',
        url: 'http://www.usar.army.mil/',
        start: '1999-11-01',
        end: '2003-06-01',
        summary: 'Summary of this military stint.',
        highlights: [
          'Accomplishment 1',
        ],
        keywords: [
          'Military',
        ],
        location: 'Mountain View, CA',
      },
    ],
  },
  education: {
    summary: '3 years at University',
    level: 'Bachelors degree',
    degree: 'BSCS',
    history: [
      {
        title: 'BSCS from Cornell University',
        institution: 'Cornell University',
        area: 'Computer Science',
        studyType: 'Bachelor',
        start: '2005-09-01',
        end: '2008-05-01',
        grade: '3.5',
        curriculum: [
          'Course 1',
        ],
        url: 'http://test.url',
        summary: 'A multiline summary of the education.',
        keywords: [
          'University',
        ],
        highlights: [
          'Hung out with Andy Bernard',
        ],
        location: 'US',
      },
    ],
  },
  social: [
    {
      network: 'GitHub',
      user: 'janef-was-here',
      url: 'https://github.com/janef-was-here',
      label: 'GitHub',
    },
  ],
  recognition: [
    {
      category: 'Award',
      title: 'Honorable Mention',
      date: '2012-01-01',
      from: 'Google',
      summary: 'Honorable Mention in Google\'s Summer of Code',
      url: 'http://test.url',
    },
  ],
  writing: [
    {
      title: 'Teach Yourself GORFF in 21 Days',
      category: 'Book',
      date: '2020-04-19',
      url: 'http://url.to.publication.com/blah',
      summary: 'A primer on the programming language of GORFF, whose for loops are coterminous with all of time and space.',
    },
  ],
  reading: [
    {
      title: 'Code Complete',
      category: 'Book',
      url: 'http://www.cc2e.com/Default.aspx',
      author: 'Steve McConnell',
      date: '2014-09-01',
      summary: 'My \'desert-island\' software construction manual.',
    },
  ],
  speaking: [
    {
      title: 'Data Warehousing Evolved: DARMA 2.0',
      event: 'OPENSTART 2013 Developer\'s Conference',
      location: 'Portland, OR',
      date: '2012-01-01',
      highlights: [
        'Won \'Best Presentation on an Emerging Technical Field\' prize.',
      ],
      keywords: [
        'Award',
      ],
      summary: 'Spoke at OPENSTART 2013 and won \'Best Presentation on an Emerging Technical Field\'',
    },
  ],
  governance: [
    {
      summary: 'Since 2008 I\'ve been a full-time member of the board of directors for TMN',
      category: 'board',
      role: 'Member',
      organization: 'The Mommies Network',
      start: '2008-02-01',
      end: '2010-01-01',
      keywords: [
        'Board Member',
      ],
      highlights: [
        'Having kids',
      ],
    },
  ],
  languages: [
    {
      language: 'English',
      level: 'Native',
    },
  ],
  samples: [
    {
      title: 'Asteroids',
      summary: 'A browser-based space shooter built on Three.js.',
      url: 'http://janesblog.com/asteroids',
      date: '2014-09-01',
      highlights: [
        'Building a game in JavaScript',
      ],
      keywords: [
        'JavaScript',
      ],
    },
  ],
  references: [
    {
      name: 'John Davidson',
      role: 'Badass',
      category: 'Professional',
      'private': true,
      summary: 'J Dawg is the man',
      contact: [
        {
          label: 'Mobile',
          category: 'phone',
          value: '9-(999)-999-9999',
        },
      ],
    },
  ],
  testimonials: [
    {
      name: 'Elias Fullstacker',
      quote: 'I worked with Jane on Jabberwocky and can vouch for her awesome technical capabilities and attention to detail. Insta-hire.',
      category: 'technical',
      'private': true,
    },
  ],
  interests: [
    {
      name: 'Reading',
      summary: 'Jane is a fan of mystery novels and courtroom dramas including Agatha Christie and John Grisham.',
      keywords: [
        'Agatha Christie',
      ],
    },
  ],
  extracurricular: [
    {
      title: 'Organizer / Manager',
      activity: 'JavaScript Game Development Meetup',
      location: 'Austin, TX',
      start: '2011-03-01',
      end: '2014-01-01',
    },
  ],
  affiliation: {
    summary: 'Member of numerous collegiate and professional groups and organizations.',
    history: [
      {
        category: 'organization',
        organization: 'IEEE',
        role: 'Member',
        url: 'https://www.ieee.org/index.html',
        start: '2013-06-01',
        end: '2020-04-19',
        summary: 'Member in good standing since 2013-06.',
        highlights: [
          'Attended some great conferences',
        ],
        keywords: [
          'IEEE',
        ],
        location: 'International',
      },
    ],
  },
};
