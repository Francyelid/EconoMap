import StockItemsList, {
  type StockItemsListProps,
} from "../StockItemsList/StockItemsList"

export default function AllStock(props: StockItemsListProps) {
  return <StockItemsList {...props} />
}
