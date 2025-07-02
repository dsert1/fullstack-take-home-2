# backend/app/aws_session.py
import boto3, datetime
from .config import get_settings

def get_boto3_session():
  settings = get_settings()

  # --- 1. start with whatever is in env or instance profile ---
  if settings.aws_access_key_id:      # explicit static or temp creds
    sess = boto3.Session(
      aws_access_key_id=settings.aws_access_key_id,
      aws_secret_access_key=settings.aws_secret_access_key,
      aws_session_token=settings.aws_session_token,
      region_name=settings.aws_region,
    )
  else:                               # fall back to default chain
    sess = boto3.Session(region_name=settings.aws_region)

  # --- 2. in *development* optionally AssumeRole ---
  if settings.env == "development" and settings.dev_assume_role_arn:
    sts = sess.client("sts")
    res = sts.assume_role(
      RoleArn=settings.dev_assume_role_arn,
      RoleSessionName=f"cashmere-dev-{int(datetime.datetime.utcnow().timestamp())}",
    )
    creds = res["Credentials"]
    sess = boto3.Session(
      aws_access_key_id=creds["AccessKeyId"],
      aws_secret_access_key=creds["SecretAccessKey"],
      aws_session_token=creds["SessionToken"],
      region_name=settings.aws_region,
    )

  return sess
