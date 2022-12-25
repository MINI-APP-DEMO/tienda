export const arrayToMap = (data: any[], key: string) => {
  if (!Array.isArray(data)) return;
  const dataMap = new Map<any, any[]>();
  for (let e of data) {
    if (dataMap.has(e[key])) {
      dataMap.get(e[key])?.push(e);
    } else {
      dataMap.set(e[key], [e]);
    }
  }
 return dataMap
};
