FROM registry-vpc.cn-shenzhen-finance-1.aliyuncs.com/public/node:12.14.0
MAINTAINER kk

ADD . /app/
WORKDIR /app

RUN chmod +x /app

RUN true \
    && npm config set registry https://registry.npm.taobao.org \
        && npm i caniuse-lite browserslist  --save \
        && npm install \
        && npm run build \
        && rm -rf node_modules