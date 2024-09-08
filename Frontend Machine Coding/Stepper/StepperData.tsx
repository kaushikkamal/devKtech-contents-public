interface IStepperData {
    title: string;
    Component: React.ReactNode;
}

const STEPPER_DATA: IStepperData[] = [
    {
        title: `Order Details`,
        Component: <>Review your orders</>,
    },
    {
        title: `Your Address`,
        Component: <>Enter your address here</>,
    },
    {
        title: `Payment`,
        Component: <>Choose the payment method</>,
    },
    {
        title: `Successful`,
        Component: <>Your order is successfully placed</>,
    },
];

export default STEPPER_DATA;
