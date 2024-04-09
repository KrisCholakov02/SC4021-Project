async function fetchData() {
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


  let searchTerm = "automatic";
  let searchField = "body";

  let encodedSearchTerm = encodeURIComponent(searchTerm);

  let query = `${searchField}:${encodedSearchTerm}`;

  let solrQueryURL = `http://localhost:8983/solr/new_core/select?q=${query}&wt=json`;


  fetch(solrQueryURL, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json()) 
  .then(data=>
    data.response.docs.forEach(doc => {
    // console.log(doc);
    
    console.log("comment: ", doc.body);
    console.log("score: ", doc.score);
  
  }))
  .catch(error => {
    console.error('Error:', error);
  });
  
}

fetchData();