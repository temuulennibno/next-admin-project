"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/typography/h3";
import { UsersTable } from "./table";
import { UserCreateDialog } from "./user-create-dialog";
import { useEffect, useState } from "react";
import { UserEditDialog } from "./user-edit-dialog";
import { toast } from "sonner";

const Users = () => {
  const [limit, setLimit] = useState(10);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch("/api/users/" + id, {
      method: "DELETE",
    });
    const apiData = await response.json();
    if (response.status !== 200) {
      toast.error(apiData.message);
    } else {
      setData(data.filter((item) => item.id !== id));
      toast.success(apiData.message);
    }
  };

  const handleSave = async (values) => {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const { data: newData, message } = await response.json();

    if (response.status === 200) {
      toast.success(message);
      setCreateModalOpen(false);
      setData([...data, newData]);
    } else {
      toast.error(message);
    }
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
          <UsersTable onDeleteUser={handleDelete} onEditUser={setEditingUser} limit={limit} data={data} />
          <div className="flex justify-center p-8">
            {limit < data.length && (
              <Button
                variant="outline"
                onClick={() => {
                  setLimit(limit + 10);
                }}
              >
                Load more...
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <UserCreateDialog open={createModalOpen} onCreateUser={handleSave} onClose={setCreateModalOpen} />
      <UserEditDialog user={editingUser} open={Boolean(editingUser)} onClose={setEditingUser} />
    </div>
  );
};

export default Users;
