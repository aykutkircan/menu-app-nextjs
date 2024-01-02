export default function getFileExtension(image) {
  if (!image) {
    return;
  }

  const filename = image?.name;

  if (!filename) {
    return;
  }

  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}
