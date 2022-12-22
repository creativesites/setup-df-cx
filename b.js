const taskFolder = './intents/';
var run = []
var fs = require('fs')
const jsonfile = require('jsonfile')
const file = './intsData.json'
//const jsonfile = require('jsonfile')

async function getTasks(file) {
    // const fsPromise = require('fs').promises;
    // let data = await fs.readFileSync(`${taskFolder}${file}`);
    // let parsedData = JSON.parse(data);
    // run.push(parsedData)
    
        let fileName = `./intents/${file}`
        let ff = file.replace('.json', '')
        let fileName1 = `./intents/${ff}_usersays_en.json`
        let oob = {}
        
        if(file.includes('_usersays_')){}
        else{
            await jsonfile.readFile(fileName)
            .then(async(obj)=>{
                oob.displayName = obj.name
                try {
                    await jsonfile.readFile(fileName1)
                    .then(async(obj1)=>{
                        let trainingP = obj1.map(async(t)=>{
                            let tt = t.data.map(async(t1)=>{
                                let tmpO = {}
                                tmpO.text = t1.text
                                try {
                                    tmpO.parameterId = t1.meta.replace('@', '').replace('sys.', '')
                                } catch (error) {
                                    tmpO.parameterId = ""
                                }
                                return tmpO
                            })
                            let trStr = {
                                "parts": await Promise.all(tt),
                                "id": "",
                                "repeatCount": 1
                            }
                            return trStr
                        })
                        oob.trainingPhrases = await Promise.all(trainingP)
                        await run.push(oob)
                    }) 
                } catch (error) {
                    oob.trainingPhrases = []
                    await run.push(oob)
                }
                
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
    }, 25000);
}
runAll()