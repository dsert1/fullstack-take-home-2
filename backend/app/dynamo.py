# backend/app/dynamo.py
from boto3.dynamodb.conditions import Key  # noqa
from .aws_session import get_boto3_session
from .config import get_settings

settings = get_settings()
session = get_boto3_session()
dynamodb = session.resource("dynamodb")
table = dynamodb.Table(settings.dynamo_table)

def save_portfolio(user_id: str, payload: dict) -> None:
  print(f"Saving portfolio for user {user_id}")
  print(f"Table name: {settings.dynamo_table}")
  table.put_item(Item={"userId": user_id, **payload})

def get_portfolio(user_id: str):
  resp = table.get_item(Key={"userId": user_id})
  return resp.get("Item")
