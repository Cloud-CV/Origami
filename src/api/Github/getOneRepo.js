import request from 'superagent';

export function getRepo(username, repoName) {
  return new Promise(function(resolve, reject) {
    request
      .get('https://api.github.com/repos/'+username+'/'+repoName)
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

export function checkDockerfile(username, repoName) {
  return new Promise(function(resolve, reject) {
    request
      .get('https://api.github.com/repos/'+username+'/'+repoName+'/contents')
      .set('Authorization', 'token ' + sessionStorage.getItem('access_token'))
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err) {
          reject(err);
        } else {
          let allFileNames = JSON.parse(res.text).map(file => file.name);
          if (allFileNames.indexOf('Dockerfile') == -1) {
            reject('Dockerfile not found!');
          } else if (allFileNames.indexOf('docker_compose.yml') == -1) {
            reject('docker_compose.yml not found!');
          } else {
            resolve(true);
          }
        }
      });
  });
}
