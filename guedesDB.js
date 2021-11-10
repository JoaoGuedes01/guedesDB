const path = require('path');
const fs = require('fs');
const home = require('os').homedir();
let mainDir;
let collectionsDir;

let collectionInitData = {
    data: [],
    index: 0
}

const SetupFolders = (config) => {
    try {
        //If the user wants the DB set locally inside the project
        if (config.storage == 'local') {
            mainDir = './guedesDB';
            collectionsDir = './guedesDB/Collections';
            auxDir = './guedesDB/backers';

            if (!fs.existsSync(mainDir)) {
                console.log('Creating guedesDB locally');
                fs.mkdirSync(mainDir);
            }

            if (!fs.existsSync(collectionsDir)) {
                console.log('Creating collections for guedesDB');
                fs.mkdirSync(collectionsDir);
            }

            console.log('GuedesDB ready')

        }
        //If the user wants the DB set globally in their documents folder to be accessed by all projects
        else if (config.storage == 'global') {
            mainDir = home + '/Documents/guedesDB';
            collectionsDir = home + '/Documents/guedesDB/Collections';
            auxDir = home + '/Documents/guedesDB/backers';

            if (!fs.existsSync(mainDir)) {
                console.log('Creating guedesDB globally');
                fs.mkdirSync(mainDir);
            }

            if (!fs.existsSync(collectionsDir)) {
                console.log('Creating collections for guedesDB');
                fs.mkdirSync(collectionsDir);
            }

            console.log('GuedesDB ready')
        }
    } catch (error) {
        console.log('You need a config file well configured');
        console.log('Error: ' + error);
    }
}

const GetAllObjects = async (type) => {
    //Normalizing the collection names and setting up collection file path
    const lowertype = type.toLowerCase();
    const fileName = lowertype + '.json';
    const filePath = collectionsDir + '/' + fileName;
    const data = await fs.promises.readFile(filePath, 'utf8');
    let jsonObj = await JSON.parse(data);
    return jsonObj.data;
}

const GetByID = async (type, id) => {
    const lowertype = type.toLowerCase();
    const fileName = lowertype + '.json';
    const filePath = collectionsDir + '/' + fileName;
    const data = await fs.promises.readFile(filePath, 'utf8');
    let jsonObj = await JSON.parse(data);
    let objectArr = jsonObj.data;
    let result;
    objectArr.forEach(object => {
        if (object.id == id) {
            result = object;
        }
    });
    return result || 'Could not find record';
}

const GetByAttribute = async (type, atribute, atributeValue) => {
    const lowertype = type.toLowerCase();
    const fileName = lowertype + '.json';
    const filePath = collectionsDir + '/' + fileName;
    const data = await fs.promises.readFile(filePath, 'utf8');
    let jsonObj = await JSON.parse(data);
    let objectArr = jsonObj.data;
    let result = [];
    objectArr.forEach(object => {
        if (object[atribute] == atributeValue) {
            result.push(object);
        }
    });
    return result;
}

const UpdateObject = async (type, id, newData) => {
    const lowertype = type.toLowerCase();
    const fileName = lowertype + '.json';
    const filePath = collectionsDir + '/' + fileName;
    const data = await fs.promises.readFile(filePath, 'utf8');
    let jsonObj = await JSON.parse(data);
    let objectArr = jsonObj.data;
    objectArr.forEach(object => {
        if (object.id == id) {
            for (let atribute in newData) {
                object[atribute] = newData[atribute];
            }
        }
    });
    jsonObj = JSON.stringify(jsonObj);
    fs.writeFile(filePath, jsonObj, 'utf8', (err) => {
        if (err) {
            console.log(err);
        }
    })
}

const createObject = (type, objData) => {
    //Normalizing the collection names and setting up collection file path
    const lowertype = type.toLowerCase();
    const fileName = lowertype + '.json';
    const filePath = collectionsDir + '/' + fileName;

    //Create json file for collection if not exists
    if (!fs.existsSync(filePath)) {
        console.log(fileName + ' does not exist');
        console.log('Creating ' + fileName);
        let init = JSON.stringify(collectionInitData);
        fs.writeFile(filePath, init, 'utf8', (err) => {
            if (err) {
                throw err;
            }
        })
    }

    //Append new data to already existing json file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            obj = JSON.parse(data);
            objData.id = obj.index;
            obj.data.push(objData);
            obj.index++;
            jsonObj = JSON.stringify(obj);
            fs.writeFile(filePath, jsonObj, 'utf8', (err) => {
                if (err) {
                    console.log(err);
                }
            })
        }
    })
}

const DeleteObject = async (type,id) => {
    const lowertype = type.toLowerCase();
    const fileName = lowertype + '.json';
    const filePath = collectionsDir + '/' + fileName;
    const data = await fs.promises.readFile(filePath, 'utf8');
    let jsonObj = await JSON.parse(data);
    let objectArr = jsonObj.data;
    objectArr.forEach(object => {
        if (object.id == id) {
            objectArr.splice(objectArr.indexOf(object),1);
        }
    });
    jsonObj = JSON.stringify(jsonObj);
    fs.writeFile(filePath, jsonObj, 'utf8', (err) => {
        if (err) {
            console.log(err);
        }
    })
}


module.exports = {
    SetupFolders: SetupFolders,
    createObject: createObject,
    GetAllObjects: GetAllObjects,
    GetByID: GetByID,
    GetByAttribute: GetByAttribute,
    UpdateObject: UpdateObject,
    DeleteObject: DeleteObject
}