const {IntentsClient} = require('@google-cloud/dialogflow-cx');
const intentClient = new IntentsClient();
const uuid = require('uuid');
let errArr = []
const dataz = require('./intsData3.json');
const jsonfile = require('jsonfile')
const file = './errInts.json'
// create intent
async function createIntent(projectId, location, agentId, displayName, trainingPhrases, parameters) {
    const parent = intentClient.agentPath(projectId, location, agentId);
    if(trainingPhrases.length > 0){
        const intent = {
            displayName,
            trainingPhrases: trainingPhrases,
            priority: 500000,
            isFallback: false,
            parameters: parameters
        };
        const request = {
            parent,
            intent,
        };
        const [response] = await intentClient.createIntent(request);
        console.log(response);
    }else{
        // const intent = {
        //     displayName,
        //     priority: 500000,
        //     isFallback: false,
    
        // };
        // const request = {
        //     parent,
        //     intent,
        // };
        // const [response] = await intentClient.createIntent(request);
        // console.log(response);
    }
    
}
//createIntent(projectId, location, agentId, displayName, trainingPhrases);

async function main() {
    for (let index = 0; index < dataz.length; index++) {
        const item = dataz[index];
        const projectId = 'allio100-urc9';
        const agentId = 'a5d03e75-bd18-41e6-a535-49021194af78';
        const location = 'global';
        let displayName = item.displayName;
        const trainingPhrases = item.trainingPhrases;
        const parameters = item.parameters;
        setTimeout(async() => {
            try {
                await createIntent(projectId, location, agentId, displayName, trainingPhrases, parameters); 
            } catch (error) {
                errArr.push(item)
            }
        }, 10000 * index);
    }
}
async function run(){
    await main();
    await jsonfile.writeFile(file, errArr)
}
run()
