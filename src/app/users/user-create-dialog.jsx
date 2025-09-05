import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export const UserCreateDialog = ({ open, onClose }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = async () => {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        imageUrl,
        lastname,
        firstname,
        email,
      }),
    });
    const { data, message } = await response.json();

    if (response.status === 200) {
      toast.success(message);
      onClose(false);
    } else {
      toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create user</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="image">Зураг</Label>
            <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} id="image" type="url" placeholder="Зураг..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastname">Овог</Label>
            <Input value={lastname} onChange={(e) => setLastname(e.target.value)} id="lastname" placeholder="Овог..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="firstname">Нэр</Label>
            <Input value={firstname} onChange={(e) => setFirstname(e.target.value)} id="firstname" placeholder="Нэр..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">И-Мэйл</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="И-Мэйл..." />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onClose(false)} variant="outline" type="button">
            Cancel
          </Button>
          <Button onClick={handleSave} type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
