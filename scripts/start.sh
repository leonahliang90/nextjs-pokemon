
# login
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 560002854641.dkr.ecr.ap-southeast-1.amazonaws.com

# stop all running images
docker stop $(docker ps -a -q)
docker system prune -f

# pull docker image
docker pull 560002854641.dkr.ecr.ap-southeast-1.amazonaws.com/pokemon

# start image
docker run --restart=always -td -p 80:3000 560002854641.dkr.ecr.ap-southeast-1.amazonaws.com/pokemon