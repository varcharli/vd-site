# 使用官方的 Node.js 14 镜像作为基础镜像来构建应用
FROM node:14 AS build

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

# 使用官方的 Nginx 镜像作为基础镜像
FROM nginx:alpine

# 复制 Nginx 配置文件
COPY default.conf /etc/nginx/conf.d/default.conf

# 复制构建的 React 应用文件到 Nginx 的 html 目录
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# 暴露 Nginx 运行的端口
EXPOSE 3001

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]