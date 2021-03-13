import IdTokenVerifier from 'idtoken-verifier';
const request = require('request');

function doRequest(url) {
    return new Promise(function (resolve, reject) {
        
      request({url, json: true}, function (error, res, body) {
        if (!error && res.statusCode === 200) {
          return resolve(body);
        } else {
          return reject(error);
        }
      });
    });
  }

export async function verify(jwt, setUser) {
    const oidcConfig = await doRequest('https://id.twitch.tv/oauth2/.well-known/openid-configuration')
    
    const verifier = new IdTokenVerifier({
        issuer: oidcConfig.issuer,
        audience: 'y8xve6lm2qjgnmu1gekkiqkzhblz23',
        jwksURI: oidcConfig.jwks_uri
    });

    verifier.verify(jwt, null, function(error, payload) {
        if (error) {
            console.log('Error', error);
        } else {
            console.log('Login from', payload.sub);
            setUser(payload.preferred_username);
        }
    });
}