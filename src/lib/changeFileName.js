import * as fs from 'fs'
import * as path from 'path'

/**
 * 画像ファイル（png/jpg/jpeg）をERC1155の規格（64文字）に合わせる
 * ついでに全画像の識別子をpngに変換
 */
export const renameToPngFile = (targetDir) => {
    // dir内の全てのファイルを配列に格納
    const fileNameList = fs.readdirSync(targetDir);
    // .png/jpg/jpegファイルのみを抽出
    const targetFileNames = fileNameList.filter(RegExp.prototype.test, /.*\.(png|jpg|jpeg)$/);
    console.log(targetFileNames);

    for (let i = 0; i < targetFileNames.length; i++) {
        const filePath = {}
        const prevFileName = targetFileNames[i]
        const newFileName = ("0000000000000000000000000000000000000000000000000000000000000000" + i.toString(16)).substr("-64") + ".png"
        filePath.before = path.join(targetDir, prevFileName)
        filePath.after = path.join(targetDir, newFileName)
        fs.rename(filePath.before, filePath.after, err => {
            if (err) throw err;
            console.log(filePath.before + "-->" + filePath.after);
        });
    }
}