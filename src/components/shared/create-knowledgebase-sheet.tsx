import { useState } from "react";
import { Plus } from "lucide-react";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetBody,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";


export const CreateKnowledgeBaseSheet = () => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <Sheet isOpen={isOpen} setIsOpen={setIsOpen}>
            <SheetTrigger variant="primary" className="shrink-0 whitespace-nowrap">
                <Plus className="size-4" />
                Create new
            </SheetTrigger>

            <SheetContent position="right">
                <SheetHeader>
                    <div className="flex flex-col gap-0.5">
                        <SheetTitle>Create New Knowledge Base</SheetTitle>
                        <SheetDescription>
                            Best for quick answers from documents, websites and text files.
                        </SheetDescription>
                    </div>
                </SheetHeader>


                <SheetBody className="flex flex-col gap-5 p-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-700">
                            Name (Cannot be edited later) <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="text"
                            placeholder="Name"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-700">
                            Description
                        </label>
                        <Textarea rows={5} placeholder="Description" />
                    </div>
                    <div className="flex justify-end pt-2">
                        <Button
                            type="button"
                            variant="primary"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            Create
                        </Button>
                    </div>
                </SheetBody>
            </SheetContent>
        </Sheet>
    );
};