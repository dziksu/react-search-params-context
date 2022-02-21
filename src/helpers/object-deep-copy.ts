export const objectDeepCopy = <T extends {}>(data: T): T => {
  return JSON.parse(JSON.stringify(data));
};
