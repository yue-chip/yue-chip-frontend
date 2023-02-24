FROM ubuntu:22.04
MAINTAINER smartlinks smartlinks@smartlinks.com.cn
COPY lion-frontend-gateway/ /opt/lion-frontend-gateway/
COPY nginx/ /usr/local/nginx/
COPY run.sh /usr/local/nginx/sbin/
COPY sources.list /etc/apt/
ENV LANG C.UTF-8
ENV TZ Asia/Shanghai
ENV REDIS_SERVE 127.0.0.1
ENV REDIS_SERVE_PORT 6379
ENV MINIO_SERVE 127.0.0.1:9000
ENV GATEWAY_SERVE 127.0.0.1:8080
RUN apt update && echo "${TZ}" > /etc/timezone && ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime &&  apt -y install curl wget vim  build-essential lua5.3 openssl libssl-dev libpcre3 libpcre3-dev zlib1g-dev tzdata && rm -rf /var/lib/apt/lists/* make && make -C /opt/lion-frontend-gateway/LuaJIT-2.0.5 && make -C /opt/lion-frontend-gateway/LuaJIT-2.0.5 install && export LUAJIT_LIB=/usr/local/lib && export LUAJIT_INC=/usr/local/include/luajit-2.0
RUN rm -rf /opt/lion-frontend-gateway
EXPOSE 80/tcp
WORKDIR /usr/local/nginx/sbin/
ENTRYPOINT ["/bin/sh","-c","./run.sh"]