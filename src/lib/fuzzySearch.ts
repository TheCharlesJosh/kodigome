import Fuse from "fuse.js";

export interface SearchResult<T> {
  item: T;
  refIndex: number;
}

export default function fuzzySearchStrings(
  list: string[],
  options = {
    threshold: 0.3,
  }
) {
  const fuse = new Fuse(list, options);

  return (value: string) => {
    if (value && !value.length) {
      return list;
    }

    return fuse.search(value);
  };
}
