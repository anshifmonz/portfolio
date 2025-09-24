import { ReactNode, MouseEventHandler } from 'react';
import Link from 'next/link';
import { Button } from 'ui/button';

interface ActionButtonProps {
  name: string;
  href?: string; // optional
  icon?: ReactNode;
  variant?: 'hire' | 'talk';
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
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
  type = 'button'
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

  if (href) {
    return (
      <Link href={href}>
        <Button className={`${buttonClass} ${className || ''}`}>
          {icon && <span className="mr-2">{icon}</span>}
          {name}
        </Button>
      </Link>
    );
  }

  // render as normal button
  return (
    <Button type={type} onClick={onClick} className={`${buttonClass} ${className || ''}`}>
      {icon && <span className="mr-2">{icon}</span>}
      {name}
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
