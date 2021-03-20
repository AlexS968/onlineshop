export default function image(data, selectedColorId) {
  if (selectedColorId === 0) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.colors.length; i++) {
      if (data.colors[i].gallery) {
        return data.colors[i].gallery[0].file.url;
      }
    }
    return 'img/no_photo_available.jpg';
  }
  return data.colors.filter((o) => o.color.id === selectedColorId)
    .map((o) => o.gallery[0].file.url)[0];
}
