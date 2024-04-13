export async function POST(req: Request) {
  let body: any = await req.json();
  let query = body.query;
  let field = 'body';
  let numRows = 10;
  let page = body.page;
  let sortField = body.sortField;
  let sortDirection = body.sortDirection;

  let encodedQuery = encodeURIComponent(query);
  let finalQuery;
  if (query === '*') {
    finalQuery = 'body:*';
  } else {
    finalQuery = `${field}:"${encodedQuery}"`;
  }
  let sortQuery = '';
  if (sortField !== '') {
    sortQuery = `&sort=${sortField} ${sortDirection}`;
  }

  let solrQueryURL = `http://localhost:8983/solr/comments/select?facet.field=Predicted_Class&facet.field=subreddit&facet=true&q.op=AND&q=${finalQuery}&rows=${numRows}&start=${(page - 1) * numRows}${sortQuery}&spellcheck=true&wt=json`;

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
    }
    // If no results are found, try with q.op=OR
    let responseJSON = await response.json();
    console.log(responseJSON);
    let numFound = responseJSON.response.numFound;
    console.log(numFound);
    if (numFound === 0) {
      solrQueryURL = `http://localhost:8983/solr/comments/select?facet.field=Predicted_Class&facet.field=subreddit&facet=true&q.op=OR&q=${finalQuery}&rows=${numRows}&start=${(page - 1) * numRows}${sortQuery}&spellcheck=true&wt=json`;

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
      }

      responseJSON = await response.json();

      return Response.json(responseJSON);
    } else {
      return Response.json(responseJSON);
    }
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
