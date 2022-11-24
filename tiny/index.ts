/**
 * 递归找出所有图片
 * @param { string } path
 * @returns { Array<imageType> }
 */
interface IdeepFindImg {
  (path: string): Array<imageType>;
}
let deepFindImg: IdeepFindImg;
deepFindImg = (path: string) => {
  // 读取文件夹的内容
  const content = fs.readdirSync(path);
  // 用于保存发现的图片
  let images: Array<imageType> = [];
  // 遍历该文件夹内容
  content.forEach((folder) => {
    const filePath = resolve(path, folder);
    // 获取当前内容的语法信息
    const info = fs.statSync(filePath);
    // 当前内容为“文件夹”
    if (info.isDirectory()) {
      // 对该文件夹进行递归操作
      images = [...images, ...deepFindImg(filePath)];
    } else {
      const fileNameReg = /\.(jpe?g|png|svga)$/;
      const shouldFormat = fileNameReg.test(filePath);
      // 判断当前内容的路径是否包含图片格式
      if (shouldFormat) {
        // 读取图片内容保存到images
        const imgData = fs.readFileSync(filePath);
        images.push({
          path: filePath,
          file: imgData,
        });
      }
    }
  });
  return images;
};

cluster.setupPrimary({
  exec: resolve(__dirname, "features/process.js"),
});

// 若资源数小于则创建一个进程，否则创建多个进程
const works: Array<{
  work: Worker;
  tasks: Array<imageType>;
}> = [];
if (list.length <= cpuNums) {
  works.push({
    work: cluster.fork(),
    tasks: list,
  });
} else {
  for (let i = 0; i < cpuNums; ++i) {
    const work = cluster.fork();
    works.push({
      work,
      tasks: [],
    });
  }
}

// 平均分配任务
let workNum = 0;
list.forEach((task) => {
  if (works.length === 1) {
    return;
  } else if (workNum >= works.length) {
    works[0].tasks.push(task);
    workNum = 1;
  } else {
    works[workNum].tasks.push(task);
    workNum += 1;
  }
});

// 用于记录进程完成数
let pageNum = works.length;

// 初始化进度条
// ...

works.forEach(({ work, tasks }) => {
  // 发送任务到每个进程
  work.send(tasks);
  // 接收任务完成
  work.on("message", (details: Idetail[]) => {
    // 更新进度条
    // ...
    pageNum--;
    // 所有任务执行完毕
    if (pageNum === 0) {
      // 关闭进程
      cluster.disconnect();
    }
  });
});
