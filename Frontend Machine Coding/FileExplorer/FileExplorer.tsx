import { useState } from 'react';
import EachFolderOrFile from './EachFolderOrFile';
import { Separator } from '@/components/ui/separator';
import useTreeTraversal from '@/hooks/useTreeTraversal';
import { EXPLORER_DATA, IFileExplorer } from './FolderData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FileExplorer = () => {
    const [explorerData, setExplorerData] = useState(EXPLORER_DATA);

    const { insertItem, updateItem, deleteItem } = useTreeTraversal();

    const handleInsertFolderOrFile = (
        folderId: IFileExplorer['id'],
        newFolderName: IFileExplorer['name'],
        newIsFolder: IFileExplorer['isFolder'],
    ) => {
        const finalTreeAfterInsert = insertItem(
            explorerData,
            folderId,
            newFolderName,
            newIsFolder,
        );

        setExplorerData((prev) => ({ ...prev, finalTreeAfterInsert }));

        console.log(`${newFolderName} is created successfully`);
    };

    const handleRenameFolderOrFile = (
        folderId: IFileExplorer['id'],
        folderName: IFileExplorer['name'],
    ) => {
        const finalTreeAfterRename = updateItem(
            explorerData,
            folderId,
            folderName,
        );

        setExplorerData((prev) => ({ ...prev, finalTreeAfterRename }));

        console.log(`Renamed successfully`);
    };
    const handleDeleteFolderOrFile = (
        folderId: IFileExplorer['id'],
        folderName: IFileExplorer['name'],
    ) => {
        const finalTreeAfterDelete = deleteItem(explorerData, folderId);
        setExplorerData((prev) => ({ ...prev, finalTreeAfterDelete }));

        console.log(`${folderName} is deleted successfully`);
    };

    return (
        <Card className="w-full sm:w-[650px]">
            <CardHeader>
                <CardTitle>Frontend Interview Problems</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-5">
                <EachFolderOrFile
                    id={explorerData.id}
                    isFolder={explorerData.isFolder}
                    name={explorerData.name}
                    items={explorerData.items}
                    handleInsertFolderOrFile={handleInsertFolderOrFile}
                    handleRenameFolderOrFile={handleRenameFolderOrFile}
                    handleDeleteFolderOrFile={handleDeleteFolderOrFile}
                />
            </CardContent>
        </Card>
    );
};

export default FileExplorer;
