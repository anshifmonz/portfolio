import { ReactNode, MouseEventHandler } from 'react';
import Link from 'next/link';
import { Button } from 'ui/button';

interface ActionButtonProps {
  name: [string, string] | string; // string OR [default, processing]
  href?: string;
  icon?: ReactNode;
  variant?: 'hire' | 'talk';
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: 'button' | 'submit' | 'reset';
  isProcessing?: boolean; // controls label state
}

interface ActionButtonsGroupProps {
  buttons: Array<ActionButtonProps>;
  className?: string;
}

export function ActionButton({
  name,
  href,
  icon,
  variant = 'hire',
  className,
  onClick,
  type = 'button',
  isProcessing = false
}: ActionButtonProps) {
  const variantClasses = {
    hire: 'bg-transparent text-accent transition-[0.3s] hover:bg-accent hover:text-accent-foreground',
    talk: 'bg-accent text-accent-foreground hover:bg-transparent hover:text-accent'
  };

  const buttonClass = `
    flex items-center justify-center
    px-4 py-3 min-w-[100px] sm:min-w-[120px] h-[38px]
    border-2 border-solid border-accent
    text-sm font-semibold tracking-[1px] cursor-pointer rounded-lg
    transition-[0.3s]
    ${variantClasses[variant]}
  `;

  // resolve label
  const label = Array.isArray(name) ? (isProcessing ? name[1] : name[0]) : name;

  if (href) {
    return (
      <Link href={href}>
        <Button className={`${buttonClass} ${className || ''}`} onClick={onClick}>
          {icon && <span className="mr-2">{icon}</span>}
          {label}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      type={type}
      onClick={onClick}
      className={`${buttonClass} ${className || ''}`}
      disabled={isProcessing}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Button>
  );
}

export function ActionButtonsGroup({ buttons, className }: ActionButtonsGroupProps) {
  return (
    <div className={`flex justify-center gap-4 w-full sm:w-auto ${className || ''}`}>
      {buttons.map((btn, idx) => (
        <ActionButton key={idx} {...btn} />
      ))}
    </div>
  );
}
