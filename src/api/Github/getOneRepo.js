import request from 'superagent';

export function getRepo(repoName) {
  return new Promise(function(resolve, reject) {
    request
      .get('https://api.github.com/repos/'+ localStorage.getItem('username') +'/'+repoName)
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

export function checkDockerfile(repoName, repoId) {
  return new Promise(function(resolve, reject) {
    request
      .get('https://api.github.com/repos/'+ localStorage.getItem('username') +'/'+repoName+'/contents')
      .set('Authorization', 'token ' + localStorage.getItem('access_token'))
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
              downloadDockercomposeFile(
                [`https://${localStorage.getItem('access_token')}:x-oauth-basic@github.com/${localStorage.getItem('username')}/${repoName}`,
                  localStorage.getItem('username'), repoName,
                  JSON.parse(res.text)[allFileNames.indexOf('docker-compose.yml')]['download_url'], repoId]
              )
            );
          }
        }
      });
  });
}

function downloadDockercomposeFile(clone_data) {
  return new Promise((resolve, reject) => {
    request
      .get(clone_data[3])
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          let tempclonedata = Object.assign([], clone_data);
          tempclonedata[3] = res.text;
          resolve(tempclonedata);
        }
      });
  });
}
