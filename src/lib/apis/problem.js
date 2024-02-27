import instance from "./base";

export async function getProblem(queryString, roomTier, users) {
  try {
    const data = await instance.get(`/problem/${roomTier}${queryString}`, {
      params: {
        body: users,
      },
    });
    console.log(users);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}
