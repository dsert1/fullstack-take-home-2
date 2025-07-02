from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..s3 import create_presigned_post, random_media_key

router = APIRouter(prefix="/upload", tags=["upload"])

class PresignRequest(BaseModel):
  filename: str
  contentType: str

@router.post("/presign")
def presign(body: PresignRequest):
  key = random_media_key(body.filename)
  try:
    presigned = create_presigned_post(key, body.contentType)
    return {"key": key, "presigned": presigned}
  except Exception as e:
    raise HTTPException(500, detail=str(e))
