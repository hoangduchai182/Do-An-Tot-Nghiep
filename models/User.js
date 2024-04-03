'use strict';

class User {
  constructor(
    firstName,
    lastName,
    userName,
    passWord,
    category = 'Science',
    pagesize = 10
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.passWord = passWord;
    this.category = category;
    this.pagesize = pagesize;
    this.score = 0;
  }
}

class Game {
  constructor(id, name, image, linkPlay, linkStory, description, genres) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.linkPlay = linkPlay;
    this.linkStory = linkStory;
    this.description = description;
    this.comment = [];
    this.genres = genres;
    this.numberOfPlayed = 0;
  }
}
