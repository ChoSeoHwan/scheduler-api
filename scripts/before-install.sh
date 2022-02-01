#!/bin/sh

SOURCE_ROOT=/ec2-user/scheduler-api
BACKUP_ROOT=/ec2-user/backup

rm -rf $BACKUP_ROOT
mkdir $BACKUP_ROOT

cd $SOURCE_ROOT || exit 1
sudo cp -r ./* $BACKUP_ROOT
