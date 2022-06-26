import axios, * as others from 'axios';
import * as fs from "fs";
import 'dotenv/config';
const env = process.env

const targetDir = "./export"
const fileNameList = fs.readdirSync(targetDir);
const ipfsArray = []

const ipfsHash = "QmbqEe4h4TvqsCwLpfxZHqHCkXFmMD3gsAUjyk5WsawgSe" // ←uploadImage.js実行時に出力された値を書く

for (let i = 0; i < fileNameList.length; i++) {
    const fileName = fileNameList[i]
    ipfsArray.push({
        path: `metadata/${fileName.replace('.png','.json' )}`,
        content: {
            image: `ipfs://${ipfsHash}/images/${fileName}`,
            name: `Crypto9 ECO activity NFT #${i}`,
            dscription: "no value. hahaha"
        }
    })
}


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
})
.catch ( (error) => {
    console.log(error)
})
