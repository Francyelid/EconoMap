import StockItemsList, {
  type StockItemsListProps,
} from "../StockItemsList/StockItemsList"

export default function WarningStock(props: StockItemsListProps) {
  return <StockItemsList {...props} />
}
