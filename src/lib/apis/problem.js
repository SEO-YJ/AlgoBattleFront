import instance from "./base";

export async function getProblem(queryString, roomTier, users) {
  try {
    const data = await instance.post(`/problem/${roomTier}${queryString}`, users);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}