export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Extract the id from the path
  let id = params.id;
  let field = 'id';
  let query = `${field}:${id}`;
  let encodedQuery = encodeURIComponent(query);

  let solrQueryURL = `http://localhost:8983/solr/comments/select?q=${encodedQuery}&rows=${1}&fl=*&wt=json`;

  try {
    const response = await fetch(solrQueryURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status !== 200) {
      console.error('An error occurred:', response.statusText);
      return Response.json(
        { error: 'Internal Server Error' },
        { status: response.status }
      );
    } else {
      return Response.json(await response.json(), { status: 200 });
    }
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
