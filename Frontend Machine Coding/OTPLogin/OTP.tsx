import { ChangeEvent, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import OTPInputs from './OTPInputs';

interface IProps {
    otpLength?: number;
}

const OTP = ({ otpLength = 4 }: IProps) => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [otpPage, setOtpPage] = useState(false);

    const handleOnChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    const handleSendOTPButton = () => {
        const reg = /[^0-9]/g;

        if (phoneNumber!.length !== 10 && !reg.test(phoneNumber!)) {
            alert('Invalid phone number');
            return;
        }
        console.log(`OTP sent to ${phoneNumber}`);

        setOtpPage(true);
    };

    return otpPage ? (
        <OTPInputs
            len={otpLength}
            phoneNumber={phoneNumber}
            setOtpPage={setOtpPage}
            setPhoneNumber={setPhoneNumber}
        />
    ) : (
        <div className="w-full sm:w-[400px] flex flex-col items-center gap-4">
            <Input
                type="number"
                className="text-base peer focus:outline-0 transition-all text-center rounded-xl focus:border-0 focus-visible:ring-1"
                placeholder="Phone number"
                required
                name="phone"
                value={phoneNumber}
                onChange={handleOnChangePhoneNumber}
            />
            <Button
                variant="outline"
                disabled={phoneNumber.length !== 10}
                className="w-min"
                onClick={handleSendOTPButton}
            >
                Send OTP
            </Button>
        </div>
    );
};

export default OTP;
