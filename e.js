const data = require('./intsData2.json');
const jsonfile = require('jsonfile');
const file = './intsData3.json';

let arr = []

async function main(){
    let newArr = data.map(async(item) => {
        let trP = item.trainingPhrases
        let newTrP = trP.map(async(itm) => {
            let elm = itm.parts
            let newElm = elm.map(async(it) => {
                let newJk = it.parameterId
                if(newJk === 'any'){
                    it.parameterId = 'wordsVague'
                    let found2 = item.parameters.find(x => x.id == 'wordsVague');
                        if(!found2){
                            item.parameters.push(
                                {
                                    "id": "wordsVague",
                                    "entityType": "projects/allio100-urc9/locations/global/agents/a5d03e75-bd18-41e6-a535-49021194af78/entityTypes/4cdcc0af-521c-41bb-a4b6-ae722c4aae6f",
                                    "isList": false,
                                    "redact": false
                                }
                            )
                        }
                }
                return it
            })
            itm.parts = await Promise.all(newElm)
            return itm
        })
        item.trainingPhrases = await Promise.all(newTrP)
        return item
    });
    arr = await Promise.all(newArr);
    setTimeout(async() => {
        await jsonfile.writeFile(file, arr)
            .then(res => {
                console.log('Write complete')
            })
            .catch(error => console.error(error))
    }, 8000);
}
main()