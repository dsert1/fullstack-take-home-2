import uuid
from botocore.config import Config
from .aws_session import get_boto3_session
from .config import get_settings

settings = get_settings()

session = get_boto3_session()
# be explicit about region and v4 signing
s3 = session.client(
  "s3",
  config=Config(region_name=settings.aws_region, signature_version="s3v4"),
)

def random_media_key(filename: str) -> str:
  ext = filename.split(".")[-1]
  return f"{uuid.uuid4()}.{ext}"

def create_presigned_post(key: str, content_type: str, expires: int = 3600):
  post = s3.generate_presigned_post(
    Bucket=settings.s3_bucket,
    Key=key,
    Fields={"Content-Type": content_type},
    Conditions=[{"Content-Type": content_type}],
    ExpiresIn=expires,
  )

  # -------- critical line: point directly at the region so no 307 occurs ----
  post["url"] = (
    f"https://{settings.s3_bucket}.s3.{settings.aws_region}.amazonaws.com"
  )
  # --------------------------------------------------------------------------
  return post


def sign_get_url(key: str, expires: int = 3600) -> str:
  return s3.generate_presigned_url(
    "get_object",
    Params={"Bucket": settings.s3_bucket, "Key": key},
    ExpiresIn=expires,
  )
