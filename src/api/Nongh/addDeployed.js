import request from 'superagent';

export function addDeployed(repoData) {
  let URL = 'http://0.0.0.0:3000/api/githubdemomodel';
  return new Promise(function(resolve, reject) {
    request
      .post(URL)
      .send(repoData)
      .set('Content-Type', 'application/json')
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
