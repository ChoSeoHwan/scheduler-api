
SOURCE_ROOT=/ec2-user/scheduler-api

cd $SOURCE_ROOT || exit 1

# production 모드로 dependency 설치
yarn install --production

# pm2 reload
docker exec node-api pm2 reload scheduler-api