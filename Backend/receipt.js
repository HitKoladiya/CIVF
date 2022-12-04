const Jimp = require('jimp');

var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

function inWords (num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}

async function textOverlay() {
   // Reading image
   const image = await Jimp.read('D:/My Projects/CIVF Website/CIVF/CIVF/Backend/Testing/Picture5.png');

   // inWords(5000)
   // Defining the text font
   const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
    image.print(font, 120, 215, 'hit B. koladiya');
    image.print(font, 127, 245, '44 saketdham sos');
    image.print(font, 127, 259, 'pachhas hajar pura');
    image.print(font, 125, 282, '8154869973');
    image.print(font, 120, 314, 'koladiyahit45@gmail.com');
    image.print(font, 100, 345, 'my PAN number');

   // Writing image after processing
   await image.writeAsync('D:/My Projects/CIVF Website/CIVF/CIVF/Backend/Testing/Picture5.png');
   console.log("Image is processed succesfully");
}
console.log(inWords("11111"))
// textOverlay();
// image.print(font, 120, 215, 'hit B. koladiya');
// image.print(font, 127, 245, '44 saketdham sos');36 char
// image.print(font, 127, 259, 'pachhas hajar pura');36 char
// image.print(font, 125, 282, '8154869973');
// image.print(font, 120, 314, 'koladiyahit45@gmail.com');
// image.print(font, 100, 345, 'my PAN number');


// image.print(font, 595, 218, '50,000/- RS');
// image.print(font, 600, 249, 'pachhas hajar pura');