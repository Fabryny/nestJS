import { Matches, MinLength } from "class-validator";

export function IsStrongPassword(): PropertyDecorator {
    return function(target, propertyKey: string | symbol) {
        Matches(/((?=.*\d)|(?=.\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).$/, {
            message:
            'Password is too weak,' +
            'It must contain at least one number, one capital letter an onde lowecase letter.',
        })(target, propertyKey);
        MinLength(8)(target, propertyKey as string);
    }
}