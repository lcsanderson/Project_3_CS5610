// test file to learn how query works and what kind of parameters come back from the API

const COOPER_HEWITT_ENDPOINT = "https://api.cooperhewitt.org/";

const query = `
  {
    object(hasImages: true, size: 3) {
      id
      summary
      multimedia
      maker {
        summary
      }
      geography
      date
    }
  }
`;

async function testFetch() {
  try {
    const response = await fetch(COOPER_HEWITT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL returned errors:", data.errors);
      return;
    }

    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.err("Request failed:", err);
  }
}

testFetch();
