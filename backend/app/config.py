from typing import Literal, List, Optional
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
  # ---------- environment ----------
  env: Literal["development", "production"] = "production"

  # ---------- base AWS creds (optional in prod) ----------
  aws_access_key_id: Optional[str] = None
  aws_secret_access_key: Optional[str] = None
  aws_session_token: Optional[str] = None

  # optional: automatically assume a different role while developing
  dev_assume_role_arn: Optional[str] = None

  # ---------- stack‑specific ----------
  aws_region: str = "us-east-1"
  s3_bucket: str = "cashmere-portfolio-media"
  dynamo_table: str = "cashmere_portfolios"
  cors_origins: List[str] = ["http://localhost:3000"]

  model_config = SettingsConfigDict(env_file=".env", extra="ignore")  # ignore stray keys

@lru_cache
def get_settings() -> Settings:
  return Settings()
