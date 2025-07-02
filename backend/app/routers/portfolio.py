from fastapi import APIRouter, HTTPException, Depends
from ..schemas import PortfolioIn, PortfolioOut
from ..dynamo import save_portfolio, get_portfolio
from ..s3 import sign_get_url

router = APIRouter(prefix="/portfolio", tags=["portfolio"])

@router.post("/", response_model=None)
def save(data: PortfolioIn):
  print(f"Saving portfolio for user {data.userId}")
  save_portfolio(data.userId, data.dict(exclude={"userId"}))
  return {"status": "ok"}


@router.get("/{user_id}", response_model=PortfolioOut)
def load(user_id: str):
  portfolio = get_portfolio(user_id)
  if not portfolio:
    raise HTTPException(404, "portfolio not found")

  return {"userId": user_id, **portfolio}
