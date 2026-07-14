export default function IndexPage() {
  console.log("Hello from React");

  fetch("/api/listings")
    .then((res) => res.json())
    .then((data) => console.log("Listings data:", data));

  return (
    <>
      <h3> welcome to the... </h3>
      <h1> Index Page </h1>
      <h3> !!! </h3>
    </>
  );
}
