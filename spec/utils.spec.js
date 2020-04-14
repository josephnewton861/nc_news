const { expect } = require('chai');

const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('returns an empty array when an empty object has been passed in', () => {
    expect(formatDates({})).to.eql([])
  })
  it('returns an array with the list object date property reformated for one object to js', () => {
   const list = [{
    title: 'Living in the shadow of a great man',
    topic: 'mitch',
    author: 'butter_bridge',
    body: 'I find this existence challenging',
    created_at: 1542284514171
  }]

  const actual = formatDates(list)

  const expected = ([{
    title: 'Living in the shadow of a great man',
    topic: 'mitch',
    author: 'butter_bridge',
    body: 'I find this existence challenging',
    created_at: new Date(1542284514171)
  }])

  expect(actual).to.eql(expected)
  })
  it('returns an array with the list object date property reformated for one object to js', () => {
   const list = [{
    title: 'Living in the shadow of a great man',
    topic: 'mitch',
    author: 'butter_bridge',
    body: 'I find this existence challenging',
    created_at: 1542284514171
  }, {
    title: 'Sony Vaio; or, The Laptop',
    topic: 'mitch',
    author: 'icellusedkars',
    body:
      'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
    created_at: 1416140514171,
  },
  {
    title: 'Eight pug gifs that remind me of mitch',
    topic: 'mitch',
    author: 'icellusedkars',
    body: 'some gifs',
    created_at: 1289996514171,
  }]

  const actual = formatDates(list)

  const expected = ([{
    title: 'Living in the shadow of a great man',
    topic: 'mitch',
    author: 'butter_bridge',
    body: 'I find this existence challenging',
    created_at: new Date(1542284514171)
  }, {
    title: 'Sony Vaio; or, The Laptop',
    topic: 'mitch',
    author: 'icellusedkars',
    body:
      'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
    created_at: new Date(1416140514171),
  },
  {
    title: 'Eight pug gifs that remind me of mitch',
    topic: 'mitch',
    author: 'icellusedkars',
    body: 'some gifs',
    created_at: new Date(1289996514171),
  }])

  expect(actual).to.eql(expected)
  })
  it('Does not mutate the original array', () => {
    const list = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171
    }, {
      title: 'Sony Vaio; or, The Laptop',
      topic: 'mitch',
      author: 'icellusedkars',
      body:
        'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
      created_at: 1416140514171,
    },
    {
      title: 'Eight pug gifs that remind me of mitch',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'some gifs',
      created_at: 1289996514171,
    }]

    formatDates(list)

    expect(list).to.eql([{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171
    }, {
      title: 'Sony Vaio; or, The Laptop',
      topic: 'mitch',
      author: 'icellusedkars',
      body:
        'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
      created_at: 1416140514171,
    },
    {
      title: 'Eight pug gifs that remind me of mitch',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'some gifs',
      created_at: 1289996514171,
    }])
  })
});

describe('makeRefObj', () => {
  it('Returns an empty object if passed an empty array', () => {
    expect(makeRefObj([])).to.eql({})
  })
  it('Returns a reference object for one article', () => {
      const list = [{ article_id: 1, title: 'A' }]

      const actual = makeRefObj(list)

      const expected = { A: 1 }

      expect(actual).to.eql(expected)
  })
  it('Returns a reference object for multiple articles', () => {
    const list = [
    { article_id: 1, title: 'A' },
    { article_id: 2, title: 'B' }, 
    { article_id: 3, title: 'C' }
  ]
    const actual = makeRefObj(list)

    const expected = { A: 1, B: 2, C: 3 }

    expect(actual).to.eql(expected)
})
it('Does not mutate the original array of inputs', () => {
  const list = [
    { article_id: 1, title: 'A' },
    { article_id: 2, title: 'B' }, 
    { article_id: 3, title: 'C' }
  ]

  makeRefObj(list)

  expect(list).to.eql([
    { article_id: 1, title: 'A' },
    { article_id: 2, title: 'B' }, 
    { article_id: 3, title: 'C' }
  ])
})
});

describe('formatComments', () => {
  it('Returns an empty array if no comment object has been inputted', () => {
    expect(formatComments([])).to.eql([])
  })
  it('Returns an array of a formatted comment if passed one comment object', () => {
    const comments = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "A",
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389,
      }
    ]
    const refObj = {
      A: 1
    }

    const actual = formatComments(comments, refObj)

    const expected = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 1,
        author: 'butter_bridge',
        votes: 16,
        created_at: new Date(1511354163389)
      }
    ]
    expect(actual).to.eql(expected)
  })
  it('Returns an array of formatted comments if passed multiple comments objects', () => {
    const comments = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "A",
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        belongs_to: 'B',
        created_by: 'butter_bridge',
        votes: 14,
        created_at: 1479818163389,
      },
      {
        body:
          'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
        belongs_to: 'C',
        created_by: 'icellusedkars',
        votes: 100,
        created_at: 1448282163389,
      }
    ]
    const refObj = {
      A: 1,
      B: 2, 
      C: 3
    }

    const actual = formatComments(comments, refObj)

    const expected = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 1,
        author: 'butter_bridge',
        votes: 16,
        created_at: new Date(1511354163389)
      },
      {
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        article_id: 2,
        author: 'butter_bridge',
        votes: 14,
        created_at: new Date(1479818163389),
      },
      {
        body:
          'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
        article_id: 3,
        author: 'icellusedkars',
        votes: 100,
        created_at: new Date(1448282163389),
      }  
    ]
    expect(actual).to.eql(expected)
  })
  it('Does not mutate the original array', () => {
    const comments = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "A",
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        belongs_to: 'B',
        created_by: 'butter_bridge',
        votes: 14,
        created_at: 1479818163389,
      },
      {
        body:
          'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
        belongs_to: 'C',
        created_by: 'icellusedkars',
        votes: 100,
        created_at: 1448282163389,
      }
    ]

    const refObj = {
      A: 1,
      B: 2, 
      C: 3
    }

    formatComments(comments, refObj)

    expect(comments).to.eql([
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "A",
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        belongs_to: 'B',
        created_by: 'butter_bridge',
        votes: 14,
        created_at: 1479818163389,
      },
      {
        body:
          'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
        belongs_to: 'C',
        created_by: 'icellusedkars',
        votes: 100,
        created_at: 1448282163389,
      }
    ])

  })
});


// const albums = [
//   { name: 'Grammatics', artist: 'Grammatics', releaseYear: 2009 }
// ];
//     const artistLookup = {Grammatics: 9923};