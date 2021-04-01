export default function getImage(data, selectedColorId) {
  const img = data.colors.filter((o) => (o && o.color.id === selectedColorId && o.gallery))
    .map((o) => o.gallery[0].file.url)[0];
  return img || 'img/no_photo_available.jpg';
}
