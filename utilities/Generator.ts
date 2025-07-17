// As we discussed earlier, thhis id a generic generator class that can be used to generate any type of object.


export abstract class Generator<T> {
  abstract generate(): T;
}
