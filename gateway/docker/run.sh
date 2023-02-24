#!/bin/bash
sed -i 's@${MINIO_SERVE}@'"${MINIO_SERVE}"'@' ../conf/nginx.conf
sed -i 's@${REDIS_SERVE}@'"${REDIS_SERVE}"'@' ../conf/nginx.conf
sed -i 's@${GATEWAY_SERVE}@'"${GATEWAY_SERVE}"'@' ../conf/nginx.conf
./nginx -g "daemon off;"