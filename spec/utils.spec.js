const { expect } = require("chai");

const {
  formatDates,
  makeRefObj,
  formatComments,
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("returns an empty array if no object is passed in", () => {
    let list = [];
    expect(formatDates(list)).to.eql([]);
  });
  it("can convert one object in the array to have the correct timestamp", () => {
    const list = [{ object: 1, created_at: 1511354163389 }];

    const timestamp1 = new Date(1511354163389);

    expect(formatDates(list)[0].created_at).to.eql(timestamp1);
  });
  it("can convert multiple objects in the array to have the correct timestamp", () => {
    const list = [
      { object: 1, created_at: 1511354163389 },
      { object: 2, created_at: 1511354163466 },
      { object: 3, created_at: 1511354163570 },
    ];

    const timestamp1 = new Date(1511354163389);
    const timestamp2 = new Date(1511354163466);
    const timestamp3 = new Date(1511354163570);

    expect(formatDates(list)[0].created_at).to.eql(timestamp1);
    expect(formatDates(list)[1].created_at).to.eql(timestamp2);
    expect(formatDates(list)[2].created_at).to.eql(timestamp3);
  });
  it("Does not mutate the original array", () => {
    const list = [
      { object: 1, created_at: 1511354163389 },
      { object: 2, created_at: 1511354163466 },
      { object: 3, created_at: 1511354163570 },
    ];

    formatDates(list);

    expect(list[1]).to.eql({ object: 2, created_at: 1511354163466 });
  });
});

describe("makeRefObj", () => {
  it("Returns an empty object if passed an empty array", () => {
    expect(makeRefObj([])).to.eql({});
  });
  it("Returns a reference object for one article", () => {
    const list = [{ article_id: 1, title: "A" }];

    const actual = makeRefObj(list);

    const expected = { A: 1 };

    expect(actual).to.eql(expected);
  });
  it("Returns a reference object for multiple articles", () => {
    const list = [
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" },
      { article_id: 3, title: "C" },
    ];
    const actual = makeRefObj(list);

    const expected = { A: 1, B: 2, C: 3 };

    expect(actual).to.eql(expected);
  });
  it("Does not mutate the original array of inputs", () => {
    const list = [
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" },
      { article_id: 3, title: "C" },
    ];

    makeRefObj(list);

    expect(list).to.eql([
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" },
      { article_id: 3, title: "C" },
    ]);
  });
});

describe("formatComments", () => {
  it("Returns an empty array if no comment object has been inputted", () => {
    expect(formatComments([])).to.eql([]);
  });
  it("Returns an array of a formatted comment if passed one comment object", () => {
    const comments = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
    ];
    const refObj = {
      A: 1,
    };

    const actual = formatComments(comments, refObj);

    const expected = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 1,
        author: "butter_bridge",
        votes: 16,
        created_at: new Date(1511354163389),
      },
    ];
    expect(actual).to.eql(expected);
  });
  it("Returns an array of formatted comments if passed multiple comments objects", () => {
    const comments = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "B",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
      {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
        belongs_to: "C",
        created_by: "icellusedkars",
        votes: 100,
        created_at: 1448282163389,
      },
    ];
    const refObj = {
      A: 1,
      B: 2,
      C: 3,
    };

    const actual = formatComments(comments, refObj);

    const expected = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 1,
        author: "butter_bridge",
        votes: 16,
        created_at: new Date(1511354163389),
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        article_id: 2,
        author: "butter_bridge",
        votes: 14,
        created_at: new Date(1479818163389),
      },
      {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
        article_id: 3,
        author: "icellusedkars",
        votes: 100,
        created_at: new Date(1448282163389),
      },
    ];
    expect(actual).to.eql(expected);
  });
  it("Does not mutate the original array", () => {
    const comments = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "B",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
      {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
        belongs_to: "C",
        created_by: "icellusedkars",
        votes: 100,
        created_at: 1448282163389,
      },
    ];

    const refObj = {
      A: 1,
      B: 2,
      C: 3,
    };

    formatComments(comments, refObj);

    expect(comments).to.eql([
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "B",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
      {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
        belongs_to: "C",
        created_by: "icellusedkars",
        votes: 100,
        created_at: 1448282163389,
      },
    ]);
  });
});
