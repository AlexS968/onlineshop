export default function getImageList(data, selectedColorId) {
  return data.colors.filter((o) => (o && o.color.id === selectedColorId && o.gallery))
    .map((o) => o.gallery[0].file.url);
}
