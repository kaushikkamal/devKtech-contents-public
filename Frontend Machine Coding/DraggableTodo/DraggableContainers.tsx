import { FormEvent } from 'react';

import EachTodo from './EachTodo';
import { ITodo } from './DraggableTodo';
import { Separator } from '@/components/ui/separator';
import DraggableContainerEnum from './DraggableContainerEnum';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
                                                            <EachTodo
                                                                key={`${index}-${each.id}`}
                                                                sourceContainer={
                                                                    DraggableContainerEnum.PENDING_TASKS
                                                                }
                                                                taskIndex={
                                                                    index
                                                                }
                                                                tasks={each}
                                                                handleOnDragStart={
                                                                    handleOnDragStart
                                                                }
                                                                handleOnDragOver={
                                                                    handleOnDragOver
                                                                }
                                                                handleOnDrop={
                                                                    handleOnDrop
                                                                }
                                                                handleDelete={
                                                                    handleDelete
                                                                }
                                                            />
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
                                                            <EachTodo
                                                                key={`${index}-${each.id}`}
                                                                sourceContainer={
                                                                    DraggableContainerEnum.INPROGRESS_TASKS
                                                                }
                                                                taskIndex={
                                                                    index
                                                                }
                                                                tasks={each}
                                                                handleOnDragStart={
                                                                    handleOnDragStart
                                                                }
                                                                handleOnDragOver={
                                                                    handleOnDragOver
                                                                }
                                                                handleOnDrop={
                                                                    handleOnDrop
                                                                }
                                                                handleDelete={
                                                                    handleDelete
                                                                }
                                                            />
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
                                                            <EachTodo
                                                                key={`${index}-${each.id}`}
                                                                sourceContainer={
                                                                    DraggableContainerEnum.COMPLETED_TASKS
                                                                }
                                                                taskIndex={
                                                                    index
                                                                }
                                                                tasks={each}
                                                                handleOnDragStart={
                                                                    handleOnDragStart
                                                                }
                                                                handleOnDragOver={
                                                                    handleOnDragOver
                                                                }
                                                                handleOnDrop={
                                                                    handleOnDrop
                                                                }
                                                                handleDelete={
                                                                    handleDelete
                                                                }
                                                            />
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
