import { KeyboardEvent, MouseEvent, useState } from 'react';
import {
    ChevronDown,
    ChevronRight,
    FilePlus,
    FileText,
    Folder,
    FolderPlus,
    Pencil,
    Trash2,
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { IFileExplorer } from './FolderData';

interface IFileFolder extends IFileExplorer {
    handleInsertFolderOrFile: (
        folderId: IFileExplorer['id'],
        newFolderName: IFileExplorer['name'],
        isFolder: IFileExplorer['isFolder'],
    ) => void;
    handleRenameFolderOrFile: (
        folderId: IFileExplorer['id'],
        folderName: IFileExplorer['name'],
    ) => void;
    handleDeleteFolderOrFile: (
        folderId: IFileExplorer['id'],
        folderName: IFileExplorer['name'],
    ) => void;
}

const EachFolderOrFile = ({
    id,
    isFolder,
    name,
    items,
    handleInsertFolderOrFile,
    handleRenameFolderOrFile,
    handleDeleteFolderOrFile,
}: IFileFolder) => {
    const [isExpand, setIsExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: true,
    });

    const [showRename, setShowRename] = useState(false);

    const newFolderOrFile = (
        e: MouseEvent<SVGSVGElement>,
        isFolder: boolean,
    ) => {
        e.stopPropagation();
        setIsExpand(true);
        setShowInput({
            visible: true,
            isFolder: isFolder,
        });
    };
    const createFolderOrFile = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value) {
            setShowInput((prev) => {
                return { ...prev, visible: false };
            });
            handleInsertFolderOrFile(
                id,
                e.currentTarget.value,
                showInput.isFolder,
            );
        }
    };

    const renameFolderOrFile = (e: KeyboardEvent<HTMLInputElement>) => {
        if (
            e.key === 'Enter' &&
            e.currentTarget.value &&
            e.currentTarget.value !== name
        ) {
            setShowRename(false);
            handleRenameFolderOrFile(id, e.currentTarget.value);
        }
    };

    const deleteFolderOrFile = (e: MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        handleDeleteFolderOrFile(id, name);
    };

    return (
        <div>
            <div
                id={id}
                className="flex justify-between px-4 py-2 cursor-pointer rounded-md hover:bg-primary-700/15"
                onClick={() => {
                    setIsExpand((prev) => !prev);
                }}
            >
                {showRename ? (
                    <div className="w-full flex justify-between items-center space-x-4 px-4 py-1 cursor-pointer rounded-md hover:bg-primary-foreground">
                        {isFolder ? <Folder /> : <FileText />}
                        <Input
                            type="text"
                            autoFocus
                            onBlur={() => {
                                setShowRename(false);
                            }}
                            defaultValue={name}
                            onKeyDown={(e) => renameFolderOrFile(e)}
                        />
                    </div>
                ) : (
                    <>
                        <div className="flex space-x-2">
                            {isFolder ? (
                                isExpand ? (
                                    <ChevronDown />
                                ) : (
                                    <ChevronRight />
                                )
                            ) : (
                                <span className="w-[24px]"></span>
                            )}
                            {isFolder ? <Folder /> : <FileText />}
                            <p>{name}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Pencil
                                size={20}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowRename(true);
                                }}
                            />
                            {isFolder && (
                                <>
                                    <FilePlus
                                        size={20}
                                        onClick={(e) =>
                                            newFolderOrFile(e, false)
                                        }
                                    />
                                    <FolderPlus
                                        size={20}
                                        onClick={(e) =>
                                            newFolderOrFile(e, true)
                                        }
                                    />
                                </>
                            )}
                            {id !== 'root' && (
                                <Trash2
                                    size={20}
                                    onClick={(e) => deleteFolderOrFile(e)}
                                />
                            )}
                        </div>
                    </>
                )}
            </div>

            {isExpand && (
                <div
                    style={{
                        paddingLeft: 32,
                    }}
                >
                    <div>
                        {showInput.visible && (
                            <div className="flex justify-between items-center space-x-4 px-4 py-2 cursor-pointer rounded-md hover:bg-primary-foreground">
                                {showInput.isFolder ? <Folder /> : <FileText />}
                                <Input
                                    type="text"
                                    autoFocus
                                    onBlur={() => {
                                        setShowInput((prev) => {
                                            return {
                                                ...prev,
                                                visible: false,
                                            };
                                        });
                                    }}
                                    onKeyDown={(e) => createFolderOrFile(e)}
                                />
                            </div>
                        )}
                        {items?.map((each) => {
                            return (
                                <EachFolderOrFile
                                    key={each.id}
                                    id={each.id}
                                    name={each.name}
                                    isFolder={each.isFolder}
                                    items={each.items}
                                    handleInsertFolderOrFile={
                                        handleInsertFolderOrFile
                                    }
                                    handleRenameFolderOrFile={
                                        handleRenameFolderOrFile
                                    }
                                    handleDeleteFolderOrFile={
                                        handleDeleteFolderOrFile
                                    }
                                />
                            );
                        })}
                    </div>{' '}
                </div>
            )}
        </div>
    );
};

export default EachFolderOrFile;
