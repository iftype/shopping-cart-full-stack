import { useState } from "react";
import type { Coupon } from "../../entites/checkout/model";
import { CheckBox } from "../../shared/CheckBox";
import { BottomButton } from "../../shared/BottomButton";
import styles from "./CouponSelect.module.css";
import { ToolTip } from "../../shared/ToolTip";

const MAX_SELECT = 2;

interface CouponSelectProps {
  coupons: Coupon[];
  discountPrice: number;
  onApply: (selectedIds: string[]) => void;
}

export const CouponSelect = ({ coupons, discountPrice, onApply }: CouponSelectProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    coupons.filter((coupon) => coupon.status.apply).map((coupon) => coupon.id),
  );

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((coupon) => coupon !== id);
      if (prev.length >= MAX_SELECT) return prev;
      return [...prev, id];
    });
  };

  return (
    <div>
      <h2 className={styles.title}>쿠폰을 선택해 주세요</h2>
      <ToolTip text={`쿠폰은 최대 ${MAX_SELECT}개까지 사용할 수 있습니다.`} />

      <ul className={styles.list}>
        {coupons.map((coupon) => {
          const selected = selectedIds.includes(coupon.id);
          const usable = coupon.status.type === "USABLE";
          const disabled = !usable || (!selected && selectedIds.length >= MAX_SELECT);

          return (
            <li key={coupon.id} className={`${styles.item} ${!usable ? styles.unusable : ""}`}>
              <div className={styles.itemHeader}>
                <CheckBox
                  checked={selected}
                  onChange={() => toggle(coupon.id)}
                  disabled={disabled}
                />
                <span className={styles.name}>{coupon.name}</span>
              </div>
              <p className={styles.detail}>만료일: {coupon.expirationDate}</p>
              {coupon.status.message && <p className={styles.detail}>{coupon.status.message}</p>}
            </li>
          );
        })}
      </ul>

      <BottomButton
        onClick={() => onApply(selectedIds)}
        text={`총 ${discountPrice.toLocaleString()}원 할인 쿠폰 사용하기`}
      />
    </div>
  );
};
