export default function convertToKebabCase(str) {
  if (!str) return "";
  return str
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/_/g, "-") // Replace underscores with hyphens
    .toLowerCase(); // Convert the entire string to lowercase
}
