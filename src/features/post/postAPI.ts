export async function fetchData() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await data.json();
}
