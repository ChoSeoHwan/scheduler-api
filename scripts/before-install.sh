#!/bin/sh

# directory 설정
SOURCE_ROOT=/ec2-user/scheduler-api
BACKUP_ROOT=/ec2-user/backup

# 기존 백업 제거
rm -rf $BACKUP_ROOT

# 현재 소스 백업
mkdir $BACKUP_ROOT
cd $SOURCE_ROOT || exit 1
cp -r ./* $BACKUP_ROOT

# 현재 소스 제거
sudo rm -rf $SOURCE_ROOT/*