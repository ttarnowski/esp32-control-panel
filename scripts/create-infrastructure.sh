#!/bin/bash

export BUCKET_NAME=BUCKET_NAME_PLACEHOLDER
export REGION=REGION_PLACEHOLDER

# disable pager
export AWS_PAGER=""

# create bucket
aws s3api create-bucket --no-paginate --bucket $BUCKET_NAME --region $REGION --create-bucket-configuration LocationConstraint=$REGION

# upload files to the bucket
aws s3 sync ./dist s3://$BUCKET_NAME

# upload bucket policy
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://./infrastructure/bucket_policy.json

# create s3 website
aws s3 website s3://$BUCKET_NAME/ --index-document index.html --error-document index.html
