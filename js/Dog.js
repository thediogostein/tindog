class Dog {
  constructor(data) {
    Object.assign(this, data);
  }

  sayHi() {
    return `I'm a doggo`;
  }
}

export default Dog;
