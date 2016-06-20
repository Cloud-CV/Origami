import request from 'superagent';

export function modifyComponentDeployed(componentData, type) {
  let URL = `http://0.0.0.0:3000/api/${type}model/${componentData.id}`;
  return new Promise(function(resolve, reject) {
    request
      .put(URL)
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
