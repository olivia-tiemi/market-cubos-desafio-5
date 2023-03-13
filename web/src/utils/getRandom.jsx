export default function getRandom(list, count, takenIndex) {
  let randomIndexes = [];
  let randomList = [];
  for (let i = 0; i < count; i++) {
    let randomIndex = Math.floor(Math.random() * list.length);
    while (
      randomIndexes.includes(randomIndex) ||
      list[randomIndex]?.id === takenIndex
    ) {
      randomIndex = Math.floor(Math.random() * list.length);
    }
    randomIndexes.push(randomIndex);
    randomList.push(list[randomIndex]);
  }
  return randomList;
}
