import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Input } from 'ui/input';
import { Badge } from 'ui/badge';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
}

export function TagInput({
  tags,
  onChange,
  placeholder = 'Add tags...',
  suggestions = []
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      onChange([...tags, trimmedValue]);
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    onChange(newTags);
  };

  const addSuggestionTag = (suggestion: string) => {
    if (!tags.includes(suggestion)) {
      onChange([...tags, suggestion]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 p-3 min-h-[2.5rem] border border-input rounded-md bg-background focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-accent/20 text-accent hover:bg-accent/30 flex items-center gap-1"
          >
            {tag}
            <X
              className="h-3 w-3 cursor-pointer hover:text-destructive"
              onClick={() => removeTag(index)}
            />
          </Badge>
        ))}
        <Input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="border-0 bg-transparent p-0 h-auto min-w-[120px] flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {suggestions
            .filter(suggestion => !tags.includes(suggestion))
            .slice(0, 10)
            .map(suggestion => (
              <Badge
                key={suggestion}
                variant="outline"
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground text-xs"
                onClick={() => addSuggestionTag(suggestion)}
              >
                + {suggestion}
              </Badge>
            ))}
        </div>
      )}
    </div>
  );
}
