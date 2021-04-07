import instance from "@/web/axios";

export async function updateFile(fileOrFileArr : File | Array<File>) : Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            if (!Array.isArray(fileOrFileArr)) {
                let data = await instance.post("web_public/upload_picture", {
                    file: fileOrFileArr,
                    _useForm: true,
                });
                resolve(data);
            } else {
                let arr = fileOrFileArr.map((file) => {
                    return instance.post("web_public/upload_picture", {
                        file: fileOrFileArr,
                        _useForm: true,
                    });
                });
                let data = await Promise.all(arr);
                resolve(data);
            }
        } catch (e) {
            reject(e);
        }
    });
}
