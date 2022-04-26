export const selectItemsOfType = (itemType, arrayOfItems) => {
  let arr = [];
  arrayOfItems.forEach((item) => {
    if (item.type === itemType) {
      arr.push(item);
    } 
  })
  return arr;
}