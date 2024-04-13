export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Extract the id from the path
  let id = params.id;
  let encodedQuery = encodeURIComponent(id);
  let field = 'id';

  let finalQuery = `${field}:${encodedQuery}`;

  let solrQueryURL = `http://localhost:8983/solr/comments/select?q=${finalQuery}&rows=${1}&wt=json`;

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
