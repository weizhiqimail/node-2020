

let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
alpha += alpha.toLowerCase();
alpha += '0123456789'
alpha += '+/';

let hua = Buffer.from('»ª', 'utf8');
console.log(hua.toString('base64'));
let zhu = Buffer.from('Öé','utf8');
console.log(zhu.toString('base64'));
// <Buffer ef bf bd ef bf bd>
// <Buffer ef bf bd ef bf bd>

