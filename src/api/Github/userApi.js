import request from 'superagent';

class userApi {
  static userProfile() {
    return new Promise((resolve, reject) => {
      request
        .get('https://api.github.com/user')
        .set('Authorization', `token ${localStorage.getItem('access_token')}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.text);
          }
        });
    });
  }
}


export default userApi;

