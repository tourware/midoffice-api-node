<p align="center">
  <a href="https://www.typisch-touristik.de">
    <img alt="Typisch Touristik" src="https://res.cloudinary.com/midoffice/image/upload/c_scale,w_200/v1502782171/storage/logo.png" width="200">
  </a>
</p>

<p align="center">
  Mit dem Midoffice bieten wir Ihnen eine vollumfänglich-webbasiete Verwaltungssoftware für Ihre Reisen, Reisebausteine, Ferienhäuserr, Leistungsträger und Kundenstämme.
</p>

<p align="center">
  <a href="https://circleci.com/gh/TypischTouristik/midoffice" target="_blank"><img alt="Build Status" src="https://circleci.com/gh/TypischTouristik/midoffice.png?style=shield&circle-token=d66f5278321e8ab5a2d7a2a628af1141c48aa176"></a>
</p>

---

# Install

The preferred way to install the Midoffice.io-API for Node.js is to use the
[npm](http://npmjs.org) package manager for Node.js. Simply type the following
into a terminal window:

```sh
npm install @typischtouristik/midoffice-api --save
```

# Usage

Initialize with your credentials:

```js
var api = require('@typischtouristik/midoffice-api')({
  url: 'https://app.midoffice.io',
  auth: {
    key: 'your-key-provided-by-midoffice-io',
    secret: 'your-secret-provided-by-midoffice-io'
  }
});
```

Do request to a specific endpoint:

```js
api.request('/api/travels/' + travelsId).then(function (data) {
  // do sth. with your data
});
```
