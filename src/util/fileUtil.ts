// @ts-ignore
/**
 * 读取文件
 * @param file 文件对象
 * @param callback 读取成功的回调
 * @param onerror 读取失败的回调
 */
// @ts-ignore
function readFile(file : File, callback ?: Function | any, onerror ?: Function | any) : Promise | undefined {
    const reader = new FileReader();
    let returnVal = undefined;
    if (callback) {
        reader.onload = callback;
        reader.onerror = onerror;
    } else {
        returnVal = new Promise((resolve, reject) => {
            reader.onload = (event) => {
                // @ts-ignore
                resolve(event.target.result);
            };
            reader.onerror = reject;
        });
    }
    reader.readAsDataURL(file);
    return returnVal;
}




/**
 * 下载文件
 * @param filename 文件名
 * @param content 文件内容
 */
function downloadFile(filename : string, content : any) {
    // 创建隐藏的可下载链接
    let eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    let blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
}

export {readFile, downloadFile}
