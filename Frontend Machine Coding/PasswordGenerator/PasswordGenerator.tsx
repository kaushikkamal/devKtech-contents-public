import { ChangeEvent, useState } from 'react';
import { ArrowRight, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';

const PasswordGenerator = () => {
    const [characterLength, setCharacterLength] = useState(8);
    const [finalPassword, setFinalPassword] = useState('');
    const [isUpperCaseIncluded, setIsUpperCaseIncluded] = useState(false);
    const [isLowerCaseInclude, setIsLowerCaseInclude] = useState(false);
    const [isNumberIncluded, setIsNumberIncluded] = useState(false);
    const [isSpecialCharacterIncluded, setIsSpecialCharacterIncluded] =
        useState(false);

    const toggleUpperCase = () => {
        setIsUpperCaseIncluded((prev) => !prev);
    };

    const toggleLowerCase = () => {
        setIsLowerCaseInclude((prev) => !prev);
    };

    const toggleNumber = () => {
        setIsNumberIncluded((prev) => !prev);
    };

    const toggleSpecialCharacter = () => {
        setIsSpecialCharacterIncluded((prev) => !prev);
    };

    const handleCopyPasswordButton = () => {
        if (finalPassword) {
            navigator.clipboard.writeText(finalPassword);
            console.log(`Password Copied`);
        } else {
            console.log(`Please generate the password first`);
        }
    };

    const handleGeneratePassword = () => {
        const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const special = '!@#$%^&*()_+[]{}|;:,.<>?';
        let allCharacters = '';

        if (isUpperCaseIncluded) {
            allCharacters += upperCase;
        }

        if (isLowerCaseInclude) {
            allCharacters += lowerCase;
        }

        if (isNumberIncluded) {
            allCharacters += numbers;
        }

        if (isSpecialCharacterIncluded) {
            allCharacters += special;
        }
        if (
            !isUpperCaseIncluded &&
            !isLowerCaseInclude &&
            !isNumberIncluded &&
            !isSpecialCharacterIncluded
        )
            allCharacters += upperCase;

        let count = 0;
        let generatedPassword = '';

        while (count < characterLength) {
            const randomIndex = Math.floor(
                Math.random() * allCharacters.length,
            );
            generatedPassword += allCharacters[randomIndex];
            count++;
        }

        setFinalPassword(generatedPassword);
    };

    return (
        <Card className="w-full md:w-[600px] flex flex-col justify-between ">
            <CardHeader className="w-full flex flex-row justify-between items-center flex-wrap">
                <CardTitle className="break-all">
                    {finalPassword || `Generated Password`}
                </CardTitle>
                <Button
                    variant="outline"
                    className="rounded-full p-6"
                    onClick={handleCopyPasswordButton}
                >
                    <Copy size={24} />
                </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <label htmlFor="character_range">Character Length</label>
                <div className="flex justify-between items-center gap-8">
                    <input
                        id="character_range"
                        className="flex-grow"
                        type="range"
                        min={1}
                        max={24}
                        value={characterLength}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setCharacterLength(parseInt(e.target.value));
                        }}
                    />
                    <h4 className="text-xl">{characterLength}</h4>
                </div>
                <p>Includes</p>
                <div className="flex flex-row justify-evenly gap-8">
                    <div className="flex flex-col justify-around items-start gap-4">
                        <div className="flex justify-center items-center space-x-2">
                            <input
                                type="checkbox"
                                id="upper-case"
                                checked={isUpperCaseIncluded}
                                onChange={toggleUpperCase}
                            />
                            <label
                                htmlFor="upper-case"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Upper Case
                            </label>
                        </div>
                        <div className="flex justify-between items-center space-x-2">
                            <input
                                type="checkbox"
                                id="lower-case"
                                checked={isLowerCaseInclude}
                                onChange={toggleLowerCase}
                            />
                            <label
                                htmlFor="lower-case"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Lower Case
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col justify-around items-start gap-4">
                        <div className="flex justify-between items-center space-x-2">
                            <input
                                type="checkbox"
                                id="numbers"
                                checked={isNumberIncluded}
                                onChange={toggleNumber}
                            />
                            <label
                                htmlFor="numbers"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Numbers
                            </label>
                        </div>
                        <div className="flex justify-between items-center space-x-2">
                            <input
                                type="checkbox"
                                id="special-characters"
                                checked={isSpecialCharacterIncluded}
                                onChange={toggleSpecialCharacter}
                            />
                            <label
                                htmlFor="special-characters"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Special Characters
                            </label>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="w-full mt-4 mb-0">
                <Button
                    variant="outline"
                    className="w-full rounded-lg flex flex-row justify-center items-center gap-2"
                    onClick={handleGeneratePassword}
                >
                    <h2 className="text-base">Generate</h2>
                    <ArrowRight />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default PasswordGenerator;
