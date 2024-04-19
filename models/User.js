"use strict";

class User {
  constructor(
    firstName,
    lastName,
    userName,
    passWord,
    category = "Science",
    pagesize = 10
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.passWord = passWord;
    this.category = category;
    this.pagesize = pagesize;
    this.flappyBird = 0;
    this.DogShadow = 0;
    this.EggMonster = 0;
    this.SeaHorsesGun = 0;
    this.AlienShooter = 0;
    this.SnakeDog = 0;
  }
}

class Games {
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
