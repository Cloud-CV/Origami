import request from 'superagent';

export function getRepo(repoName) {
  return new Promise(function(resolve, reject) {
    request
      .get('https://api.github.com/repos/'+ sessionStorage.getItem('username') +'/'+repoName)
      .set('Authorization', 'token ' + sessionStorage.getItem('access_token'))
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

export function checkDockerfile(repoName) {
  return new Promise(function(resolve, reject) {
    request
      .get('https://api.github.com/repos/'+ sessionStorage.getItem('username') +'/'+repoName+'/contents')
      .set('Authorization', 'token ' + sessionStorage.getItem('access_token'))
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err) {
          reject(err);
        } else {
          let allFileNames = JSON.parse(res.text).map(file => file.name);
          if (allFileNames.indexOf('docker-compose.yml') == -1) {
            reject('docker-compose.yml not found!');
          } else {
            resolve(
              [`https://${sessionStorage.getItem('access_token')}:x-oauth-basic@github.com/${sessionStorage.getItem('username')}/${repoName}`,
                sessionStorage.getItem('username'), repoName]
            );
          }
        }
      });
  });
}
