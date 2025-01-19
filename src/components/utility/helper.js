import _ from "lodash";

export function paginate(item, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(item).slice(startIndex).take(pageSize);
}

export function formatDate(dateString, format, options = {}) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString(format, options);
}
