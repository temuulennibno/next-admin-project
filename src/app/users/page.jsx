"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/typography/h3";
import { UsersTable } from "./table";
import { UserCreateDialog } from "./user-create-dialog";
import { useEffect, useState } from "react";

const Users = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [limit, setLimit] = useState(10);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const handleOnDelete = (id) => {
    if (confirm("Ustgalaa shdee?")) {
      fetch("/api/users/" + id, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          setData([...data].filter((item) => item.id !== id));
        });
    }
  };

  const handleOnCreate = (values) => {
    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((newData) => {
        setData([...data, newData.data]);
        setCreateModalOpen(false);
      });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <TypographyH3>Хэрэглэгчид</TypographyH3>
            <Button variant="outline" onClick={() => setCreateModalOpen(true)}>
              Шинээр нэмэх
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <UsersTable onDelete={handleOnDelete} limit={limit} data={data} />
          <div className="flex justify-center p-8">
            {data.length > limit && (
              <Button onClick={() => setLimit(limit + 10)} variant="outline">
                Load more...
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <UserCreateDialog onCreate={handleOnCreate} open={createModalOpen} onClose={setCreateModalOpen} />
    </div>
  );
};

export default Users;
