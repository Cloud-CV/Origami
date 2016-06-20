import request from 'superagent';

export function getDeployed(id) {
  let URL = 'http://0.0.0.0:3000/api/nonghdemomodel';
  if (id) {
    URL += `/${id}`;
  }
  return new Promise(function(resolve, reject) {
    request
      .get(URL)
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
