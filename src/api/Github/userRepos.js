import request from 'superagent';

function returnRepos(repoType, iterator) {
  return new Promise(function(resolve, reject) {
    request
      .get('https://api.github.com/user/repos?type='+repoType+'&per_page=100&page='+iterator)
      .set('Authorization', 'token ' + localStorage.getItem('access_token'))
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err) {
          reject(err);
        } else {
          resolve(res.text);
        }
      });
  });
}

function recursiveRunner(repoType, iterator, callback) {
  returnRepos(repoType, iterator).then(data => {
    if (JSON.parse(data).length > 0) {
      callback(['inprogress', JSON.parse(data)]);
      recursiveRunner(repoType, iterator + 1, callback);
    } else {
      callback(['complete']);
    }
  }).catch(err => {
    callback(['failed', err]);
  });
}

export default function userRepos(repoType) {
  return new Promise(function(resolve, reject) {
    let dataToSend = [];
    recursiveRunner(repoType, 1, response => {
      if (response[0] === 'inprogress') {
        Object.assign(dataToSend, response[1]);
      } else if (response[0] === 'complete') {
        resolve(dataToSend);
      } else if (response[0] === 'failed') {
        reject(response[1]);
      }
    });
  });
}
