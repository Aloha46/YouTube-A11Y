const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    q: `${searchTerm}`, \\why backticks?
    key: 'AIzaSyCtk8xqx3X4n1ps4u5Pw4_7ZjPpd8bBgVk'
  };
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  console.log(result);
  return `
    <li>
      
      <a class="js-result-name" href="http://youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a> by <a class="js-user-name" href="$" target="_blank">${result.snippet.channelTitle}</a>
     
   
    <img src="${result.snippet.thumbnails.medium.url}"/>
     </li>
  `;
}

function displayGitHubSearchData(data) {
  
  const results = []
  results.push('<ul>')
  data.items.forEach(item => results.push(renderResult(item)));
  results.push('</ul>');
  //console.log(results);
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayGitHubSearchData);
  });
}

$(watchSubmit);