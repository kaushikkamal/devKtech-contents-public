import { Card, CardContent } from '@/components/ui/card';

const EachData = (index: number) => {
    return (
        <Card
            key={index}
            className="w-[40%] h-[100px] flex justify-center items-center my-2 hover:border-primary-900"
        >
            <CardContent className="p-0">
                <p>{index}</p>
            </CardContent>
        </Card>
    );
};

export default EachData;
