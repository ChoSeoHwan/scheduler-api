
SOURCE_ROOT=/ec2-user/scheduler-api

cd $SOURCE_ROOT || exit 1

docker exec node-api ls -al /usr/src
docker exec node-api ls -al /usr/src/dist

exit 1;
# production 모드로 dependency 설치
docker exec node-api yarn install --production

# pm2 reload
docker exec node-api pm2 reload scheduler-api