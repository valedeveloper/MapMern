const END_POINT = `http://localhost:8000/`;

export const getData = async ({ keyword, method, entries }) => {
  try {
    const res = await fetch(`${END_POINT}${keyword}`,
      method && {
        method: method,
        body: JSON.stringify(entries),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e)
  }
};
