/**
 * 上传函数
 * @param { Buffer } file 文件buffer数据
 * @returns { Promise<DataUploadType> }
 */
interface Iupload {
  (file: Buffer): Promise<DataUploadType>;
}
export let upload: Iupload;
upload = (file: Buffer) => {
  // 生成随机请求头
  const header = randomHeader();
  return new Promise((resolve, reject) => {
    const req = Https.request(header, (res) => {
      res.on("data", (data) => {
        try {
          const resp = JSON.parse(data.toString()) as DataUploadType;
          if (resp.error) {
            reject(resp);
          } else {
            resolve(resp);
          }
        } catch (err) {
          reject(err);
        }
      });
    });
    // 上传图片buffer
    req.write(file);
    req.on("error", (err) => reject(err));
    req.end();
  });
};

/**
 * 下载函数
 * @param { string } path
 * @returns { Promise<string> }
 */
interface Idownload {
  (path: string): Promise<string>;
}
export let download: Idownload;
download = (path: string) => {
  const header = new Url.URL(path);
  return new Promise((resolve, reject) => {
    const req = Https.request(header, (res) => {
      let content = "";
      res.setEncoding("binary");
      res.on("data", (data) => (content += data));
      res.on("end", () => resolve(content));
    });
    req.on("error", (err) => reject(err));
    req.end();
  });
};
