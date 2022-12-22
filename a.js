const taskFolder = './ents/';
var run = []
var fs = require('fs')
const jsonfile = require('jsonfile')
const file = './entsData.json'
//const jsonfile = require('jsonfile')

async function getTasks(file) {
    // const fsPromise = require('fs').promises;
    // let data = await fs.readFileSync(`${taskFolder}${file}`);
    // let parsedData = JSON.parse(data);
    // run.push(parsedData)
    if(file.includes('_entries_')){
         
    }
    else{
        let fileName = `./ents/${file}`
        let ff = file.replace('.json', '')
        let fileName1 = `./ents/${ff}_entries_en.json`
        let oob = {}
        
        await jsonfile.readFile(fileName)
        .then(async(obj)=>{
            oob.name = obj.name
            await jsonfile.readFile(fileName1)
            .then(async(obj1)=>{
                oob.entries = obj1
                run.push(oob)
            })
        })
        .catch(error => console.error(error))
    }
    
}

async function getEnts(){
    await fs.readdir(taskFolder, (err, files) => {
        files.forEach(getTasks);
    });
}
async function writeJson() {
    await jsonfile.writeFile(file, run)
  .then(res => {
    console.log('Write complete')
  })
  .catch(error => console.error(error))
}

async function runAll(){
    await getEnts()
    setTimeout(async() => {
        await writeJson()
    }, 15000);
}
runAll()