#check docker is installed
docker -v
if [ $? -ne  0 ]; then
    yum install docker -y
    service docker start
fi