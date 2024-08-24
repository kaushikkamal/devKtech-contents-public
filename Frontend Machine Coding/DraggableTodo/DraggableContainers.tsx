import { FormEvent } from 'react';
import { Trash2 } from 'lucide-react';

import { ITodo } from './DraggableTodo';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import DraggableContainerEnum from './DraggableContainerEnum';

interface IProps {
    pendingTasks: ITodo[];
    inProgressTasks: ITodo[];
    completedTasks: ITodo[];
    dragCaptureClass: string;
    handleOnDragStart: (whichContainer: string, index: number) => void;
    handleOnDragOver: (e: FormEvent) => void;
    handleOnDrop: (whichContainer: string, index?: number) => void;
    handleDelete: (whichContainer: string, index: number) => void;
}

const DraggableContainers = ({
    pendingTasks,
    inProgressTasks,
    completedTasks,
    dragCaptureClass,
    handleOnDragStart,
    handleOnDragOver,
    handleOnDrop,
    handleDelete,
}: IProps) => {
    return (
        <div className="w-full flex flex-col md:flex-row flex-wrap gap-8">
            {DraggableContainerEnum &&
                Object.values(DraggableContainerEnum).map(
                    (each: string, containerIndex) => {
                        return (
                            <Card
                                key={containerIndex}
                                className={`flex flex-col flex-grow border-primary/20 cursor-default ${dragCaptureClass}`}
                                onDragOver={handleOnDragOver}
                                onDrop={() => handleOnDrop(each, 0)}
                            >
                                <CardHeader>
                                    <CardTitle>{each}</CardTitle>
                                </CardHeader>
                                <Separator />
                                <CardContent className="p-5">
                                    <div className="w-[100%] h-full flex flex-col gap-3">
                                        {each ===
                                            DraggableContainerEnum.PENDING_TASKS &&
                                            (pendingTasks.length !== 0 ? (
                                                pendingTasks.map(
                                                    (
                                                        each: ITodo,
                                                        index: number,
                                                    ) => {
                                                        return (
                                                            <Card
                                                                key={index}
                                                                className="p-4 flex items-center justify-between gap-4"
                                                                draggable
                                                                onDragStart={() => {
                                                                    handleOnDragStart(
                                                                        DraggableContainerEnum.PENDING_TASKS,
                                                                        index,
                                                                    );
                                                                }}
                                                                onDragOver={
                                                                    handleOnDragOver
                                                                }
                                                                onDrop={(e) => {
                                                                    e.stopPropagation();
                                                                    handleOnDrop(
                                                                        DraggableContainerEnum.PENDING_TASKS,
                                                                        index,
                                                                    );
                                                                }}
                                                            >
                                                                {each.text}
                                                                <CardFooter className="p-0">
                                                                    <Button
                                                                        variant="outline"
                                                                        className="p-2"
                                                                        onClick={(
                                                                            e: any,
                                                                        ) => {
                                                                            e.stopPropagation();
                                                                            handleDelete(
                                                                                DraggableContainerEnum.PENDING_TASKS,
                                                                                index,
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Trash2 />
                                                                    </Button>
                                                                </CardFooter>
                                                            </Card>
                                                        );
                                                    },
                                                )
                                            ) : (
                                                <p>No Available Tasks</p>
                                            ))}
                                        {each ===
                                            DraggableContainerEnum.INPROGRESS_TASKS &&
                                            (inProgressTasks.length !== 0 ? (
                                                inProgressTasks.map(
                                                    (
                                                        each: ITodo,
                                                        index: number,
                                                    ) => {
                                                        return (
                                                            <Card
                                                                key={index}
                                                                className="p-4 flex items-center justify-between gap-4"
                                                                draggable
                                                                onDragStart={() => {
                                                                    handleOnDragStart(
                                                                        DraggableContainerEnum.INPROGRESS_TASKS,
                                                                        index,
                                                                    );
                                                                }}
                                                                onDragOver={
                                                                    handleOnDragOver
                                                                }
                                                                onDrop={(e) => {
                                                                    e.stopPropagation();
                                                                    handleOnDrop(
                                                                        DraggableContainerEnum.INPROGRESS_TASKS,
                                                                        index,
                                                                    );
                                                                }}
                                                            >
                                                                {each.text}
                                                                <CardFooter className="p-0">
                                                                    <Button
                                                                        variant="outline"
                                                                        className="p-2"
                                                                        onClick={(
                                                                            e: any,
                                                                        ) => {
                                                                            e.stopPropagation();
                                                                            handleDelete(
                                                                                DraggableContainerEnum.INPROGRESS_TASKS,
                                                                                index,
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Trash2 />
                                                                    </Button>
                                                                </CardFooter>
                                                            </Card>
                                                        );
                                                    },
                                                )
                                            ) : (
                                                <p>No Available Tasks</p>
                                            ))}
                                        {each ===
                                            DraggableContainerEnum.COMPLETED_TASKS &&
                                            (completedTasks.length !== 0 ? (
                                                completedTasks.map(
                                                    (
                                                        each: ITodo,
                                                        index: number,
                                                    ) => {
                                                        return (
                                                            <Card
                                                                key={index}
                                                                className="p-4 flex items-center justify-between gap-4"
                                                                draggable
                                                                onDragStart={() => {
                                                                    handleOnDragStart(
                                                                        DraggableContainerEnum.COMPLETED_TASKS,
                                                                        index,
                                                                    );
                                                                }}
                                                                onDragOver={
                                                                    handleOnDragOver
                                                                }
                                                                onDrop={(e) => {
                                                                    e.stopPropagation();
                                                                    handleOnDrop(
                                                                        DraggableContainerEnum.COMPLETED_TASKS,
                                                                        index,
                                                                    );
                                                                }}
                                                            >
                                                                {each.text}
                                                                <CardFooter className="p-0">
                                                                    <Button
                                                                        variant="outline"
                                                                        className="p-2"
                                                                        onClick={(
                                                                            e: any,
                                                                        ) => {
                                                                            e.stopPropagation();
                                                                            handleDelete(
                                                                                DraggableContainerEnum.COMPLETED_TASKS,
                                                                                index,
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Trash2 />
                                                                    </Button>
                                                                </CardFooter>
                                                            </Card>
                                                        );
                                                    },
                                                )
                                            ) : (
                                                <p>No Available Tasks</p>
                                            ))}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    },
                )}
        </div>
    );
};

export default DraggableContainers;
