import productStyles from '../../styles/product.module.css';

interface AmountManagerProps {
  amount: number,
  onDecrement: (e: React.PointerEvent<HTMLElement>) => void,
  onIncrement: (e: React.PointerEvent<HTMLElement>) => void,
}

export default function AmountManager({ amount, onDecrement, onIncrement }: AmountManagerProps) {
  return (
    <div className={productStyles.amountManager}>
      <button className={productStyles.amountAdjustment} onPointerUp={onDecrement}>-</button>
      <div className={productStyles.amount}>{amount}</div>
      <button className={productStyles.amountAdjustment} onPointerUp={onIncrement}>+</button>
    </div>
  );
}