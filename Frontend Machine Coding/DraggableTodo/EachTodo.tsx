import { FormEvent } from 'react';
import { Trash2 } from 'lucide-react';

import { ITodo } from './DraggableTodo';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';

interface IProps {
    sourceContainer: string;
    taskIndex: number;
    tasks: ITodo;
    handleOnDragStart: (whichContainer: string, index: number) => void;
    handleOnDragOver: (e: FormEvent) => void;
    handleOnDrop: (whichContainer: string, index?: number) => void;
    handleDelete: (whichContainer: string, index: number) => void;
}
const EachTodo = ({
    sourceContainer,
    taskIndex,
    tasks,
    handleOnDragStart,
    handleOnDragOver,
    handleOnDrop,
    handleDelete,
}: IProps) => {
    const { text } = tasks;
    return (
        <Card
            className="p-4 flex items-center justify-between gap-4 cursor-grab"
            draggable
            onDragStart={() => {
                handleOnDragStart(sourceContainer, taskIndex);
            }}
            onDragOver={handleOnDragOver}
            onDrop={(e: any) => {
                e.stopPropagation();
                handleOnDrop(sourceContainer, taskIndex);
            }}
        >
            {text}
            <CardFooter className="p-0">
                <Button
                    variant="outline"
                    className="p-2"
                    onClick={(e: any) => {
                        e.stopPropagation();
                        handleDelete(sourceContainer, taskIndex);
                    }}
                >
                    <Trash2 size={20} />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default EachTodo;
