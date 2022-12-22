const dialogflow = require('@google-cloud/dialogflow');
const projectId = 'allio100-urc9';
const location = 'us-central1';
const agentId = '6e25c400-26aa-46d7-bd98-c662ddba0855';

const entityClient = new dialogflow.EntityTypesClient({
    keyFile: './sa.json'
});
const agentPath = entityClient.projectAgentPath(agentId);
const entityType = {
        displayName: 'test_sizing',
        kind: 'KIND_MAP',
        entities: [
        {value: 'small', synonyms: ['small', 'petit']},
        {value: 'medium', synonyms: ['medium']},
        {value: 'large', synonyms: ['large', 'big']},
      ],
};
const request = { parent: agentPath, entityType: entityType, languageCode: 'en'  };
const response = entityClient.createEntityType(request);