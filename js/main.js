import dogs from '/js/data.js';
import Dog from '/js/Dog.js';

function getNewDog() {
  const nextDogData = dogs.shift();
  // If there are no more dogs in the array, return false
  return nextDogData ? new Dog(nextDogData) : false;
}

function disableBtns() {
  document.querySelectorAll('button').forEach((button) => {
    button.disabled = true;
    button.style.opacity = '0.4';
  });
}

function enableBtns() {
  document.querySelectorAll('button').forEach((button) => {
    button.disabled = false;
    button.style.opacity = 1;
  });
}

function endApp() {
  const dogEl = document.getElementById('dog');
  dogEl.innerText = 'No more dogs';
  dogEl.style.backgroundImage = 'none';
  dogEl.classList.add('end-message');
  disableBtns();
}

function displayBadge(badge) {
  const badgeEl = document.getElementById('badge');
  badgeEl.src = badge;
  badgeEl.classList.add('show');
}

function hideBadge() {
  document.getElementById('badge').classList.remove('show');
}

function swipe(hasBeenLiked) {
  const dog = getNewDog();

  displayBadge(
    hasBeenLiked ? 'images/badge-like.png' : 'images/badge-nope.png'
  );

  if (!dog) {
    setTimeout(() => {
      endApp();
      return;
    }, 600);
  } else {
    disableBtns();

    dog.hasBeenLiked = hasBeenLiked;
    dog.hasBeenSwiped = true;

    setTimeout(() => {
      render(dog);
      hideBadge();
      enableBtns();
    }, 600);
  }
}

function render({ name, avatar, age, bio }) {
  document.getElementById('dog').style.backgroundImage = `url(${avatar})`;
  document.getElementById('name').innerText = `${name}, ${age}`;
  document.getElementById('quote').innerText = bio;
}

function init() {
  const dog = getNewDog();
  render(dog);
}

document.getElementById('like-btn').addEventListener('click', () => {
  swipe(true);
});
document.getElementById('dislike-btn').addEventListener('click', () => {
  swipe(false);
});
document.addEventListener('DOMContentLoaded', init);
