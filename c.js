const dataz = require('./intsData.json');
const jsonfile = require('jsonfile')
const file = './intsData1.json'
// remove items with no training phrases
let dataz1 = dataz.filter((item)=>{return item.trainingPhrases.length > 0})
setTimeout(async() => {
    await jsonfile.writeFile(file, dataz1)
        .then(res => {
            console.log('Write complete')
        })
        .catch(error => console.error(error))
}, 8000);