import { Capitalize } from "@/utils/Captialize";
import { Badge, Table } from "@chakra-ui/react";
import React from "react";
interface RhythmoTableProps<T extends string> {
  headers: T[];
  data: Record<T, string | number | React.ReactNode>[];
}

export function RhythmoTable<T extends string>({
  headers,
  data,
}: RhythmoTableProps<T>) {
  return (
    <Table.Root size={"lg"}>
      <Table.Header pos={"sticky"} top={12}>
        <Table.Row bg={"gray.950"}>
          {headers.map((curValue) => (
            <Table.ColumnHeader borderColor={"gray.900"} color={"gray.400"}>
              {curValue}{" "}
              {curValue === "Amount" || curValue === "Charges" ? "($)" : ""}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row, rowIndex) => (
          <Table.Row key={rowIndex} bg={"transparent"}>
            {headers.map((header) => (
              <Table.Cell borderColor={"gray.900"} key={String(header)}>
                {header === "Status" ? (
                  <Badge
                    rounded={"full"}
                    size={"lg"}
                    variant={"surface"}
                    colorPalette={
                      row[header] === "pending"
                        ? "orange"
                        : row[header] === "success"
                        ? "green"
                        : "red"
                    }
                  >
                    {Capitalize(row[header] as string)}
                  </Badge>
                ) : typeof row[header] === "number" ? (
                  row[header].toLocaleString()
                ) : (
                  row[header]
                )}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default RhythmoTable;
