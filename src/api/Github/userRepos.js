import request from 'superagent';

export default function userRepos(repoType) {
  return new Promise(function(resolve, reject) {
    request
      .get('https://api.github.com/user/repos?type='+repoType)
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
