import { FormEvent, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DraggableContainers from './DraggableContainers';
import DraggableContainerEnum from './DraggableContainerEnum';

export interface ITodo {
    id: string;
    text: string;
}

interface IDraggedItem {
    container: string;
    index: number;
}

const initialPendingTodo: ITodo[] = [
    { id: '1', text: 'Buy Groceries' },
    { id: '1', text: 'Wash Cloth' },
    { id: '2', text: 'Make Food' },
];

const initialInProgressTodo: ITodo[] = [
    { id: '12', text: 'Study' },
    { id: '22', text: 'Need tp Upskill' },
];

const initialCompletedTodo: ITodo[] = [];

const DraggableTodo = () => {
    const [inputTodo, setInputTodo] = useState<string>('');
    const [pendingTasks, setPendingTasks] =
        useState<ITodo[]>(initialPendingTodo);
    const [inProgressTasks, setInProgressTasks] =
        useState<ITodo[]>(initialInProgressTodo);
    const [completedTasks, setCompletedTasks] =
        useState<ITodo[]>(initialCompletedTodo);

    const [draggedItem, setDraggedItem] = useState<IDraggedItem | null>(null);
    const [dragCaptureClass, setDragCaptureClass] = useState('');

    const getId = () => {
        return new Date().getTime().toString();
    };

    const handleTaskSubmit = (e: FormEvent) => {
        e.preventDefault();
        const currentPendingTask = [...pendingTasks];
        currentPendingTask.push({ id: getId(), text: inputTodo });

        setPendingTasks(currentPendingTask);

        setInputTodo('');
    };

    const handleOnDragStart = (whichContainer: string, index: number) => {
        setDragCaptureClass('bg-primary/10 cursor-move');
        setDraggedItem({ container: whichContainer, index: index });
    };

    const handleOnDragOver = (e: FormEvent) => {
        e.preventDefault();
    };

    const handleOnDrop = (
        destinationContainer: string,
        destinationIndex: number | undefined = 0,
    ) => {
        if (!draggedItem) {
            return;
        }

        const { container: sourceContainer, index: sourceIndex } = draggedItem;

        let sourceTodoList, destinationTodoList;

        switch (sourceContainer) {
            case DraggableContainerEnum.PENDING_TASKS: {
                sourceTodoList = [...pendingTasks];
                break;
            }
            case DraggableContainerEnum.INPROGRESS_TASKS: {
                sourceTodoList = [...inProgressTasks];
                break;
            }
            case DraggableContainerEnum.COMPLETED_TASKS: {
                sourceTodoList = [...completedTasks];
                break;
            }
            default: {
                sourceTodoList = [...pendingTasks];
                break;
            }
        }
        switch (destinationContainer) {
            case DraggableContainerEnum.PENDING_TASKS: {
                destinationTodoList = [...pendingTasks];
                break;
            }
            case DraggableContainerEnum.INPROGRESS_TASKS: {
                destinationTodoList = [...inProgressTasks];
                break;
            }
            case DraggableContainerEnum.COMPLETED_TASKS: {
                destinationTodoList = [...completedTasks];
                break;
            }
            default: {
                destinationTodoList = [...pendingTasks];
                break;
            }
        }

        if (sourceContainer === destinationContainer) {
            const [deletedItem] = destinationTodoList.splice(sourceIndex, 1);
            destinationTodoList.splice(destinationIndex, 0, deletedItem);
        } else {
            const [deletedItem] = sourceTodoList.splice(sourceIndex, 1);
            destinationTodoList.splice(destinationIndex, 0, deletedItem);
        }

        if (sourceContainer !== destinationContainer) {
            switch (sourceContainer) {
                case DraggableContainerEnum.PENDING_TASKS: {
                    setPendingTasks(sourceTodoList);
                    break;
                }
                case DraggableContainerEnum.INPROGRESS_TASKS: {
                    setInProgressTasks(sourceTodoList);
                    break;
                }
                case DraggableContainerEnum.COMPLETED_TASKS: {
                    setCompletedTasks(sourceTodoList);
                    break;
                }
            }
        }

        switch (destinationContainer) {
            case DraggableContainerEnum.PENDING_TASKS: {
                setPendingTasks(destinationTodoList);
                break;
            }
            case DraggableContainerEnum.INPROGRESS_TASKS: {
                setInProgressTasks(destinationTodoList);
                break;
            }
            case DraggableContainerEnum.COMPLETED_TASKS: {
                setCompletedTasks(destinationTodoList);
                break;
            }
        }

        setDraggedItem(null);
        setDragCaptureClass('');
    };

    const handleDelete = (whichContainer: string, index: number) => {
        let currentTodoList;

        switch (whichContainer) {
            case DraggableContainerEnum.PENDING_TASKS: {
                currentTodoList = [...pendingTasks];
                break;
            }
            case DraggableContainerEnum.INPROGRESS_TASKS: {
                currentTodoList = [...inProgressTasks];
                break;
            }
            case DraggableContainerEnum.COMPLETED_TASKS: {
                currentTodoList = [...completedTasks];
                break;
            }
            default: {
                currentTodoList = [...pendingTasks];
                break;
            }
        }

        currentTodoList.splice(index, 1);

        switch (whichContainer) {
            case DraggableContainerEnum.PENDING_TASKS: {
                setPendingTasks(currentTodoList);
                break;
            }
            case DraggableContainerEnum.INPROGRESS_TASKS: {
                setInProgressTasks(currentTodoList);
                break;
            }
            case DraggableContainerEnum.COMPLETED_TASKS: {
                setCompletedTasks(currentTodoList);
                break;
            }
        }
    };

    return (
        <div className="w-full md:w-[90%] lg:w-[90%] 2xl:w-[1200px] flex flex-col items-center gap-6">
            <form
                onSubmit={handleTaskSubmit}
                className="w-[90%] md:w-[70%] lg:w-[50%]"
            >
                <div className=" flex gap-4">
                    <Input
                        type="text"
                        value={inputTodo}
                        onChange={(e) => setInputTodo(e.target.value)}
                        required
                        placeholder="eg. Buy groceries"
                    />
                    <Button
                        variant="outline"
                        className=""
                        disabled={inputTodo.length == 0}
                    >
                        Add
                    </Button>
                </div>
            </form>
            <DraggableContainers
                pendingTasks={pendingTasks}
                inProgressTasks={inProgressTasks}
                completedTasks={completedTasks}
                dragCaptureClass={dragCaptureClass}
                handleOnDragStart={handleOnDragStart}
                handleOnDragOver={handleOnDragOver}
                handleOnDrop={handleOnDrop}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default DraggableTodo;
