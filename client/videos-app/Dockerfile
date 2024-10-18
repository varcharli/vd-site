# 使用官方的 Node.js 14 镜像作为基础镜像
FROM node:14

# 设置工作目录为 /usr/src/app
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目的所有文件到工作目录
COPY . .

# 构建 React 应用
RUN npm run build

# 安装 serve 包用于提供静态文件服务
RUN npm install -g serve

# 设置环境变量以指定 serve 的目录
ENV SERVE_DIRECTORY=/usr/src/app/build

# 暴露应用程序运行的端口
EXPOSE 5000

# 使用 serve 提供静态文件服务
CMD ["serve", "-s", "build", "-l", "5000"]