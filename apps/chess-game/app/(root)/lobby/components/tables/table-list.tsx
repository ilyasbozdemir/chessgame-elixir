import { Badge } from "@/components/ui/badge";
import type { TableDoc } from "@/models/table";
import { TableCard } from "./table-card";

interface TableListProps {
  title: string;
  items: TableDoc[];
  badgeLabel: string;
  resolve: (tableId: string | undefined) => {
    label: string;
    disabled: boolean;
    action: () => void;
  };
  renderDelete?: (table: TableDoc) => React.ReactNode;
}

export function TableList({ title, items, badgeLabel, resolve, renderDelete }: TableListProps) {
  if (!items.length) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <Badge variant="secondary" className="text-sm">{badgeLabel}</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((table) => {
          const { label, disabled, action } = resolve(table._id?.toString());

          return (
            <TableCard
              key={table._id?.toString()}
              table={table}
              label={label}
              disabled={disabled}
              action={action}
              showDelete={renderDelete?.(table)}
            />
          );
        })}
      </div>
    </section>
  );
}
