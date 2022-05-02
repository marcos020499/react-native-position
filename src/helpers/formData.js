export function createFormDataAtResource({ uri, type, fileName }) {
  const fData = new FormData();
  fData.append("file", {
    uri,
    type,
    name: fileName,
  });
  return fData;
}
