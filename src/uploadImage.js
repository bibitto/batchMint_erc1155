import axios, * as others from 'axios';
import * as fs from "fs";
import 'dotenv/config';
const env = process.env

const targetDir = "./export"
const fileNameList = fs.readdirSync(targetDir);

const ipfsArray = []
const promises = []

for (let i = 0; i < fileNameList.length; i++) {
    const fileName = fileNameList[i]
    promises.push(new Promise( (res, rej) => {
        fs.readFile(`${targetDir}/${fileName}`, (err, data) => {
            if(err) rej();
            ipfsArray.push({
                path: `images/${fileName}`,
                content: data.toString("base64")
            })
            res();
        })
    }))
}

Promise.all(promises).then( () => {
    axios.post(
        "https://deep-index.moralis.io/api/v2/ipfs/uploadFolder",
        ipfsArray,
        {
            headers: {
                "X-API-KEY": `${env.API_KEY}`,
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        }
    ).then( (res) => {
        console.log(res.data);
        const ipfsHash = res.data[0].path.match(/ipfs\/[a-zA-Z0-9]{1,}/)[0].replace("ipfs/", "")
        console.log(ipfsHash)
        return ipfsHash
    })
    .catch ( (error) => {
        console.log(error)
    })
})

// https://ipfs.moralis.io:2053/ipfs/QmbqEe4h4TvqsCwLpfxZHqHCkXFmMD3gsAUjyk5WsawgSe/images/0000000000000000000000000000000000000000000000000000000000000000.png