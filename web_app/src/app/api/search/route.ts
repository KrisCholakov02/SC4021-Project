export async function POST(req: Request) {
  let body: any = await req.json();
  let query = body.query;
  let field = body.field;
  let numRows = body.numRows;
  let page = body.page;
  let sortField = body.sortField;
  let sortDirection = body.sortDirection;

  let encodedQuery = encodeURIComponent(query);

  let finalQuery = `${field}:${encodedQuery}`;
  let sortQuery = '';
  if (sortField !== '') {
    sortQuery = `&sort=${sortField} ${sortDirection}`;
  }

  let solrQueryURL = `http://localhost:8983/solr/new_core/select?q=${finalQuery}&rows=${numRows}&start=${(page - 1) * numRows}${sortQuery}&spellcheck=true&wt=json`;

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
