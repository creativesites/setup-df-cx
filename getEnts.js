const jsonfile = require('jsonfile')
// Imports the Cx library
const {EntityTypesClient} = require('@google-cloud/dialogflow-cx').v3beta1;
  
// Instantiates a client
const cxClient = new EntityTypesClient();
const file = './ent.json'
const projectId = 'allio100-urc9';
const location = 'global';
const agentId = 'a5d03e75-bd18-41e6-a535-49021194af78';
const parent = cxClient.agentPath(projectId, location, agentId);
console.info(parent);
let arr = []
async function main(parent) {
    
    async function callListEntityTypes() {
      // Construct request
      const request = {
        parent,
        pageSize: 100,
      };
  
      // Run request
      const iterable = await cxClient.listEntityTypesAsync(request);
      
      
      for await (const response of iterable) {
          console.log(response);
            arr.push(response)
      }
    }
  
    await callListEntityTypes();
    // [END dialogflow_v3beta1_generated_EntityTypes_ListEntityTypes_async]
}
main(parent)
setTimeout(async() => {
    await jsonfile.writeFile(file, arr)
        .then(res => {
            console.log('Write complete')
        })
        .catch(error => console.error(error))
}, 8000);