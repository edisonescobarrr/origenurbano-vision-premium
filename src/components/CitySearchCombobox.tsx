import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { searchColombiaPlaces, formatCityChoiceLabel } from "@/data/colombiaPlaces";

type CitySearchComboboxProps = {
  value: string;
  onValueChange: (slug: string) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
};

export function CitySearchCombobox({
  value,
  onValueChange,
  placeholder = "Escribe ciudad o municipio…",
  className,
  triggerClassName,
}: CitySearchComboboxProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState("");
  const [highlighted, setHighlighted] = useState(0);

  const filtered = useMemo(
    () => (draft.trim().length >= 1 ? searchColombiaPlaces(draft, 100) : []),
    [draft],
  );

  useEffect(() => {
    setHighlighted(0);
  }, [draft]);

  useEffect(() => {
    const onDocDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, []);

  const selectPlace = useCallback(
    (slug: string) => {
      onValueChange(slug);
      setFocused(false);
      setDraft("");
      inputRef.current?.blur();
    },
    [onValueChange],
  );

  const showList = focused && draft.trim().length >= 1;

  const inputDisplay = focused
    ? draft
    : value
      ? formatCityChoiceLabel(value)
      : "";

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setDraft(next);
    if (!focused) setFocused(true);
  };

  const onFocus = () => {
    setFocused(true);
    setDraft(value ? formatCityChoiceLabel(value) : "");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showList || filtered.length === 0) {
      if (e.key === "Escape") {
        e.preventDefault();
        setFocused(false);
        inputRef.current?.blur();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const place = filtered[highlighted];
      if (place) selectPlace(place.slug);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setFocused(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={wrapRef} className={cn("relative w-full", className)}>
      <Input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-expanded={showList}
        aria-autocomplete="list"
        aria-controls={showList ? "city-suggestions" : undefined}
        autoComplete="off"
        spellCheck={false}
        value={inputDisplay}
        placeholder={placeholder}
        onChange={onInputChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        className={cn(
          "h-14 px-3 bg-secondary/40 border-border/40 hover:bg-secondary/60 hover:border-gold/30 focus-visible:border-gold/40 rounded-xl text-base",
          triggerClassName,
        )}
      />

      {showList && (
        <ul
          id="city-suggestions"
          role="listbox"
          className="absolute left-0 right-0 top-full z-[100] mt-1 max-h-[min(280px,50vh)] overflow-y-auto rounded-xl border border-border/60 bg-popover text-popover-foreground shadow-lg"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-3 text-sm text-muted-foreground text-center">
              No hay coincidencias. Probá con otro nombre o departamento.
            </li>
          ) : (
            filtered.map((place, index) => (
              <li key={place.slug} role="option" aria-selected={index === highlighted}>
                <button
                  type="button"
                  className={cn(
                    "w-full text-left px-3 py-2.5 text-sm font-body transition-colors",
                    index === highlighted
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-secondary/80",
                  )}
                  onMouseEnter={() => setHighlighted(index)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectPlace(place.slug)}
                >
                  <span className="text-foreground">{place.name}</span>
                  <span className="text-muted-foreground text-xs block sm:inline sm:before:content-['\00a0·\00a0']">
                    {place.department}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}

      {focused && draft.trim().length === 0 && (
        <p className="mt-1.5 text-xs text-muted-foreground px-0.5">
          Escribí al menos una letra para ver municipios y ciudades.
        </p>
      )}
    </div>
  );
}
