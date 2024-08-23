import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from '@/components/ui/card';

interface IProps {
    handleModal: (val: boolean) => void;
}

const ModalContent = ({ handleModal }: IProps) => {
    return (
        <div
            onClick={() => {
                handleModal(false);
            }}
            className="fixed top-0 w-screen h-screen z-999 bg-background/35"
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            >
                <Card className="w-[300px] sm:w-[400px] flex flex-col justify-between bg-card border-primary/20 p-1">
                    <CardHeader className="items-start">
                        <CardTitle>Modal Header</CardTitle>
                        <CardDescription className="w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                            Content
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-end">
                        <Button
                            variant="destructive"
                            className="rounded-full"
                            onClick={() => {
                                handleModal(false);
                            }}
                        >
                            Close
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default ModalContent;
