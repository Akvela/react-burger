export const selectItemsOfType = (itemType, arrayOfItems) => {
  const arr = [];
  arrayOfItems.forEach((item) => {
    if (item.type === itemType) {
      arr.push(item);
    } 
  })
  return arr;
}