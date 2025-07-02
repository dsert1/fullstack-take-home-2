from fastapi import APIRouter, HTTPException, Depends
from ..schemas import PortfolioIn, PortfolioOut
from ..dynamo import save_portfolio, get_portfolio
from ..s3 import sign_get_url

router = APIRouter(prefix="/ping", tags=["ping"])

@router.get("/", response_model=None)
def ping():
  return {"status": "ok"}
