const jsonfile = require('jsonfile')
const file = './int.json'
const projectId = 'allio100-urc9';
const location = 'global';
const agentId = 'a5d03e75-bd18-41e6-a535-49021194af78';
async function main(projectId, location, agentId) {
    // [START dialogflow_cx_list_intents]
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    
  
    // Imports the Google Cloud Some API library
    const {IntentsClient} = require('@google-cloud/dialogflow-cx');
    /**
     * Example for regional endpoint:
     *   const location = 'us-central1'
     *   const client = new SessionsClient({apiEndpoint: 'us-central1-dialogflow.googleapis.com'})
     */
    const client = new IntentsClient();
  
    async function listIntents() {
      const parent = client.agentPath(projectId, location, agentId);
      console.info(parent);
  
      const [intents] = await client.listIntents({
        parent,
        pageSize: 100,
      });
      await jsonfile.writeFile(file, intents)
        .then(res => {
            console.log('Write complete')
        })
        .catch(error => console.error(error))
      intents.forEach(intent => {
        console.log('====================');
        console.log(`Intent name: ${intent.name}`);
        console.log(`Intent display name: ${intent.displayName}`);
        console.log(`# Parameters: ${intent.parameters.length}`);
        console.log(`# Training Phrases: ${intent.trainingPhrases.length}`);
      });
    }
  
    listIntents();
    // [END dialogflow_cx_list_intents]
  }
  
main(projectId, location, agentId)