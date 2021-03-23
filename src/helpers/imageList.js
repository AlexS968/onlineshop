export default function imageList(data, selectedColorId) {
  return data.colors.filter((o) => (o.color.id === selectedColorId && o.gallery))
    .map((o) => o.gallery[0].file.url);
}
