import { useState, useEffect } from "react"
import { ArrowLeft, Check, Clock, DollarSign, PlusCircle, Users, Settings2, Wallet } from "lucide-react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Bill, MenuItem } from "@/types"
import ReceiptItemDialog from "@/components/receipts/ReceiptItemDialog"
import CurrencySelect from "@/components/receipts/CurrencySelect"
import { PaidBy } from "@/components/groups/detail/PaidBy"
import { EditReceiptDialog } from "@/components/receipts/EditReceiptDialog"
import { useBill } from "@/hooks/useBill"
import { PhotoUpload } from "@/components/shared/PhotoUpload"
import { useToast } from "@/hooks/use-toast"

export default function ReceiptDetail() {
  const { groupId, receiptId } = useParams<{ groupId: string; receiptId: string }>()
  const navigate = useNavigate()
  const {
    bill,
    loading,
    currencies,
    updateBillStatus,
    updateBillPaidBy,
    updateBill,
    addMenuItems,
    fetchBill,
    fetchCurrencies,
    setCurrentBill,
  } = useBill()
  const { toast } = useToast()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItem | undefined>()
  const [currency, setCurrency] = useState("USD")

  useEffect(() => {
    if (receiptId) {
      fetchBill(Number.parseInt(receiptId))
      fetchCurrencies()
    }
  }, [receiptId])

  useEffect(() => {
    if (bill) {
      setCurrency(bill.currency || "USD")
      setCurrentBill(bill)
    }
  }, [bill])

  const handleBack = () => {
    navigate(`/groups/${groupId}`)
  }

  const handleAddItem = () => {
    setSelectedItem(undefined)
    setIsDialogOpen(true)
  }

  const handleEditItem = (item: MenuItem) => {
    setSelectedItem(item)
    setIsDialogOpen(true)
  }

  const handleSaveItem = async (newItem: Omit<MenuItem, "id">) => {
    if (!bill) return

    if (selectedItem) {
      const updatedItems = bill.items.map((item) =>
        item.id === selectedItem.id ? { ...newItem, id: selectedItem.id } : item,
      )
      await updateBill(bill.id, { items: updatedItems })
    } else {
      const newItemWithId = { ...newItem, id: Math.random() }
      await addMenuItems(bill.id, [newItemWithId])
    }
    setIsDialogOpen(false)
  }

  const handleUpdateReceipt = async (updates: Partial<Bill>) => {
    if (!bill) return
    await updateBill(bill.id, updates)
    setIsEditDialogOpen(false)
  }

  const handleImageChange = async (file: File) => {
    if (!bill) return
    await updateBill(bill.id, { image: URL.createObjectURL(file) })
  }

  const handleChangePaidBy = async (billId: number, newPaidBy: string) => {
    await updateBillPaidBy(billId, newPaidBy)
  }

  const totalItems = bill?.items.reduce((sum, item) => sum + item.quantity, 0) || 0

  if (!bill || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold truncate">{bill.name}</h1>
            </div>
            <div className="flex items-center gap-4">
              <CurrencySelect
                value={currency}
                onValueChange={setCurrency}
                currencies={currencies.map((cur) => cur.value)}
              />
              <Button variant="outline" size="icon" onClick={() => setIsEditDialogOpen(true)}>
                <Settings2 className="h-4 w-4" />
              </Button>
              <Badge variant={bill.status === "settled" ? "default" : "secondary"}>
                {bill.status === "settled" ? <Check className="mr-1 h-3 w-3" /> : <Clock className="mr-1 h-3 w-3" />}
                {bill.status === "settled" ? "Settled" : "Pending"}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6 lg:p-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="aspect-[16/9] w-full overflow-hidden rounded-t-lg">
                <PhotoUpload
                  currentImage={bill.image}
                  onImageChange={handleImageChange}
                  aspectRatio="16:9"
                  showRemove
                />
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">{bill.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {new Date(bill.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={bill.image} />
                      <AvatarFallback>{bill.paidBy?.[0] || "?"}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <PaidBy
                        receiptId={bill.id}
                        currentPaidBy={bill.paidBy}
                        allMembers={bill.items.flatMap((item) => item.assignedTo) || []}
                        onChangePaidBy={handleChangePaidBy}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <h3 className="text-lg font-semibold">Items ({totalItems || 0})</h3>
                <Button onClick={handleAddItem}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {bill.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between p-4 rounded-lg border hover:bg-accent/5 cursor-pointer transition-colors"
                        onClick={() => handleEditItem(item)}
                      >
                        <div className="space-y-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.assignedTo.map((member) => (
                              <Avatar key={member.id} className="h-6 w-6 ring-2 ring-background">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name[0]}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                        <p className="font-semibold">
                          {currency} {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Summary Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="font-semibold">Receipt Summary</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">
                    {currency} {bill.amount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Split Between</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {bill.items
                      .flatMap((item) => item.assignedTo)
                      .filter((member, index, self) => index === self.findIndex((m) => m.id === member.id))
                      .map((member) => (
                        <Avatar key={member.id} className="ring-2 ring-background">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button
                    className="w-full"
                    variant={bill.status === "settled" ? "secondary" : "default"}
                    onClick={async () => {
                      const newStatus = bill.status === "settled" ? "pending" : "settled"
                      await updateBillStatus(bill.id, newStatus)
                      // Optionally, you can refetch the bill data here to ensure the UI is up-to-date
                      // await fetchBill(bill.id);
                    }}
                  >
                    {bill.status === "settled" ? (
                      <>
                        <Clock className="mr-2 h-4 w-4" />
                        Mark as Pending
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Mark as Settled
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Dialogs */}
      <ReceiptItemDialog
        open={isDialogOpen}
        item={selectedItem}
        members={bill.items[0]?.assignedTo || []}
        currency={currency}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveItem}
      />
      <EditReceiptDialog
        receipt={bill}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleUpdateReceipt}
      />
    </div>
  )
}

