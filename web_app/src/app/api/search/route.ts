export async function POST(req: Request) {
  let body: any = await req.json();
  let squery = body.query;
  let field = 'body';
  let numRows = 10;
  let page = body.page;
  let sortField = body.sortField;
  let sortDirection = body.sortDirection;
  let filters = body.filters;

  let query = '';
  if (squery === '*') {
    query = 'body:*';
  } else {
    query = `${field}:"${squery}"~5`;
  }
  console.log(filters);

  if (filters.subreddit.length > 0) {
    let subredditQuery = filters.subreddit
      .map((subreddit: string) => `subreddit:${subreddit}`)
      .join(' OR ');
    query += ` AND (${subredditQuery})`;
  }

  if (filters.author !== '') {
    query += ` AND (author:"${filters.author}")`;
  }

  if (filters.sentiment !== '') {
    query += ` AND Predicted_Class:"${filters.sentiment}"`;
  }

  let upvotesQuery = '';
  if (filters.upvotes[0] !== null && filters.upvotes[1] !== null) {
    upvotesQuery += `upvotes:[${filters.upvotes[0]} TO ${filters.upvotes[1]}]`;
  } else {
    if (filters.upvotes[0] !== null) {
      upvotesQuery += `upvotes:[${filters.upvotes[0]} TO *]`;
    }
    if (filters.upvotes[1] !== null) {
      upvotesQuery += `upvotes:[* TO ${filters.upvotes[1]}]`;
    }
  }
  if (upvotesQuery !== '') query += ` AND (${upvotesQuery})`;

  let dateQuery = '';
  if (filters.publishDate[0] !== '' && filters.publishDate[1] !== '') {
    dateQuery += `created_utc:[${filters.publishDate[0]}T00:00:00Z TO ${filters.publishDate[1]}T00:00:00Z]`;
  } else {
    if (filters.publishDate[0] !== '') {
      dateQuery += `created_utc:[${filters.publishDate[0]}T00:00:00Z TO *]`;
    }
    if (filters.publishDate[1] !== '') {
      dateQuery += `created_utc:[* TO ${filters.publishDate[1]}T00:00:00Z]`;
    }
  }
  if (dateQuery !== '') query += ` AND (${dateQuery})`;

  let encodedQuery = encodeURIComponent(query);

  let sortQuery = '';
  if (sortField !== '') {
    sortQuery = `&sort=${sortField} ${sortDirection}`;
  }

  let solrQueryURL = `http://localhost:8983/solr/comments/select?facet.field=Predicted_Class&facet.field=subreddit&facet=true&q=${encodedQuery}&rows=${numRows}&start=${(page - 1) * numRows}${sortQuery}&spellcheck=true&wt=json`;
  console.log(solrQueryURL);
  try {
    const response = await fetch(solrQueryURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status !== 200) {
      console.error('An error occurred:', response);
      return Response.json(
        { error: 'Internal Server Error' },
        { status: response.status }
      );
    }
    let responseJSON = await response.json();
    // If no results are found, try with ~20% fuzziness
    if (responseJSON.response.numFound < 10) {
      console.log('No results found, trying with fuzziness');
      query = `${field}:"${squery}"~20`;
      // Add the filters to the query
      if (filters.subreddit.length > 0) {
        let subredditQuery = filters.subreddit
          .map((subreddit: string) => `subreddit:${subreddit}`)
          .join(' OR ');
        query += ` AND (${subredditQuery})`;
      }
      if (filters.author !== '') {
        query += ` AND (author:"${filters.author}")`;
      }
      if (filters.sentiment !== '') {
        query += ` AND Predicted_Class:"${filters.sentiment}"`;
      }
      if (upvotesQuery !== '') query += ` AND (${upvotesQuery})`;
      if (dateQuery !== '') query += ` AND (${dateQuery})`;

      encodedQuery = encodeURIComponent(query);
      solrQueryURL = `http://localhost:8983/solr/comments/select?facet.field=Predicted_Class&facet.field=subreddit&facet=true&q=${encodedQuery}&rows=${numRows}&start=${(page - 1) * numRows}${sortQuery}&spellcheck=true&wt=json`;
      const response = await fetch(solrQueryURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status !== 200) {
        console.error('An error occurred:', response);
        return Response.json(
          { error: 'Internal Server Error' },
          { status: response.status }
        );
      }
      responseJSON = await response.json();
    }
    console.log(responseJSON);
    let numFound = responseJSON.response.numFound;
    console.log(numFound);
    return Response.json(responseJSON);
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
