
SOURCE_ROOT=/ec2-user/scheduler-api
DOCKER_SOURCE_ROOT=/usr/src

cd $SOURCE_ROOT || exit 1

docker exec node-api cd $DOCKER_SOURCE_ROOT

# production 모드로 dependency 설치
docker exec node-api yarn install --production

# pm2 reload
docker exec node-api pm2 reload scheduler-api