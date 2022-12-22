const {EntityTypesClient} = require('@google-cloud/dialogflow-cx');
const dataz = require('./entsData.json')
const client = new EntityTypesClient()
const sO = require('./ents.json')

async function createEntityType(projectId, location, agentId, language, displayName, entities, kind) {

    parent = client.agentPath(projectId, location, agentId)

    let entityType = {
        displayName,
        entities,
        kind
    }

    let request = {
        parent,
        entityType,
        language
    }

    const [response] = await client.createEntityType(request);
    console.log(response)
}

// projectId = "allio100-urc9"
// location = "global"
// agentId = "a5d03e75-bd18-41e6-a535-49021194af78" 
// language = "en" 
// displayName = sO.name 
// kind = "KIND_MAP" 
// entities = sO.entries

// createEntityType(projectId, location, agentId, language, displayName, entities, kind)

dataz.map(async (item, idx) => {
    setTimeout(async() => {
        projectId = "allio100-urc9"
        location = "global"
        agentId = "a5d03e75-bd18-41e6-a535-49021194af78" 
        language = "en" 
        displayName = item.name 
        kind = "KIND_MAP" 
        entities = item.entries

        try {
            await createEntityType(projectId, location, agentId, language, displayName, entities, kind)
        } catch (error) {
        }
    }, 10000 * idx);
})