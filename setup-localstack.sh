set -eou pipefail

awslocal s3api create-bucket \
    --bucket learn-aws-s3-lambda-elasticache \
    --region ap-southeast-1 \
    --create-bucket-configuration LocationConstraint=ap-southeast-1

awslocal s3api put-object \
    --bucket learn-aws-s3-lambda-elasticache \
    --key items.csv --body items.csv \
    --region ap-southeast-1

awslocal secretsmanager create-secret \
  --name learn-aws-s3-lambda-elasticache \
  --secret-string '[{"REDIS_ENDPOINT":"localhost","REDIS_PORT":"6380"}]' \
  --region ap-southeast-1
