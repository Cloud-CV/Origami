import request from 'superagent';

export function addComponentDeployed(componentData, type) {
  let URL = `http://0.0.0.0:3000/api/${type}model`;
  return new Promise(function(resolve, reject) {
    request
      .post(URL)
      .send(componentData)
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
