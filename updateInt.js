'use strict';
 const projectId = 'your-project-id';
const agentId = 'your-agent-id';
const intentId = 'your-intent-id';
const location = 'your-location';
const displayName = 'your-display-name';
async function main(projectId, agentId, intentId, location, displayName) {
  // [START dialogflow_cx_update_intent]

  const {IntentsClient} = require('@google-cloud/dialogflow-cx');

  const intentClient = new IntentsClient();

  //TODO(developer): Uncomment these variables before running the sample.
  

  async function updateIntent() {
    const agentPath = intentClient.projectPath(projectId);
    const intentPath = `${agentPath}/locations/${location}/agents/${agentId}/intents/${intentId}`;

    //Gets the intent from intentPath
    const intent = await intentClient.getIntent({name: intentPath});
    intent[0].displayName = displayName;
    intent[0].priority = 500000;
    intent[0].isFallback = false;
    

    //Specifies what is being updated
    const updateMask = {
      paths: ['display_name'],
    };

    const updateIntentRequest = {
      intent: intent[0],
      updateMask,
      languageCode: 'en',
    };
    const createIntentResponse = {

    }

    //Send the request for update the intent.
    const result = await intentClient.updateIntent(updateIntentRequest);
    const res1 = await intentClient.createIntent(updateIntentRequest);
    console.log(result);
  }

  updateIntent();

  // [END dialogflow_cx_update_intent]
}

