'use client';
import { cn } from '@/lib';
import { Files } from 'lucide-react';
import React, { useState } from 'react';
import { Link as LinkIcon } from 'lucide-react';

interface CopyProps {
  value: string;
  className?: string;
  iconStyle?: string;
}

export default function CopyBox({ value, className, iconStyle }: CopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        `flex space-x-2 items-center`,
        className
      )}
    >
      <LinkIcon className='size-5' />
      <span className="w-[100px] truncate text-sm">{value}</span>

      <Files
        onClick={handleCopy}
        className={cn(
          `text-[#575757]/60 ${copied && 'text-green-400'} cursor-pointer ml-3 size-4 transition`,
          iconStyle
        )}
      />
    </div>
  );
}
