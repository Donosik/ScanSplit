from pydantic import BaseModel, Field

class ReceiptImageInformation(BaseModel):
    """Information about the receipt image"""
    id: str = Field(..., description="The unique identifier of the receipt image")
    total: float = Field(..., description="The total amount of the receipt")
    items: list[dict] = Field(..., description="The list of items in the receipt with prices")
    location: str = Field(..., description="The location of the store/restaurant where the receipt was issued")
    date: str = Field(..., description="The date when the receipt was issued")