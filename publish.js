const AnyFile = require('any-file')
const ftpConf = require('./ftp-pass')
const assetMap = require('./build/asset-manifest.json')
const path = require('path')

let asset = Object.keys(assetMap).filter(v => !assetMap[v].match(/\.map$/)).map(v => assetMap[v])

Promise.all(asset.map(v => upload(v))).then(res => {
  console.log('success', res)
}).catch(e => {
  console.log(e)
})

function upload(file) {
  return new Promise((resolve, reject) => {
    var af = new AnyFile()
    var fromFile = path.join(__dirname, 'build', file)
    console.log(fromFile)
    var toFile = `ftp://${ftpConf.username}:${ftpConf.password}@${ftpConf.server}/hydrogen/user-dash-static/${file}`
    af.from(fromFile).to(toFile, (err, res) => {
      if (err) return reject(err)
      if (res) {
        resolve('File copied!')
      } else {
        reject(new Error('File not copied!'))
      }
    })
  })
}
