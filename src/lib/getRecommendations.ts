export async function getRecommendations(query: string) {
  const res = await fetch(
    `https://www.google.com/complete/search?client=firefox&q=${query}`
  );

  const json = await res.json();

  console.log(json);

  return json;
}
