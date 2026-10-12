import StockItemsList, {
  type StockItemsListProps,
} from "../StockItemsList/StockItemsList"

export default function ExpiredStock(props: StockItemsListProps) {
  return <StockItemsList {...props} />
}
