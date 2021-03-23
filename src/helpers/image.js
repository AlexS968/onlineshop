export default function image(data, selectedColorId) {
  const selectedImage = data.colors.filter((o) => (o.color.id === selectedColorId && o.gallery))
    .map((o) => o.gallery[0].file.url)[0];
  return selectedImage || 'img/no_photo_available.jpg';
}
