from typing import List, Literal, Optional
from pydantic import BaseModel, HttpUrl, Field

class MediaItem(BaseModel):
  id: str
  type: Literal["image", "video"]
  s3Key: str
  url: str  
  title: str
  description: Optional[str] = None
  metadata: dict = Field(default_factory=dict)

class Section(BaseModel):
  name: str
  items: List[MediaItem] = []

class PortfolioIn(BaseModel):
  userId: str
  title: str
  sections: List[Section]

class PortfolioOut(PortfolioIn):
  pass
