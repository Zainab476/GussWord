const words = ["react", "javascript", "hangman", "coding", "frontend"];

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}