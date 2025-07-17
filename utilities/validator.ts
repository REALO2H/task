// A genetic interface for the validator class. 
// I used an interface instead of an abstract class, because I don't need to implement any methods in the validator class. And also becasue there is only one method to implement.

// utils/Validator.ts
export interface Validator<T> {
   isValid(value: T): boolean;
}
