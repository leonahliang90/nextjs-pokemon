#check codedeployagent is installed
service codedeploy-agent status
if [ $? -ne  0 ]; then
    yum update -y
    yum install ruby -y
    yum install wget -y
    cd /home/ec2-user
    wget https://aws-codedeploy-ap-southeast-1.s3.ap-southeast-1.amazonaws.com/latest/install
    chmod +x ./install
    ./install auto
    service codedeploy-agent start
fi