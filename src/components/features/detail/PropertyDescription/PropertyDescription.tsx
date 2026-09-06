interface PropertyDescriptionProps {
  description: string;
  preview?: boolean;
}

export function PropertyDescription({ description, preview = false }: PropertyDescriptionProps) {
  const paragraphs = description
    .split(/\n\s*\n/u)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const visible = preview ? paragraphs.slice(0, 1) : paragraphs;

  return (
    <div className="space-y-4 text-base/7 text-foreground/85">
      {visible.map((paragraph, index) => (
        <p key={index} className="whitespace-pre-line">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
