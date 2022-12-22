const dataz = require('./intsData1.json');
let data = dataz
const jsonfile = require('jsonfile')
const file = './intsData2.json'
const ent = require('./ent.json')
let arr = [];

for (let index = 0; index < data.length; index++) {
    const element = data[index];
    let tP = element.trainingPhrases;
    element.parameters = []
    for (let idx = 0; idx < tP.length; idx++) {
        const el = tP[idx];
        let pts = el.parts;
        let tmpObj = {
            "id": "",
            "entityType": "projects/allio100-urc9/locations/global/agents/a5d03e75-bd18-41e6-a535-49021194af78/entityTypes/0ecb752d-4fde-42e8-84d5-ed91a511ff51",
            "isList": false,
            "redact": false
        }
        for (let i = 0; i < pts.length; i++) {
            let smpA = {}
            const e = pts[i];
            let paramId = e.parameterId;
            if(paramId != ""){
                // check if paramId is in ent.json
                let found = ent.find(x => x.displayName == paramId);
                if(found){
                    smpA.id = ''
                    smpA.entityType = found.name
                    smpA.isList = false
                    smpA.redact = false
                    element.parameters.push(smpA)
                }
                
                

            }
            
        }
    }
}

async function main(){
    let newArr = data.map(async(element)=>{
        let tP = element.trainingPhrases;
        element.parameters = []
        for (let idx = 0; idx < tP.length; idx++) {
            const el = tP[idx];
            let pts = el.parts;
            let tmpObj = {
                "id": "",
                "entityType": "projects/allio100-urc9/locations/global/agents/a5d03e75-bd18-41e6-a535-49021194af78/entityTypes/0ecb752d-4fde-42e8-84d5-ed91a511ff51",
                "isList": false,
                "redact": false
            }
            for (let i = 0; i < pts.length; i++) {
                let smpA = {}
                const e = pts[i];
                let paramId = e.parameterId;
                if(paramId != ""){
                    // check if paramId is in ent.json
                    let found = ent.find(x => x.displayName == paramId);
                    if(found){
                        smpA.id = found.displayName
                        smpA.entityType = found.name
                        smpA.isList = false
                        smpA.redact = false
                        // check if smpA is already in element.parameters
                        let found2 = element.parameters.find(x => x.entityType == smpA.entityType);
                        if(!found2){
                            element.parameters.push(smpA)
                        }
                    }
                    
                    
    
                }
                
            }
        }
        return element
    })
    newArr = await Promise.all(newArr)
    setTimeout(async() => {
        await jsonfile.writeFile(file, newArr)
        .then(res => {
            console.log('Write complete')
        })
        .catch(error => console.error(error)) 
    }, 15000);
}
main()

