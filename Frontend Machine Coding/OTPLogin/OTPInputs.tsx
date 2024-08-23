import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Props = {
    len: number;
    phoneNumber: string;
    setOtpPage: (val: boolean) => void;
    setPhoneNumber: (val: string) => void;
};

const OTPInputs = ({ len, phoneNumber, setOtpPage, setPhoneNumber }: Props) => {
    const [otp, setOtp] = useState(new Array(len).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleOnChange = (
        e: ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        const newVal = e.target.value;
        if (isNaN(Number(newVal))) {
            // changed
            return;
        }
        const newOtp = [...otp];
        newOtp[index] = newVal.substring(newVal.length - 1);

        setOtp(newOtp);

        // const finalOtp = otp.join("");
        // if (finalOtp.length === len && index === len-1) {
        //     console.log('exe');

        //     handleSubmitVerifyOtp();
        // }
        if (newVal && index + 1 < len && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOnClick = (index: number) => {
        inputRefs.current[index]?.setSelectionRange(1, 1);
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf('')]?.focus();
        }
    };

    const handleOnKeyDown = (
        e: KeyboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        if (
            e.key === 'Backspace' &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        ) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === 'Enter' && index === len - 1) {
            handleSubmitVerifyOtp();
        }
    };

    const handleSubmitVerifyOtp = () => {
        const someValueEmpty = otp.some((each) => each === '');
        if (someValueEmpty) {
            return;
        }

        setPhoneNumber('');
        setOtpPage(false);
        console.log(`OTP verified`);
    };

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    return (
        <div className="w-full sm:w-[600px] flex flex-col justify-center items-center gap-16">
            <h2 className="text-2xl">Sending OTP to {phoneNumber}</h2>
            <div className="flex flex-wrap gap-4 justify-center items-center">
                {otp.map((val, index) => {
                    return (
                        <Input
                            key={index}
                            ref={(input) => (inputRefs.current[index] = input)}
                            type="text"
                            value={val}
                            onChange={(e) => {
                                handleOnChange(e, index);
                            }}
                            onClick={() => {
                                handleOnClick(index);
                            }}
                            onKeyDown={(e) => {
                                handleOnKeyDown(e, index);
                            }}
                            className="w-[70px] h-[70px] md:w-[75px] md:h-[75px] text-xl text-center"
                        />
                    );
                })}
            </div>
            <Button
                variant={'default'}
                disabled={otp.some((each) => each === '')}
                className="w-min"
                onClick={handleSubmitVerifyOtp}
            >
                Verify
            </Button>
        </div>
    );
};

export default OTPInputs;
