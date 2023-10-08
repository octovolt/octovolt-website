import Link from "next/link";
import React from "react";

import cartBreadcrumbStyles from "@/app/components/cartBreadCrumbs.module.css";

interface Props {
  stepName: string;
  nextEnabled: boolean;
}

const steps = [
  {
    name: "Cart",
    href: "/cart",
  },
  {
    name: "Shipping",
    href: "/cart/shipping",
  },
  {
    name: "Checkout",
    href: "/cart/checkout",
  },
];

export default function CartBreadCrumbs({ stepName, nextEnabled }: Props): JSX.Element {
  const separator = (<span className={cartBreadcrumbStyles.separator}> &#8594; </span>);
  const currentIndex = steps.findIndex((step) => step.name.toLowerCase() === stepName.toLowerCase());

  const breadcrumbs = steps.map((step, idx) => {
    const text = currentIndex > idx || (currentIndex === idx - 1 && nextEnabled)
      ? <Link
          href={step.href}
          key={step.name}>
          {step.name}
        </Link>
      : <span
          key={step.name}
          className={currentIndex === idx ? cartBreadcrumbStyles.currentStep : cartBreadcrumbStyles.disabled}>
          {step.name}
        </span>
    return (
      <React.Fragment key={step.name}>
        {text}
        {idx < steps.length - 1 ? separator : null}
      </React.Fragment>
    );
  });

  return <p className={cartBreadcrumbStyles.container}>{breadcrumbs}</p>;
};