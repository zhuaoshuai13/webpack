/**
 * 接收进程任务
 */
process.on("message", (tasks: imageType[]) => {
  (async () => {
    // 优化 png/jpg
    const data = tasks
      .filter(({ path }: { path: string }) => /\.(jpe?g|png)$/.test(path))
      .map((ele) => {
        return compressImg({ ...ele, file: Buffer.from(ele.file) });
      });

    // 优化 svga
    const svgaData = tasks
      .filter(({ path }: { path: string }) => /\.(svga)$/.test(path))
      .map((ele) => {
        return compressSvga(ele.path, Buffer.from(ele.file));
      });

    const details = await Promise.all([...data.map((fn) => fn()), ...svgaData.map((fn) => fn())]);

    // 写入
    await Promise.all(
      details.map(
        ({ path, file }) =>
          new Promise((resolve, reject) => {
            fs.writeFile(path, file, (err) => {
              if (err) reject(err);
              resolve(true);
            });
          })
      )
    );

    // 发送结果
    if (process.send) {
      process.send(details);
    }
  })();
});

/**
 * 压缩图片
 * @param { imageType } 图片资源
 * @returns { promise<Idetail> }
 */
interface IcompressImg {
  (payload: imageType): () => Promise<Idetail>;
}
let compressImg: IcompressImg;
compressImg = ({ path, file }: imageType) => {
  return async () => {
    const result = {
      input: 0,
      output: 0,
      ratio: 0,
      path,
      file,
      msg: "",
    };
    try {
      // 上传
      const dataUpload = await upload(file);

      // 下载
      const dataDownload = await download(dataUpload.output.url);

      result.input = dataUpload.input.size;
      result.output = dataUpload.output.size;
      result.ratio = 1 - dataUpload.output.ratio;
      result.file = Buffer.alloc(dataDownload.length, dataDownload, "binary");
    } catch (err) {
      result.msg = `[${chalk.blue(path)}] ${chalk.red(JSON.stringify(err))}`;
    }
    return result;
  };
};
