
import { EllipsisVertical } from "lucide-react"
import { ComponentLayout } from "../components/shared/component-layout"
import { Pagination } from "../components/shared/pagination"
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { CreateKnowledgeBaseSheet } from "../components/shared/create-knowledgebase-sheet"


const cards = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: "Test",
    description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ratione quaerat, quibusdam asperiores explicabo et perferendis. Nostrum, impedit laudantium ad voluptate, minima ut qui similique, eaque officiis pariatur et unde.",
    createdOn: "14/07/2025",
}))

export const KnowledgeBase = () => {
    return (
        <ComponentLayout title="Knowledge Base"
            headerActions={<CreateKnowledgeBaseSheet />}
            footer={
                <Pagination
                    totalItems={72}
                    label="Templates per page"
                    pageSizeOptions={[8, 16, 24, 48]}
                    defaultPageSize={8}
                    onPageChange={(page) => console.log("page →", page)}
                    onPageSizeChange={(size) => console.log("size →", size)}
                />
            }
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:grid-cols-3 border border-secondary/10 rounded-lg p-3">
                {cards.map((card) => (
                    <Card key={card.id}>
                        <CardHeader className="inline-flex justify-between items-center">
                            <CardTitle className="text-[16px]">{card.title}</CardTitle>
                            <EllipsisVertical className="size-4" />
                        </CardHeader>
                        <CardBody>
                            <CardDescription>{card.description}</CardDescription>
                        </CardBody>
                        <CardFooter className="border-t border-secondary/10 pt-4">
                            <p className="text-sm">
                                Created on: <span className="font-medium">{card.createdOn}</span>
                            </p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </ComponentLayout >
    )
}
