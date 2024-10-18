# 使用官方的 Node.js 14 镜像作为基础镜像
FROM node:14

# 设置工作目录为 /usr/src/app
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install --production

# 复制项目的所有文件到工作目录
COPY . .

# 暴露应用程序运行的端口
EXPOSE 3000

# 定义容器启动时运行的命令
CMD ["npm", "start"]